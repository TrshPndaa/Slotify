# app.py
from flask import Flask, request, jsonify, session, redirect, url_for, make_response
from flask_cors import CORS
import sqlite3
import bcrypt
import threading
from contextlib import contextmanager
import jwt as pyjwt
import datetime
import logging
from logging.handlers import RotatingFileHandler
import os

app = Flask(__name__)
# Configure CORS with specific origins
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True,
        }
    },
    supports_credentials=True,
)
# Configure logging
if not os.path.exists("logs"):
    os.makedirs("logs")
file_handler = RotatingFileHandler("logs/app.log", maxBytes=10240, backupCount=10)
file_handler.setFormatter(
    logging.Formatter(
        "%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]"
    )
)
file_handler.setLevel(logging.INFO)
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)

# Add a secret key to your Flask app - in production, use environment variables
app.secret_key = "your-secret-key-here"  # Change this to a secure secret key
JWT_SECRET = "your-jwt-secret-key"  # Change this to a secure secret key

# Create a lock for thread-safe database operations
db_lock = threading.Lock()


# Create a context manager for database connections
@contextmanager
def get_db_connection():
    conn = None
    try:
        with db_lock:  # Ensure thread-safe database access
            conn = sqlite3.connect("slotify.db", timeout=20)
            conn.row_factory = sqlite3.Row
            yield conn
    except sqlite3.Error as e:
        app.logger.error(f"Database connection error: {e}")
        raise
    finally:
        if conn:
            conn.close()


def init_db():
    try:
        with get_db_connection() as conn:
            c = conn.cursor()
            # Create businesses table
            c.execute(
                """
                CREATE TABLE IF NOT EXISTS businesses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    business_name TEXT NOT NULL,
                    owner_name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    business_type TEXT NOT NULL,
                    phone TEXT NOT NULL,
                    address TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """
            )

            # Create slots table
            c.execute(
                """
                CREATE TABLE IF NOT EXISTS slots (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    business_id INTEGER NOT NULL,
                    date TEXT NOT NULL,
                    start_time TEXT NOT NULL,
                    end_time TEXT NOT NULL,
                    is_available BOOLEAN DEFAULT TRUE,
                    FOREIGN KEY (business_id) REFERENCES businesses (id)
                )
            """
            )

            # Create bookings table
            c.execute(
                """
                CREATE TABLE IF NOT EXISTS bookings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    slot_id INTEGER NOT NULL,
                    customer_name TEXT NOT NULL,
                    customer_email TEXT NOT NULL,
                    customer_phone TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (slot_id) REFERENCES slots (id)
                )
            """
            )

            conn.commit()
            app.logger.info("Database initialized successfully")
    except Exception as e:
        app.logger.error(f"Database initialization error: {e}")
        raise


