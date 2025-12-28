import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <nav className="border-b bg-primary text-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    MtaaTrust
                </Link>
                <div className="hidden md:flex gap-6 items-center">
                    <Link href="/search" className="text-sm font-medium hover:text-secondary hover:underline underline-offset-4">
                        Find a Pro
                    </Link>
                    <Link href="/how-it-works" className="text-sm font-medium hover:text-secondary hover:underline underline-offset-4">
                        How it Works
                    </Link>
                    <Link href="/login" className="text-sm font-medium hover:text-secondary hover:underline underline-offset-4">
                        Login
                    </Link>
                    <Button variant="secondary" size="sm">
                        List Your Service
                    </Button>
                </div>
            </div>
        </nav>
    )
}
