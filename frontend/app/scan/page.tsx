"use client"

import { useState, useRef, useCallback } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Camera, Upload, AlertTriangle, CheckCircle, Wrench, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { api } from "@/lib/api"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

interface ScanResult {
    issue_detected: string
    confidence: number
    category: string
    estimated_price_min: number
    estimated_price_max: number
    urgency: string
    materials_needed: { name: string, estimated_price: number }[]
    description: string
}

export default function MtaaScanPage() {
    const webcamRef = useRef<Webcam>(null)
    const [imgSrc, setImgSrc] = useState<string | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<ScanResult | null>(null)
    const [mode, setMode] = useState<"camera" | "upload">("camera")

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc) {
            setImgSrc(imageSrc)
            analyzeImage(imageSrc)
        }
    }, [webcamRef])

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64 = reader.result as string
                setImgSrc(base64)
                analyzeImage(base64, file)
            }
            reader.readAsDataURL(file)
        }
    }

    const analyzeImage = async (base64Image: string, fileObj?: File) => {
        setIsAnalyzing(true)
        setResult(null)

        try {
            // Convert base64 to blob/file for upload if needed
            // For now, our mock backend just needs any file
            const blob = await fetch(base64Image).then(r => r.blob())
            const file = fileObj || new File([blob], "scan.jpg", { type: "image/jpeg" })

            const formData = new FormData()
            formData.append("file", file)

            const response = await api.post<ScanResult>("/scan/analyze", formData, undefined, true) // passing true force multipart
            // Custom api wrapper might not handle FormData auto-content-type well depending on implementation
            // Assuming standard fetch or axios wrapper:

            // Simulating a delay for the "Scanning" animation effect if backend is too fast
            await new Promise(r => setTimeout(r, 2000))

            setResult(response)

        } catch (error) {
            console.error(error)
            alert("Failed to analyze image. Please try again.")
            setImgSrc(null)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const reset = () => {
        setImgSrc(null)
        setResult(null)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                        Mtaa Scan AI
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Point at any repair issue for instant diagnosis & pricing.
                    </p>
                </div>

                <div className="w-full relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl aspect-[4/5] flex flex-col">
                    <AnimatePresence mode="wait">
                        {!imgSrc ? (
                            <motion.div
                                key="camera"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative flex-1 flex flex-col"
                            >
                                {mode === "camera" ? (
                                    <>
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            className="absolute inset-0 w-full h-full object-cover"
                                            videoConstraints={{ facingMode: "environment" }}
                                        />
                                        {/* HUD Overlay */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-emerald-500/50 rounded-tl-xl" />
                                            <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-emerald-500/50 rounded-tr-xl" />
                                            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-emerald-500/50 rounded-bl-xl" />
                                            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-emerald-500/50 rounded-br-xl" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-64 h-64 border border-white/20 rounded-lg animate-pulse" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center bg-slate-800">
                                        <label className="cursor-pointer flex flex-col items-center gap-4 p-8 border-2 border-dashed border-slate-600 rounded-xl hover:border-emerald-500 transition-colors">
                                            <Upload className="h-12 w-12 text-slate-400" />
                                            <span className="text-slate-300 font-medium">Click to Upload Image</span>
                                            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                                        </label>
                                    </div>
                                )}

                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex justify-center gap-6 items-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setMode(mode === "camera" ? "upload" : "camera")}
                                        className="text-white hover:bg-white/10"
                                    >
                                        {mode === "camera" ? <Upload /> : <Camera />}
                                    </Button>

                                    {mode === "camera" && (
                                        <button
                                            onClick={capture}
                                            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-white/20 active:scale-95 transition-transform"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-full" />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative flex-1 flex flex-col bg-slate-900"
                            >
                                <div className="relative h-64 flex-shrink-0">
                                    <img src={imgSrc} alt="Captured" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                                    <button onClick={reset} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white">
                                        Retake
                                    </button>
                                </div>

                                <div className="flex-1 p-6 overflow-y-auto">
                                    {isAnalyzing ? (
                                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                                            <div className="relative w-24 h-24">
                                                <div className="absolute inset-0 border-t-4 border-emerald-500 rounded-full animate-spin" />
                                                <div className="absolute inset-2 border-r-4 border-cyan-500 rounded-full animate-spin reverse" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Wrench className="h-8 w-8 text-white animate-pulse" />
                                                </div>
                                            </div>
                                            <p className="text-emerald-400 font-mono animate-pulse">ANALYZING GEOMETRY...</p>
                                        </div>
                                    ) : result ? (
                                        <div className="space-y-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded uppercase">
                                                        {result.category}
                                                    </span>
                                                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded uppercase">
                                                        {result.urgency} Urgency
                                                    </span>
                                                </div>
                                                <h2 className="text-2xl font-bold text-white">{result.issue_detected}</h2>
                                                <p className="text-slate-400 text-sm mt-1">{result.description}</p>
                                            </div>

                                            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                                                <h3 className="text-slate-400 text-xs uppercase font-bold mb-3">Estimated Cost</h3>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-3xl font-bold text-white">
                                                        KES {result.estimated_price_min} - {result.estimated_price_max}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1">Includes labor & materials</p>
                                            </div>

                                            <div className="space-y-3">
                                                <h3 className="text-slate-400 text-xs uppercase font-bold">Recommended Materials</h3>
                                                {result.materials_needed.map((m, i) => (
                                                    <div key={i} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg">
                                                        <span className="text-sm font-medium">{m.name}</span>
                                                        <span className="text-sm text-slate-400">~Ksh {m.estimated_price}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link href="/dashboard">
                                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 text-lg">
                                                    Book a {result.category} Pro
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="text-center text-red-400">
                                            <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
                                            <p>Analysis failed. Please try again.</p>
                                            <Button onClick={reset} variant="outline" className="mt-4">Try Again</Button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
