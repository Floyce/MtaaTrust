"use client"

import { useState } from "react"
import { Phone, CheckCircle2, Headphones } from "lucide-react"
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
import { api } from "@/lib/api"

export function CallbackModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [reason, setReason] = useState("general")
    const [showSuccess, setShowSuccess] = useState(false)

    async function handleSubmit() {
        if (!name || !phone) {
            alert("Please provide name and phone number.")
            return
        }

        setIsLoading(true)
        try {
            await api.post("/support/callback", {
                name,
                phone,
                reason,
                notes: "Requested from web floating button"
            })
            setShowSuccess(true)
        } catch (error: any) {
            alert("Failed to submit request. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    function reset() {
        setIsOpen(false)
        setShowSuccess(false)
        setName("")
        setPhone("")
        setReason("general")
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="fixed bottom-24 right-6 h-12 w-12 rounded-full shadow-lg bg-slate-900 hover:bg-slate-800 z-50 flex items-center justify-center transition-transform hover:scale-105"
                    size="icon"
                >
                    <Phone className="h-5 w-5 text-white" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Headphones className="h-5 w-5 text-teal-600" />
                        Request a Call-Back
                    </DialogTitle>
                    <DialogDescription>
                        Need human help? We'll call you within 15 minutes.
                    </DialogDescription>
                </DialogHeader>

                {!showSuccess ? (
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">My Name</Label>
                            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Doe" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="reason">Reason</Label>
                            <select
                                id="reason"
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                                value={reason}
                                onChange={e => setReason(e.target.value)}
                            >
                                <option value="general">General Inquiry</option>
                                <option value="booking_issue">Booking Issue</option>
                                <option value="payment">Payment Problem</option>
                                <option value="provider_signup">Provider Sign-up</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    <div className="py-6 text-center space-y-4">
                        <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="h-7 w-7 text-green-600" />
                        </div>
                        <h3 className="font-bold text-slate-900">Request Received!</h3>
                        <p className="text-slate-600 text-sm">Keep your line open. An agent is assigned.</p>
                    </div>
                )}

                <DialogFooter>
                    {!showSuccess ? (
                        <Button onClick={handleSubmit} disabled={isLoading} className="w-full bg-slate-900 hover:bg-slate-800">
                            {isLoading ? "Submitting..." : "Call Me Back"}
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
