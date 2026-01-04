"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog" // Using standard simple overlay if Dialog fails
import { Siren, Phone, MapPin, Loader2, CheckCircle2, AlertTriangle } from "lucide-react"

// Simple Modal Implementation if Dialog is missing (Self-contained for safety)
function EmergencyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(1)
    const [searching, setSearching] = useState(false)

    // Auto-advance simulation
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (step === 2) {
            timer = setTimeout(() => setStep(3), 3000) // Finding providers...
        }
        return () => clearTimeout(timer)
    }, [step])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] bg-red-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border-2 border-red-500">
                {/* Header */}
                <div className="bg-red-600 p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                        <Siren className="h-6 w-6 animate-pulse" />
                        <span className="font-bold text-lg">HARAKA! Emergency</span>
                    </div>
                    <button onClick={onClose} className="hover:bg-red-700 p-1 rounded-full"><span className="sr-only">Close</span>✕</button>
                </div>

                <div className="p-6">
                    {step === 1 && (
                        <div className="space-y-6 text-center">
                            <div className="mx-auto bg-red-100 h-24 w-24 rounded-full flex items-center justify-center animate-pulse">
                                <AlertTriangle className="h-12 w-12 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">What's the Emergency?</h3>
                                <p className="text-slate-500 text-sm mt-1">We'll alert the 3 nearest providers immediately.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700" onClick={() => setStep(2)}>
                                    <span className="text-2xl">💧</span>
                                    Burst Pipe
                                </Button>
                                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700" onClick={() => setStep(2)}>
                                    <span className="text-2xl">⚡</span>
                                    Electrical Fire
                                </Button>
                                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700" onClick={() => setStep(2)}>
                                    <span className="text-2xl">🔒</span>
                                    Locksmith
                                </Button>
                                <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700" onClick={() => setStep(2)}>
                                    <span className="text-2xl">🚑</span>
                                    Other
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="py-8 text-center space-y-6">
                            <div className="mx-auto h-24 w-24 relative flex items-center justify-center">
                                <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
                                <MapPin className="h-8 w-8 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Locating Nearest Pros...</h3>
                                <p className="text-slate-500 text-sm">Scanning Kilimani area (500m radius)</p>
                            </div>
                            <div className="text-xs font-mono bg-slate-100 p-2 rounded text-slate-500">
                                Connecting to MtaaTrust Emergency Network...
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="mx-auto bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mb-3">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Help is on the way!</h3>
                                <p className="text-slate-500 text-sm">2 Providers accepted your request.</p>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 bg-slate-200 rounded-full overflow-hidden">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Juma" alt="Provider" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-slate-900">Juma Ochieng</div>
                                        <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                                            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                                            Arriving in 12 mins
                                        </div>
                                    </div>
                                    <a href="tel:999" className="bg-green-100 p-2 rounded-full text-green-700 hover:bg-green-200 transition-colors">
                                        <Phone className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-xs text-amber-800 flex gap-2">
                                <AlertTriangle className="h-4 w-4 shrink-0" />
                                <div>
                                    <strong>Emergency Surcharge:</strong> A 25% priority fee applies to this booking.
                                </div>
                            </div>

                            <Button className="w-full bg-slate-900 hover:bg-slate-800 h-11" onClick={onClose}>
                                Track Live Location
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export function EmergencyButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg shadow-red-600/30 flex items-center gap-2 transition-transform hover:scale-105 group animate-bounce-slow"
            >
                <div className="bg-white/20 p-2 rounded-full">
                    <Siren className="h-6 w-6 animate-pulse" />
                </div>
                <span className="font-bold pr-2 hidden group-hover:inline-block">SOS Emergency</span>
            </button>
            <EmergencyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}