@app.route("/api/business/signup", methods=["POST"])
def business_signup():
    try:
        data = request.json
        app.logger.info(f"Signup attempt for email: {data.get('email')}")

        # Basic input validation
        required_fields = [
            "businessName",
            "ownerName",
            "email",
            "password",
            "businessType",
            "phone",
            "address",
        ]
        for field in required_fields:
            if not data.get(field):
                return (
                    jsonify({"status": "error", "message": f"{field} is required"}),
                    400,
                )

        try:
            # Hash password
            password_bytes = data["password"].encode("utf-8")
            hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
            password_hash = hashed.decode("utf-8")

            app.logger.info("Password hashed successfully")

            with get_db_connection() as conn:
                c = conn.cursor()
                c.execute(
                    """
                    INSERT INTO businesses (
                        business_name, owner_name, email, password_hash,
                        business_type, phone, address
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                    (
                        data["businessName"],
                        data["ownerName"],
                        data["email"],
                        password_hash,
                        data["businessType"],
                        data["phone"],
                        data["address"],
                    ),
                )
                conn.commit()

            return (
                jsonify(
                    {"status": "success", "message": "Business registered successfully"}
                ),
                201,
            )

        except Exception as e:
            app.logger.error(f"Error hashing password: {str(e)}")
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": f"Error during registration: {str(e)}",
                    }
                ),
                500,
            )

    except sqlite3.IntegrityError:
        return jsonify({"status": "error", "message": "Email already registered"}), 409
    except Exception as e:
        app.logger.error(f"Signup error: {str(e)}")
        return (
            jsonify({"status": "error", "message": f"Registration failed: {str(e)}"}),
            500,
        )


@app.route("/api/debug/user/<email>", methods=["GET"])
def debug_user(email):
    try:
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute(
                """
                SELECT email, password_hash
                FROM businesses 
                WHERE email = ?
            """,
                (email,),
            )
            user = c.fetchone()
            if user:
                return jsonify({"email": user["email"], "hash": user["password_hash"]})
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/business/login", methods=["POST"])
def business_login():
    try:
        data = request.json
        app.logger.info(f"Login attempt for email: {data.get('email')}")

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return (
                jsonify({"status": "error", "message": "Email and password required"}),
                400,
            )

        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute(
                """
                SELECT id, email, password_hash, business_name 
                FROM businesses 
                WHERE email = ?
            """,
                (email,),
            )

            user = c.fetchone()
            app.logger.info(f"Found user: {user}")

            if not user:
                return (
                    jsonify({"status": "error", "message": "Invalid credentials"}),
                    401,
                )

            try:
                password_matches = bcrypt.checkpw(
                    password.encode("utf-8"), user["password_hash"].encode("utf-8")
                )
                app.logger.info(f"Password verification result: {password_matches}")

                if password_matches:
                    # Use pyjwt.encode instead of jwt.encode
                    token = pyjwt.encode(
                        {
                            "business_id": user["id"],
                            "email": user["email"],
                            "business_name": user["business_name"],
                            "exp": datetime.datetime.utcnow()
                            + datetime.timedelta(hours=12),
                        },
                        JWT_SECRET,
                        algorithm="HS256",
                    )

                    response = make_response(
                        jsonify(
                            {
                                "status": "success",
                                "message": "Login successful",
                                "business_id": user["id"],
                                "business_name": user["business_name"],
                                "token": token,
                            }
                        )
                    )

                    response.set_cookie(
                        "token",
                        token,
                        httponly=True,
                        secure=False,
                        samesite="Lax",
                        max_age=43200,
                    )

                    return response

                return (
                    jsonify({"status": "error", "message": "Invalid credentials"}),
                    401,
                )

            except Exception as e:
                app.logger.error(f"Password verification error: {str(e)}")
                return (
                    jsonify(
                        {
                            "status": "error",
                            "message": f"Password verification failed: {str(e)}",
                        }
                    ),
                    500,
                )

    except Exception as e:
        app.logger.error(f"Login error: {str(e)}")
        return jsonify({"status": "error", "message": f"Login failed: {str(e)}"}), 500


@app.route("/api/slots/<business_id>", methods=["GET"])
def get_available_slots(business_id):
    try:
        date = request.args.get("date")
        if not date:
            return (
                jsonify({"status": "error", "message": "Date parameter is required"}),
                400,
            )

        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute(
                """
                SELECT id, date, start_time, end_time 
                FROM slots 
                WHERE business_id = ? 
                AND date = ? 
                AND is_available = TRUE
            """,
                (business_id, date),
            )

            slots = [
                {"id": row[0], "date": row[1], "startTime": row[2], "endTime": row[3]}
                for row in c.fetchall()
            ]

            return jsonify(slots)

    except Exception as e:
        app.logger.error(f"Error fetching slots: {str(e)}")
        return (
            jsonify({"status": "error", "message": "Failed to fetch available slots"}),
            500,
        )


@app.route("/api/book", methods=["POST"])
def book_slot():
    try:
        data = request.json
        required_fields = ["slotId", "customerName", "customerEmail", "customerPhone"]

        for field in required_fields:
            if not data.get(field):
                return (
                    jsonify({"status": "error", "message": f"{field} is required"}),
                    400,
                )

        with get_db_connection() as conn:
            c = conn.cursor()

            # Start a transaction
            c.execute("BEGIN TRANSACTION")

            # Check if slot is still available
            c.execute(
                """
                SELECT is_available 
                FROM slots 
                WHERE id = ?
            """,
                (data["slotId"],),
            )

            result = c.fetchone()
            if not result or not result[0]:
                c.execute("ROLLBACK")
                return (
                    jsonify(
                        {"status": "error", "message": "Slot is no longer available"}
                    ),
                    400,
                )

            # Mark slot as unavailable
            c.execute(
                """
                UPDATE slots 
                SET is_available = FALSE 
                WHERE id = ?
            """,
                (data["slotId"],),
            )

            # Create booking
            c.execute(
                """
                INSERT INTO bookings (
                    slot_id, customer_name, customer_email, customer_phone
                ) VALUES (?, ?, ?, ?)
            """,
                (
                    data["slotId"],
                    data["customerName"],
                    data["customerEmail"],
                    data["customerPhone"],
                ),
            )

            conn.commit()
            return jsonify({"status": "success", "message": "Booking confirmed"}), 201

    except sqlite3.Error as e:
        app.logger.error(f"Database error in booking: {str(e)}")
        return (
            jsonify(
                {"status": "error", "message": "Booking failed due to database error"}
            ),
            500,
        )
    except Exception as e:
        app.logger.error(f"Booking error: {str(e)}")
        return jsonify({"status": "error", "message": "Booking failed"}), 500


@app.route("/api/business/<business_id>", methods=["GET"])
def get_business_info(business_id):
    try:
        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute(
                """
                SELECT business_name, business_type, phone, address 
                FROM businesses 
                WHERE id = ?
            """,
                (business_id,),
            )

            result = c.fetchone()
            if not result:
                return (
                    jsonify({"status": "error", "message": "Business not found"}),
                    404,
                )

            business = {
                "name": result[0],
                "type": result[1],
                "phone": result[2],
                "address": result[3],
            }

            return jsonify(business)

    except Exception as e:
        app.logger.error(f"Error fetching business info: {str(e)}")
        return (
            jsonify(
                {"status": "error", "message": "Failed to fetch business information"}
            ),
            500,
        )


def token_required(f):
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get("Authorization")

        if auth_header:
            try:
                token = auth_header.split("Bearer ")[1]
            except IndexError:
                return jsonify({"message": "Invalid token format"}), 401

        if not token:
            token = request.cookies.get("token")

        if not token:
            return jsonify({"message": "Token is missing"}), 401

        try:
            data = pyjwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            current_business_id = data["business_id"]
        except pyjwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except pyjwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        return f(current_business_id, *args, **kwargs)

    decorated.__name__ = f.__name__
    return decorated


@app.route("/api/business/bookings/<business_id>", methods=["GET"])
@token_required
def get_business_bookings(current_business_id, business_id):
    try:
        # Verify the business is accessing their own data
        if int(business_id) != current_business_id:
            return jsonify({"status": "error", "message": "Unauthorized"}), 403

        with get_db_connection() as conn:
            c = conn.cursor()
            c.execute(
                """
                SELECT 
                    b.id,
                    b.customer_name,
                    b.customer_email,
                    b.customer_phone,
                    s.date,
                    s.start_time,
                    s.end_time,
                    b.created_at
                FROM bookings b
                JOIN slots s ON b.slot_id = s.id
                WHERE s.business_id = ?
                ORDER BY s.date DESC, s.start_time DESC
            """,
                (business_id,),
            )

            bookings = [
                {
                    "id": row[0],
                    "customerName": row[1],
                    "customerEmail": row[2],
                    "customerPhone": row[3],
                    "date": row[4],
                    "startTime": row[5],
                    "endTime": row[6],
                    "createdAt": row[7],
                }
                for row in c.fetchall()
            ]

            return jsonify(bookings)

    except Exception as e:
        app.logger.error(f"Error fetching business bookings: {str(e)}")
        return jsonify({"status": "error", "message": "Failed to fetch bookings"}), 500


@app.errorhandler(Exception)
def handle_error(error):
    app.logger.error(f"Unhandled error: {str(error)}")
    return jsonify({"status": "error", "message": "An unexpected error occurred"}), 500


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)  # Explicitly set port
