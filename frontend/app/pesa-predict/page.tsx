"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Calculator, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function PesaPredictPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<{ min: number, max: number, confidence: number } | null>(null)

    // Form State
    const [service, setService] = useState("")
    const [location, setLocation] = useState("")
    const [complexity, setComplexity] = useState("medium")
    const [urgency, setUrgency] = useState("standard")

    const handleCalculate = async () => {
        if (!service || !location) return

        setIsLoading(true)
        setResult(null)

        // Mock AI Calculation Logic
        await new Promise(r => setTimeout(r, 2000))

        // Basic mock logic based on inputs
        let baseMin = 1000
        let baseMax = 2000

        if (complexity === "high") { baseMin *= 2; baseMax *= 2.5 }
        if (complexity === "low") { baseMin *= 0.5; baseMax *= 0.8 }

        if (urgency === "emergency") { baseMin *= 1.5; baseMax *= 1.5 }

        setResult({
            min: Math.round(baseMin),
            max: Math.round(baseMax),
            confidence: 94
        })
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 inline-block">
                        AI PRICING ENGINE
                    </span>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
                        Pesa Predict 🤖
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Stop guessing. Get instant, data-driven price estimates for any service in Nairobi.
                        Fair for you, fair for the pro.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Input Form */}
                    <Card className="border-none shadow-xl">
                        <CardHeader>
                            <CardTitle>Job Details</CardTitle>
                            <CardDescription>Enter specifics to get an accurate quote.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Service Type</Label>
                                <Select onValueChange={setService}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select service..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="plumbing">Plumbing Repair</SelectItem>
                                        <SelectItem value="electrical">Electrical Wiring</SelectItem>
                                        <SelectItem value="cleaning">Home Cleaning</SelectItem>
                                        <SelectItem value="painting">Painting</SelectItem>
                                        <SelectItem value="carpentry">Carpentry</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Location (Suburb)</Label>
                                <Input
                                    placeholder="e.g. Kilimani, Westlands"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Complexity</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['low', 'medium', 'high'].map((lvl) => (
                                        <div
                                            key={lvl}
                                            onClick={() => setComplexity(lvl)}
                                            className={`
                                                cursor-pointer border rounded-lg p-3 text-center capitalize text-sm transition-all
                                                ${complexity === lvl
                                                    ? 'bg-green-50 border-green-500 text-green-700 font-bold ring-1 ring-green-500'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-green-200'
                                                }
                                            `}
                                        >
                                            {lvl}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Urgency</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['standard', 'emergency'].map((lvl) => (
                                        <div
                                            key={lvl}
                                            onClick={() => setUrgency(lvl)}
                                            className={`
                                                cursor-pointer border rounded-lg p-3 text-center capitalize text-sm transition-all
                                                ${urgency === lvl
                                                    ? 'bg-green-50 border-green-500 text-green-700 font-bold ring-1 ring-green-500'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-green-200'
                                                }
                                            `}
                                        >
                                            {lvl}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                onClick={handleCalculate}
                                disabled={!service || !location || isLoading}
                                className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-lg font-bold"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Calculating...
                                    </>
                                ) : (
                                    <>
                                        <Calculator className="mr-2 h-5 w-5" /> Calculate Price
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results Area */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full"
                                >
                                    <Card className="bg-slate-900 text-white border-none shadow-2xl h-full flex flex-col justify-center overflow-hidden relative">
                                        {/* Background Glow */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -z-10" />
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -z-10" />

                                        <CardContent className="p-8 text-center space-y-8 relative z-10">
                                            <div className="space-y-2">
                                                <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">Estimated Fair Price</p>
                                                <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
                                                    KES {result.min.toLocaleString()}
                                                </div>
                                                <div className="text-2xl font-semibold text-slate-300">
                                                    - {result.max.toLocaleString()}
                                                </div>
                                            </div>

                                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-slate-300">AI Confidence Score</span>
                                                    <span className="text-green-400 font-bold">{result.confidence}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${result.confidence}%` }}
                                                        transition={{ duration: 1, delay: 0.5 }}
                                                        className="h-full bg-green-500 rounded-full"
                                                    />
                                                </div>
                                                <p className="text-xs text-slate-400 mt-2 text-left">
                                                    Based on {Math.floor(Math.random() * 500) + 500} similar jobs in {location || 'Nairobi'} this month.
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-slate-800 p-3 rounded-lg text-left">
                                                    <p className="text-xs text-slate-400 mb-1">Market Trend</p>
                                                    <div className="flex items-center text-green-400 font-bold">
                                                        <TrendingUp className="h-4 w-4 mr-1" /> Stable
                                                    </div>
                                                </div>
                                                <div className="bg-slate-800 p-3 rounded-lg text-left">
                                                    <p className="text-xs text-slate-400 mb-1">Best Day</p>
                                                    <div className="flex items-center text-blue-400 font-bold">
                                                        <Sparkles className="h-4 w-4 mr-1" /> Weekdays
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50"
                                >
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                        <Calculator className="h-10 w-10 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-700">Ready to Calculate</h3>
                                    <p className="text-slate-500 text-center max-w-xs mt-2">
                                        Select your requirements on the left to unlock an instant AI price prediction.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    )
}
