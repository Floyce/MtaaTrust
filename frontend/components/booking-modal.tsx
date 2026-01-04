"use client"

import { useState } from "react"
import { Calendar, CreditCard, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { api } from "@/lib/api"

interface BookingModalProps {
    providerId: string
    providerName: string
    serviceName: string
    basePrice: number // Simplified, usually fetched
    trigger?: React.ReactNode
}

export function BookingModal({ providerId, providerName, serviceName, basePrice, trigger }: BookingModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [paymentPlan, setPaymentPlan] = useState("full") // full | installments
    const [bookingFor, setBookingFor] = useState("myself") // myself | {family_member_id}
    const [bookingResult, setBookingResult] = useState<{ status: string, message: string } | null>(null)

    // Calcs
    const total = basePrice
    const upfront = paymentPlan === "installments" ? total * 0.70 : total
    const later = paymentPlan === "installments" ? total * 0.30 : 0

    async function handleBooking() {
        if (!date || !time) {
            alert("Please select a date and time")
            return
        }

        setIsLoading(true)
        try {
            // Construct DateTime string (naive)
            const scheduledDate = new Date(`${date}T${time}:00`).toISOString()

            const response = await api.post<{ status: string, message: string }>("/bookings/", {
                provider_id: providerId,
                service_name: serviceName,
                scheduled_date: scheduledDate,
                quoted_price: total,
                payment_plan: paymentPlan
            })

            setBookingResult(response)
        } catch (error: any) {
            alert(error.message || "Booking failed")
        } finally {
            setIsLoading(false)
        }
    }

    function reset() {
        setIsOpen(false)
        setBookingResult(null)
        setPaymentPlan("full")
        setDate("")
        setTime("")
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger ? trigger : (
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                        Book Now
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Book {providerName}</DialogTitle>
                    <DialogDescription>
                        {serviceName} • Estimated Total: <span className="font-bold text-slate-900">KES {total}</span>
                    </DialogDescription>
                </DialogHeader>

                {!bookingResult ? (
                    <div className="grid gap-6 py-4">
                        {/* Book For Selection (Family) */}
                        <div className="grid gap-2">
                            <Label>Book For</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
                                value={bookingFor}
                                onChange={(e) => setBookingFor(e.target.value)}
                            >
                                <option value="myself">Myself</option>
                                <option value="mama_shiro">Mama Shiro (Mom)</option>
                                <option value="uncle_ben">Uncle Ben</option>
                            </select>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="date">Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input id="date" type="date" className="pl-9" value={date} onChange={e => setDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="time">Time</Label>
                                <Input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} />
                            </div>
                        </div>

                        {/* Payment Plan */}
                        <div className="space-y-3">
                            <Label className="text-base">Payment Plan 💰</Label>
                            <RadioGroup
                                className="grid grid-cols-1 gap-4"
                            // Custom implementation of RadioGroup might expect different props, check my prev impl.
                            // My prev impl was just a div grid. 
                            // I'll manage state manually via onClick on the "label" wrapper.
                            >
                                {/* Option 1: Full Payment */}
                                <div
                                    className={`flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-slate-50 ${paymentPlan === 'full' ? 'border-teal-600 bg-teal-50' : ''}`}
                                    onClick={() => setPaymentPlan("full")}
                                >
                                    <RadioGroupItem value="full" checked={paymentPlan === 'full'} className="mt-1" />
                                    <div className="space-y-1">
                                        <Label className="font-semibold cursor-pointer">Pay Full Amount</Label>
                                        <p className="text-sm text-slate-500">
                                            Pay KES {total} now. No future payments.
                                        </p>
                                    </div>
                                </div>

                                {/* Option 2: Installments */}
                                <div
                                    className={`flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-slate-50 ${paymentPlan === 'installments' ? 'border-teal-600 bg-teal-50' : ''}`}
                                    onClick={() => setPaymentPlan("installments")}
                                >
                                    <RadioGroupItem value="installments" checked={paymentPlan === 'installments'} className="mt-1" />
                                    <div className="space-y-1">
                                        <Label className="font-semibold flex items-center gap-2 cursor-pointer">
                                            Pay Small Small (Flexible)
                                            <span className="bg-yellow-100 text-yellow-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">POPULAR</span>
                                        </Label>
                                        <p className="text-sm text-slate-500">
                                            KES {upfront} (70%) now. <br />
                                            KES {later} (30%) after completion.
                                        </p>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg flex justify-between items-center text-sm">
                            <span className="text-slate-600">Due Now:</span>
                            <span className="text-xl font-bold text-teal-700">KES {upfront}</span>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 text-center space-y-4">
                        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Request Sent!</h3>
                        <p className="text-slate-600">{bookingResult.message}</p>
                        <div className="text-sm bg-yellow-50 text-yellow-800 p-3 rounded-md mx-6">
                            Check your M-Pesa phone to complete the payment.
                        </div>
                    </div>
                )}

                <DialogFooter>
                    {!bookingResult ? (
                        <Button onClick={handleBooking} disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700">
                            {isLoading ? "Processing..." : `Confirm & Pay KES ${upfront}`}
                        </Button>
                    ) : (
                        <Button onClick={reset} className="w-full">
                            Close
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

