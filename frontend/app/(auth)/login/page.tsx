"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label" // We need to check if we have this, if not I'll just use standard label or create it if I can access create_file
// Actually I don't recall seeing a Label component in the list. I will use standard html label or create one.
// The user said: "Create reusable UI components (Buttons, Cards, Inputs) <!-- id: 15 --> [x]"
// I'll assume Label isn't there and use standard <label> with tailwind classes.

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        // TODO: Integrate with backend login API
        setTimeout(() => {
            setIsLoading(false)
            alert("Login simulation: Success!")
        }, 1500)
    }

    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="space-y-1 px-0">
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
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                                Email or Phone
                            </label>
                            <Input
                                id="email"
                                placeholder="07XX XXX XXX or name@example.com"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="username"
                                autoCorrect="off"
                                disabled={isLoading}
                                className="h-11"
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                    Password
                                </label>
                                <Link href="#" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                disabled={isLoading}
                                className="h-11"
                            />
                        </div>
                        <Button className="h-11 bg-teal-700 hover:bg-teal-800 text-lg mt-2" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 px-0">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-50 px-2 text-slate-500">
                            New to MtaaTrust?
                        </span>
                    </div>
                </div>
                <Link href="/register" className="w-full">
                    <Button variant="outline" className="w-full h-11 border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800">
                        Create an Account
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
