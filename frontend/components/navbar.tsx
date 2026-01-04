"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Menu, X, Home, Search, Briefcase, MessageSquare, User, Calendar } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { usePathname, useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"


export function Navbar() {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [isListServiceOpen, setIsListServiceOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    // Mobile Menu Item Component
    const MobileMenuItem = ({ href, icon: Icon, children, onClick }: any) => (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(href)
                    ? "bg-green-100 text-green-900"
                    : "text-green-700 hover:bg-green-50"
                }`}
            onClick={() => {
                setIsMobileMenuOpen(false);
                if (onClick) onClick();
            }}
        >
            <Icon className="h-5 w-5" />
            {children}
        </Link>
    );

    // Desktop Tab Component
    const NavTab = ({ href, children }: { href: string, children: React.ReactNode }) => (
        <Link
            href={href}
            className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${isActive(href)
                    ? "text-primary bg-green-50"
                    : "text-gray-600 hover:text-primary hover:bg-green-50/50"
                }`}
        >
            {children}
        </Link>
    );

    const handleListServiceClick = () => {
        if (!user) {
            // Option A: Not logged in
            // Show custom dialog content for distinct actions
            setIsListServiceOpen(true);
        } else if (user.user_type === "consumer") {
            // Option B: Consumer
            setIsListServiceOpen(true);
        } else if (user.user_type === "provider") {
            // Option C: Provider -> Dashboard
            router.push("/provider-dashboard");
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-surface/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary text-white p-1.5 rounded-lg">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-600">
                        MtaaTrust
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-2 items-center">
                    {user ? (
                        <>
                            <NavTab href={user.user_type === 'provider' ? "/provider-dashboard" : "/dashboard"}>Dashboard</NavTab>
                            <NavTab href="/providers">Find Pros</NavTab>
                            <NavTab href="/my-jobs">My Jobs</NavTab>
                            <NavTab href="/messages">Messages</NavTab>
                        </>
                    ) : (
                        <>
                            <NavTab href="/">Home</NavTab>
                            <NavTab href="/providers">Find Pros</NavTab>
                            <NavTab href="/#how-it-works">How it Works</NavTab>
                        </>
                    )}
                </div>

                {/* Right Actions (Desktop) */}
                <div className="hidden md:flex gap-4 items-center">
                    {!user ? (
                        <>
                            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary hover:underline underline-offset-4">
                                Login
                            </Link>
                            <Button variant="default" size="sm" onClick={handleListServiceClick}>
                                List Service
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" onClick={handleListServiceClick} className="hidden lg:flex border-primary/20 text-primary hover:bg-primary hover:text-white">
                                {user.user_type === 'provider' ? 'Provider Console' : 'List Service'}
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-green-100 border border-green-200 p-0 text-primary font-bold">
                                        {user.full_name?.charAt(0) || <User className="h-5 w-5" />}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.full_name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push(user.user_type === 'provider' ? '/provider-dashboard' : '/dashboard')}>
                                        Dashboard
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-green-50 rounded-md"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top-2 p-4 flex flex-col gap-2">
                    {user ? (
                        <>
                            <div className="px-4 py-2 mb-2 bg-green-50 rounded-lg">
                                <p className="font-semibold text-primary">{user.full_name}</p>
                                <p className="text-xs text-green-700/70 capitalize">{user.user_type}</p>
                            </div>
                            <MobileMenuItem href={user.user_type === 'provider' ? "/provider-dashboard" : "/dashboard"} icon={Home}>
                                Dashboard
                            </MobileMenuItem>
                            <MobileMenuItem href="/providers" icon={Search}>Find Pros</MobileMenuItem>
                            <MobileMenuItem href="/my-jobs" icon={Briefcase}>My Jobs</MobileMenuItem>
                            <MobileMenuItem href="/messages" icon={MessageSquare}>Messages</MobileMenuItem>
                            {user.user_type === 'provider' && (
                                <MobileMenuItem href="/calendar" icon={Calendar}>My Calendar</MobileMenuItem>
                            )}
                            <MobileMenuItem href="/profile" icon={User}>Profile</MobileMenuItem>
                            <button
                                onClick={logout}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-red-600 hover:bg-red-50 w-full text-left"
                            >
                                <span className="rotate-180">🚪</span> Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <MobileMenuItem href="/" icon={Home}>Home</MobileMenuItem>
                            <MobileMenuItem href="/providers" icon={Search}>Find Pros</MobileMenuItem>
                            <div className="h-px bg-gray-100 my-2" />
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start">Login</Button>
                            </Link>
                            <Button className="w-full" onClick={() => { setIsMobileMenuOpen(false); handleListServiceClick(); }}>
                                List Service
                            </Button>
                        </>
                    )}
                </div>
            )}

            {/* List Service Modal */}
            <Dialog open={isListServiceOpen} onOpenChange={setIsListServiceOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {!user ? "Want to offer your services?" : "Switch to Provider Account?"}
                        </DialogTitle>
                        <DialogDescription>
                            {!user
                                ? "Join MtaaTrust to reach more customers and grow your business."
                                : "You are currently logged in as a consumer. Do you want to create a provider profile?"}
                        </DialogDescription>
                    </DialogHeader>

                    {!user ? (
                        <div className="flex flex-col gap-3 py-4">
                            <Button onClick={() => { setIsListServiceOpen(false); router.push('/login?type=provider'); }}>
                                Login as Provider
                            </Button>
                            <Button variant="outline" onClick={() => { setIsListServiceOpen(false); router.push('/register?type=provider'); }}>
                                Sign Up as Provider
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 py-4">
                            <Button onClick={() => { setIsListServiceOpen(false); router.push('/profile/upgrade'); }}>
                                Create Provider Profile
                            </Button>
                            <DialogClose asChild>
                                <Button variant="ghost">Keep as Consumer</Button>
                            </DialogClose>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

        </header>
    )
}
