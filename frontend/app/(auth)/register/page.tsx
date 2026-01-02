"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, User, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [userType, setUserType] = useState<"consumer" | "provider">("consumer")

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        // TODO: Integrate with backend register API
        setTimeout(() => {
            setIsLoading(false)
            alert(`Registration simulation: Success as ${userType}!`)
        }, 1500)
    }

    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="space-y-1 px-0">
                <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                    Join MtaaTrust 
                </CardTitle>
                <CardDescription className="text-slate-500">
                    Create an account to get started
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4">
                        {/* Account Type Selector */}
                        <div className="grid grid-cols-2 gap-4 mb-2">
                            <div
                                className={cn(
                                    "cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition-all",
                                    userType === "consumer" ? "border-teal-600 bg-teal-50" : "border-slate-200 hover:border-teal-200"
                                )}
                                onClick={() => setUserType("consumer")}
                            >
                                <div className={cn("p-2 rounded-full", userType === "consumer" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500")}>
                                    <User className="h-6 w-6" />
                                </div>
                                <span className={cn("font-semibold text-sm", userType === "consumer" ? "text-teal-900" : "text-slate-600")}> I need help</span>
                            </div>

                            <div
                                className={cn(
                                    "cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition-all",
                                    userType === "provider" ? "border-teal-600 bg-teal-50" : "border-slate-200 hover:border-teal-200"
                                )}
                                onClick={() => setUserType("provider")}
                            >
                                <div className={cn("p-2 rounded-full", userType === "provider" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500")}>
                                    <Briefcase className="h-6 w-6" />
                                </div>
                                <span className={cn("font-semibold text-sm", userType === "provider" ? "text-teal-900" : "text-slate-600")}> I offer services</span>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none" htmlFor="name">
                                Full Name
                            </label>
                            <Input
                                id="name"
                                placeholder="Juma Kamau"
                                type="text"
                                autoCapitalize="words"
                                autoComplete="name"
                                autoCorrect="off"
                                disabled={isLoading}
                                className="h-11"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium leading-none" htmlFor="email">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoComplete="email"
                                    disabled={isLoading}
                                    className="h-11"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium leading-none" htmlFor="phone">
                                    Phone
                                </label>
                                <Input
                                    id="phone"
                                    placeholder="0712 345 678"
                                    type="tel"
                                    autoComplete="tel"
                                    disabled={isLoading}
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none" htmlFor="password">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                disabled={isLoading}
                                className="h-11"
                            />
                            <p className="text-[0.8rem] text-slate-500">
                                Must be at least 8 characters
                            </p>
                        </div>

                        <Button className="h-11 bg-teal-700 hover:bg-teal-800 text-lg mt-2" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 px-0">
                <div className="text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-teal-600 hover:text-teal-800 font-semibold underline underline-offset-4">
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
