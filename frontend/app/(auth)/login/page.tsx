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
    // Removed 'view' state, defaulting to login form directly

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

    return (
        <Card className="border-none shadow-none bg-transparent animate-in slide-in-from-right duration-300">
            <CardHeader className="space-y-1 px-0">
                <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                    Welcome Back
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
        </Card>
    )
}
