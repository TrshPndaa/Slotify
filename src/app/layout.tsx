import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./styles/globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Slotify - Business Booking Platform",
  description: "Book appointments with your favorite businesses",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}