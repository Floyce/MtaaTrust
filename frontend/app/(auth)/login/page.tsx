"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"

import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [view, setView] = useState<"gateway" | "login">("gateway")

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.target as HTMLFormElement)
            const email = formData.get("email") as string
            const password = formData.get("password") as string

            const data = await api.post<{ access_token: string }>("/auth/login", {
                login_identifier: email,
                password,
            })

            localStorage.setItem("access_token", data.access_token)

            // Get user profile to determine type
            const user = await api.get<{ user_type: string }>("/users/me")
            localStorage.setItem("user_data", JSON.stringify(user))

            // Redirect based on role
            if (user.user_type === "provider") {
                window.location.href = "/provider-dashboard"
            } else {
                window.location.href = "/" // Consumer goes to Homepage/Dashboard
            }

        } catch (error: any) {
            alert(error.message || "Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    if (view === "gateway") {
        return (
            <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-slate-900">Get Started with MtaaTrust</h1>
                    <p className="text-slate-600">Join the most trusted community in Nairobi.</p>
                </div>

                <div className="grid gap-4">
                    <Link href="/register?type=consumer" className="w-full">
                        <Button className="w-full h-20 text-xl font-bold bg-primary hover:bg-emerald-800 text-white rounded-2xl shadow-xl hover:scale-105 transition-all flex flex-col items-center justify-center gap-1">
                            <span>I Need a Service 🛠️</span>
                            <span className="text-xs font-normal opacity-80">Hire vetted pros instantly</span>
                        </Button>
                    </Link>

                    <Link href="/register?type=provider" className="w-full">
                        <Button variant="outline" className="w-full h-20 text-xl font-bold border-2 border-primary text-primary hover:bg-primary/5 rounded-2xl shadow-lg hover:scale-105 transition-all flex flex-col items-center justify-center gap-1 bg-white">
                            <span>I Offer Services 💼</span>
                            <span className="text-xs font-normal text-slate-500">Find jobs & get paid</span>
                        </Button>
                    </Link>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-50 px-2 text-slate-500 font-medium">
                            Returning User?
                        </span>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    onClick={() => setView("login")}
                    className="w-full text-primary font-bold hover:bg-primary/10 hover:text-primary h-12 text-base"
                >
                    Log In to Account
                </Button>
            </div>
        )
    }

    return (
        <Card className="border-none shadow-none bg-transparent animate-in slide-in-from-right duration-300">
            <CardHeader className="space-y-1 px-0">
                <Button variant="ghost" className="w-fit p-0 h-auto mb-2 text-slate-500 hover:text-primary" onClick={() => setView("gateway")}>← Back</Button>
                <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                    Karibu Tena!
                </CardTitle>
                <CardDescription className="text-slate-500">
                    Enter your phone or email to access your account
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">
                                Email or Phone
                            </label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="07XX XXX XXX or name@example.com"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="username"
                                autoCorrect="off"
                                disabled={isLoading}
                                className="h-11 border-slate-200 focus:border-green-500 focus:ring-green-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none" htmlFor="password">
                                    Password
                                </label>
                                <Link href="#" className="text-sm text-primary hover:underline font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    disabled={isLoading}
                                    className="h-11 pr-10 border-slate-200 focus:border-green-500 focus:ring-green-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        <Button className="h-11 bg-primary hover:bg-emerald-800 text-lg mt-2 font-bold shadow-lg shadow-green-900/20" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </div>
                </form>
            </CardContent>
            {/* Footer removed as it is redundant now */}
        </Card>
    )
}
