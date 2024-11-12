import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl">
          Slotify
        </Link>
        
        <nav className="flex gap-4 items-center">
          <Link href="/business">Find Business</Link>
          <Link href="/auth/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}