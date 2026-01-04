"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarIcon, CheckCircle2, Repeat, Plus, Loader2 } from "lucide-react"
import { api } from "@/lib/api"
import { format } from "date-fns"

interface Subscription {
    id: string
    service_type: string
    frequency: string
    next_run_date: string
    status: string
}

export default function FixOncePage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [loading, setLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        fetchSubscriptions()
    }, [])

    const fetchSubscriptions = async () => {
        try {
            const data = await api.get<Subscription[]>("/subscriptions/me")
            setSubscriptions(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsCreating(true)
        const formData = new FormData(e.currentTarget)

        try {
            await api.post("/subscriptions/create", {
                service_type: formData.get("service"),
                frequency: formData.get("frequency"),
                next_run_date: new Date().toISOString(), // Default to starting now for demo
                provider_id: null
            })
            await fetchSubscriptions()
            // Reset form or close dialog if we had one (inline for now)
            alert("Maintenance plan created!")
        } catch (error) {
            alert("Failed to create plan")
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                            Fix Once <Repeat className="h-8 w-8 text-teal-600" />
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Set it and forget it. Recurring maintenance for your home.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Setup Form */}
                        <Card className="md:col-span-1 h-fit">
                            <CardHeader>
                                <CardTitle>New Plan</CardTitle>
                                <CardDescription>Schedule a new recurring service.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="service">Service Type</Label>
                                        <Select name="service" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select service" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Home Cleaning">Home Cleaning</SelectItem>
                                                <SelectItem value="Gardening">Gardening</SelectItem>
                                                <SelectItem value="Pool Maintenance">Pool Maintenance</SelectItem>
                                                <SelectItem value="Pest Control">Pest Control</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="frequency">Frequency</Label>
                                        <Select name="frequency" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="How often?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                <SelectItem value="biweekly">Every 2 Weeks</SelectItem>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isCreating}>
                                        {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                                        Start Plan
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Active Subscriptions List */}
                        <div className="md:col-span-2 space-y-4">
                            <h2 className="text-xl font-semibold text-slate-800">Your Active Plans</h2>
                            {loading ? (
                                <div className="text-center py-10 text-slate-400">Loading plans...</div>
                            ) : subscriptions.length === 0 ? (
                                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300">
                                    <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <CalendarIcon className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-900">No active plans</h3>
                                    <p className="text-slate-500">Create a plan to automate your home tasks.</p>
                                </div>
                            ) : (
                                subscriptions.map((sub) => (
                                    <Card key={sub.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900">{sub.service_type}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded capitalize">
                                                        {sub.frequency}
                                                    </span>
                                                    <span className="text-sm text-slate-500">
                                                        Next: {format(new Date(sub.next_run_date), "MMM do, yyyy")}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                                    <CheckCircle2 className="h-4 w-4" /> Active
                                                </span>
                                                <Button variant="link" size="sm" className="text-slate-400 hover:text-red-500 p-0 h-auto mt-1">
                                                    Cancel
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
