"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog" // We might need to implement Dialog if not present, assuming standard Shadcn-like structure or I'll implement a simple modal if Dialog is missing.
// Based on file list, I don't see Dialog in components/ui. I will create a simple modal implementation within this file or check if I can use a radically simple approach.
// Re-reading file list... `card.tsx`, `button.tsx`, `input.tsx` are there. `dialog.tsx` is missing.
// I will create a self-contained Modal component here to avoid dependency hell for now, or use a fixed overlay div.

import { Calendar, Clock, CheckCircle2, CreditCard, ChevronRight, ChevronLeft, X } from "lucide-react"

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    providerName: string;
    rate: string;
}

export function BookingModal({ isOpen, onClose, providerName, rate }: BookingModalProps) {
    const [step, setStep] = useState(1)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [details, setDetails] = useState("")

    if (!isOpen) return null

    const handleNext = () => setStep(step + 1)
    const handleBack = () => setStep(step - 1)

    const handleConfirm = () => {
        // Simulate API call
        setTimeout(() => {
            setStep(4) // Success step
        }, 1000)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-teal-700 p-6 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-white">Book {providerName}</h2>
                        <p className="text-teal-100 text-sm mt-1">{rate}</p>
                    </div>
                    <button onClick={onClose} className="text-teal-100 hover:text-white transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Progress Bar */}
                {step < 4 && (
                    <div className="h-1 bg-slate-100 w-full">
                        <div
                            className="h-full bg-teal-500 transition-all duration-300"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                )}

                {/* Body */}
                <div className="p-6 min-h-[300px]">
                    {step === 1 && (
                        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                            <h3 className="font-semibold text-lg text-slate-900">1. Job Details</h3>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Describe the issue</label>
                                <textarea
                                    className="w-full border border-slate-200 rounded-xl p-3 h-32 text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                                    placeholder="E.g. My kitchen sink is leaking underneath..."
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="bg-amber-50 p-3 rounded-lg flex gap-3 items-start border border-amber-100">
                                <div className="bg-amber-100 p-1 rounded text-amber-600 shrink-0 mt-0.5">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <div className="text-xs text-amber-800">
                                    <strong>Note:</strong> Pricing is an estimate. The final quote will be confirmed after the provider arrives.
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                            <h3 className="font-semibold text-lg text-slate-900">2. Date & Time</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            type="date"
                                            className="pl-9"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            type="time"
                                            className="pl-9"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100 my-4" />

                            <div className="text-sm text-slate-500">
                                <p>Requested Slot:</p>
                                <div className="font-medium text-slate-900 mt-1">
                                    {date ? new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select Date'}
                                    {' '} at {' '}
                                    {time || 'Time'}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <h3 className="font-semibold text-lg text-slate-900">3. Confirm Request</h3>

                            <div className="bg-slate-50 p-4 rounded-xl space-y-3 text-sm border border-slate-100">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Provider</span>
                                    <span className="font-medium">{providerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Date & Time</span>
                                    <span className="font-medium">{date} @ {time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Estimated Rate</span>
                                    <span className="font-medium">{rate}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 border rounded-xl border-teal-100 bg-teal-50/50">
                                <CreditCard className="h-5 w-5 text-teal-600" />
                                <div className="text-xs text-teal-800">
                                    No payment required yet. You pay via M-Pesa only after the job is completed.
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="flex flex-col items-center justify-center text-center py-6 animate-in zoom-in-95 duration-300">
                            <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                            <p className="text-slate-500 max-w-xs mx-auto mb-8">
                                We've sent your request to {providerName}. You'll receive a notification once they accept.
                            </p>
                            <Button className="w-full bg-slate-900 hover:bg-slate-800" onClick={onClose}>
                                Done
                            </Button>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {step < 4 && (
                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between">
                        {step > 1 ? (
                            <Button variant="ghost" onClick={handleBack}>
                                <ChevronLeft className="h-4 w-4 mr-2" /> Back
                            </Button>
                        ) : (
                            <div></div> // Spacer
                        )}

                        <Button
                            className="bg-teal-600 hover:bg-teal-700 min-w-[120px]"
                            onClick={step === 3 ? handleConfirm : handleNext}
                        >
                            {step === 3 ? 'Confirm Booking' : (
                                <>Next <ChevronRight className="h-4 w-4 ml-2" /></>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
