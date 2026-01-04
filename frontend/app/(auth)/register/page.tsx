"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, User, Briefcase, ChevronRight, Loader2, X, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState<"role" | "form">("role")
    const [userType, setUserType] = useState<"consumer" | "provider">("consumer")

    // Form Stats
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [passwordScore, setPasswordScore] = useState(0)

    // Password Validation States
    const [hasMinLength, setHasMinLength] = useState(false)
    const [hasNumber, setHasNumber] = useState(false)
    const [hasSpecialChar, setHasSpecialChar] = useState(false)
    const [hasUppercase, setHasUppercase] = useState(false)

    const searchParams = useSearchParams()

    useEffect(() => {
        const typeParam = searchParams.get('type')
        if (typeParam === 'consumer') {
            setUserType('consumer')
            setStep('form')
        } else if (typeParam === 'provider') {
            setUserType('provider')
            setStep('form')
        }
    }, [searchParams])

    useEffect(() => {
        // Detailed validation
        setHasMinLength(password.length >= 8)
        setHasNumber(/[0-9]/.test(password))
        setHasSpecialChar(/[^A-Za-z0-9]/.test(password))
        setHasUppercase(/[A-Z]/.test(password))

        // Simple score for progress bar
        let score = 0;
        if (password.length >= 8) score += 25;
        if (/[A-Z]/.test(password)) score += 25;
        if (/[0-9]/.test(password)) score += 25;
        if (/[^A-Za-z0-9]/.test(password)) score += 25;
        setPasswordScore(score);
    }, [password]);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.target as HTMLFormElement)
            const name = formData.get("name") as string
            const email = formData.get("email") as string
            const phone = formData.get("phone") as string
            const confirmPassword = formData.get("confirmPassword") as string

            // Strict Validation
            if (passwordScore < 100) {
                alert("Please meet all password requirements.")
                setIsLoading(false)
                return
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match")
                setIsLoading(false)
                return
            }

            // Register
            await api.post("/auth/register", {
                full_name: name,
                email,
                phone,
                password,
                user_type: userType,
            })

            // Auto-Login
            try {
                const loginRes = await api.post<{ access_token: string, token_type: string }>("/auth/login", {
                    login_identifier: phone, // Using phone as identifier
                    password
                })

                if (loginRes.access_token) {
                    localStorage.setItem("access_token", loginRes.access_token)

                    // Fetch user data for cache
                    const user = await api.get<any>("/users/me")
                    localStorage.setItem("user_data", JSON.stringify(user))

                    if (userType === 'provider') {
                        router.push("/provider/complete-profile") // Redirect to profile completion
                    } else {
                        window.location.href = "/" // Redirect to Homepage (Consumer Dashboard)
                    }
                } else {
                    router.push("/login?registered=true")
                }
            } catch (loginError) {
                router.push("/login?registered=true")
            }

        } catch (error: any) {
            alert(error.message || "Registration failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            <AnimatePresence mode="wait">
                {step === "role" ? (
                    <motion.div
                        key="role-selection"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-600">
                                Find local pros that you can trust
                            </h1>
                            <p className="text-slate-600 text-lg">Join the most trusted community in Nairobi.</p>
                        </div>

                        <div className="grid gap-4">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setUserType("consumer")}
                                className={cn(
                                    "cursor-pointer relative overflow-hidden rounded-2xl border-2 p-6 flex items-center gap-4 transition-all shadow-sm hover:shadow-md",
                                    userType === "consumer" ? "border-primary bg-green-50/50 ring-1 ring-primary" : "border-slate-200 bg-white hover:border-primary/50"
                                )}
                            >
                                <div className={cn("p-4 rounded-full transition-colors", userType === "consumer" ? "bg-primary text-white" : "bg-slate-100 text-slate-500")}>
                                    <User className="h-8 w-8" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-slate-900">I need a Service</h3>
                                    <p className="text-sm text-slate-500">Find trusted pros for your home or business.</p>
                                </div>
                                {userType === "consumer" && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4 text-primary">
                                        <Check className="h-6 w-6" />
                                    </motion.div>
                                )}
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setUserType("provider")}
                                className={cn(
                                    "cursor-pointer relative overflow-hidden rounded-2xl border-2 p-6 flex items-center gap-4 transition-all shadow-sm hover:shadow-md",
                                    userType === "provider" ? "border-amber-500 bg-amber-50/50 ring-1 ring-amber-500" : "border-slate-200 bg-white hover:border-amber-500/50"
                                )}
                            >
                                <div className={cn("p-4 rounded-full transition-colors", userType === "provider" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500")}>
                                    <Briefcase className="h-8 w-8" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-slate-900">I Offer Services</h3>
                                    <p className="text-sm text-slate-500">Find jobs, build reputation, and get paid.</p>
                                </div>
                                {userType === "provider" && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4 text-amber-500">
                                        <Check className="h-6 w-6" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        <Button
                            className="w-full h-14 text-lg font-bold rounded-xl mt-4 bg-primary hover:bg-primary/90"
                            size="lg"
                            onClick={() => setStep("form")}
                        >
                            Continue <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>

                        <div className="text-center">
                            <Link href="/login" className="text-sm text-primary font-semibold hover:underline">
                                Already have an account? Login
                            </Link>
                        </div>

                    </motion.div>
                ) : (
                    <motion.div
                        key="registration-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
                            <CardHeader className="space-y-1">
                                <Button
                                    variant="ghost"
                                    className="w-fit p-0 h-auto mb-2 text-slate-500 hover:text-primary"
                                    onClick={() => setStep("role")}
                                >
                                    ← Back
                                </Button>
                                <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                                    {userType === "consumer" ? "Create Consumer Profile" : "Provider Registration"}
                                </CardTitle>
                                <CardDescription>
                                    Enter your details to verify your identity.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={onSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none" htmlFor="name">Full Name</label>
                                        <Input id="name" name="name" placeholder="Juma Kamau" required className="h-11 bg-slate-50" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                                            <Input id="email" name="email" type="email" placeholder="name@example.com" className="h-11 bg-slate-50" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none" htmlFor="phone">Phone</label>
                                            <Input id="phone" name="phone" type="tel" placeholder="0712 345 678" required className="h-11 bg-slate-50" />
                                        </div>
                                    </div>

                                    {/* Provider Validation Questions */}
                                    {userType === 'provider' && (
                                        <div className="grid grid-cols-2 gap-4 bg-amber-50 p-4 rounded-xl border border-amber-100">
                                            <div className="space-y-2 col-span-2">
                                                <h4 className="font-bold text-amber-800 text-sm flex items-center gap-2">
                                                    <Briefcase className="h-4 w-4" /> Professional Details
                                                </h4>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium leading-none text-amber-900">Primary Service</label>
                                                <select name="service_category" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required>
                                                    <option value="">Select...</option>
                                                    <option value="plumbing">Plumbing</option>
                                                    <option value="electrical">Electrical</option>
                                                    <option value="medical">Medical / Nursing</option>
                                                    <option value="cleaning">Cleaning</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium leading-none text-amber-900">Experience (Yrs)</label>
                                                <Input name="experience" type="number" min="0" placeholder="e.g. 5" className="bg-white border-amber-200" required />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none">Password</label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="h-11 bg-slate-50 pr-10"
                                                placeholder="Create password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </button>
                                        </div>

                                        {/* Live Validation Checklist */}
                                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                                            <div className={cn("flex items-center gap-1", hasMinLength ? "text-green-600" : "text-slate-400")}>
                                                {hasMinLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} 8+ characters
                                            </div>
                                            <div className={cn("flex items-center gap-1", hasNumber ? "text-green-600" : "text-slate-400")}>
                                                {hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} Include a number
                                            </div>
                                            <div className={cn("flex items-center gap-1", hasSpecialChar ? "text-green-600" : "text-slate-400")}>
                                                {hasSpecialChar ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} Special character
                                            </div>
                                            <div className={cn("flex items-center gap-1", hasUppercase ? "text-green-600" : "text-slate-400")}>
                                                {hasUppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} Uppercase letter
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none">Confirm Password</label>
                                        <Input name="confirmPassword" type="password" required className="h-11 bg-slate-50" placeholder="Confirm password" />
                                    </div>

                                    <Button className="w-full h-12 text-lg font-bold mt-4 bg-primary hover:bg-primary/90" disabled={isLoading || passwordScore < 100}>
                                        {isLoading ? (
                                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...</>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
