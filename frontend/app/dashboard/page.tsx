"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle, Camera, Users, CreditCard, ChevronRight } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"
import { EmergencySOSDialog } from "@/components/emergency-sos-dialog"
import { Navbar } from "@/components/navbar"

// Mock Data
const MOCK_BOOKINGS = [
    {
        id: "BK-7890",
        provider: "Juma's Electricals",
        service: "Electrical Repair",
        date: "Today, 2:00 PM",
        status: "confirmed",
        amount: "KES 1500",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juma"
    },
    {
        id: "BK-1234",
        provider: "Sparkle Clean Services",
        service: "Home Cleaning",
        date: "Sat, 28th Oct",
        status: "completed",
        amount: "KES 3000",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    }
]

export default function ConsumerDashboard() {
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBookings()
    }, [])

    async function fetchBookings() {
        try {
            const data = await api.get<any[]>("/bookings/")
            setBookings(data.length > 0 ? data : MOCK_BOOKINGS) // Fallback to mock if empty
        } catch (error) {
            setBookings(MOCK_BOOKINGS)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />

            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-teal-900">Karibu back, Juma! 👋</h1>
                    <p className="text-neutral-600">Here's what's happening with your home services.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Active Jobs & Activity */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Section 1: Active Jobs */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-neutral-800">Active Jobs</h2>
                                <Link href="/my-jobs" className="text-teal-600 font-medium hover:underline text-sm">
                                    View All
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {bookings.filter(b => b.status === 'confirmed').map((booking) => (
                                    <Card key={booking.id} className="border-l-4 border-l-teal-500 shadow-sm hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start">
                                                <div className="flex gap-4">
                                                    <img src={booking.image} alt="Provider" className="h-12 w-12 rounded-full bg-neutral-100" />
                                                    <div>
                                                        <h3 className="font-bold text-neutral-900">{booking.service}</h3>
                                                        <p className="text-sm text-neutral-500">with {booking.provider}</p>
                                                        <div className="flex items-center gap-2 mt-2 text-sm text-teal-700 bg-teal-50 w-fit px-2 py-1 rounded">
                                                            <Clock className="h-4 w-4" />
                                                            {booking.date}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline">View Details</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                {bookings.filter(b => b.status === 'confirmed').length === 0 && (
                                    <Card className="bg-neutral-50 border-dashed">
                                        <CardContent className="p-8 text-center text-neutral-500">
                                            <p>No active jobs right now.</p>
                                            <Link href="/providers">
                                                <Button className="mt-4 bg-teal-600 hover:bg-teal-700">Find a Pro</Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </section>

                        {/* Section 3: Recent Activity */}
                        <section>
                            <h2 className="text-xl font-bold text-neutral-800 mb-4">Recent Activity</h2>
                            <Card>
                                <CardContent className="p-0">
                                    {[
                                        { text: "Payment of KES 3,000 to Sparkle Clean", date: "2 days ago", icon: CreditCard, color: "text-blue-600 bg-blue-100" },
                                        { text: "You rated Pete the Plumber 5 stars", date: "1 week ago", icon: CheckCircle2, color: "text-amber-600 bg-amber-100" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 border-b last:border-0 hover:bg-neutral-50 transition-colors">
                                            <div className={`p-2 rounded-full ${item.color}`}>
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-neutral-900">{item.text}</p>
                                                <p className="text-xs text-neutral-500">{item.date}</p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-neutral-300" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </section>

                    </div>

                    {/* Right Column: Quick Actions */}
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-bold text-neutral-800 mb-4">Need Help?</h2>
                            <div className="grid gap-4">
                                <QuickActionCard
                                    icon={AlertCircle}
                                    title="Emergency SOS"
                                    desc="Immediate help for danger"
                                    color="text-red-600 bg-red-50 hover:bg-red-100 border-red-200"
                                    action={<EmergencySOSDialog />}
                                />
                                <Link href="/sambaza">
                                    <QuickActionCard
                                        icon={Users}
                                        title="Group Booking"
                                        desc="Save up to 30% with neighbors"
                                        color="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
                                    />
                                </Link>
                                <Link href="/scan">
                                    <QuickActionCard
                                        icon={Camera}
                                        title="Scan Problem"
                                        desc="AI Diagnosis & Quote"
                                        color="text-teal-600 bg-teal-50 hover:bg-teal-100 border-teal-200"
                                    />
                                </Link>
                            </div>
                        </section>

                        {/* Promo Card */}
                        <Card className="bg-gradient-to-br from-amber-400 to-orange-500 text-white border-none overflow-hidden relative">
                            <CardContent className="p-6 relative z-10">
                                <h3 className="font-bold text-lg mb-2">Refer a Neighbor</h3>
                                <p className="text-amber-50 text-sm mb-4">Get KES 500 for every friend who books their first service.</p>
                                <Button variant="secondary" className="w-full text-amber-700 hover:text-amber-800 font-bold">Invite Friends</Button>
                            </CardContent>
                            <div className="absolute -right-6 -bottom-6 h-32 w-32 bg-white/20 rounded-full blur-2xl"></div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

function QuickActionCard({ icon: Icon, title, desc, color, action }: any) {
    if (action) {
        return (
            <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${color}`}>
                <div className="bg-white/80 p-2.5 rounded-lg shadow-sm">
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-xs opacity-80">{desc}</p>
                </div>
                {action}
            </div>
        )
    }
    return (
        <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${color}`}>
            <div className="bg-white/80 p-2.5 rounded-lg shadow-sm">
                <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
                <h3 className="font-bold">{title}</h3>
                <p className="text-xs opacity-80">{desc}</p>
            </div>
            <ChevronRight className="h-5 w-5 opacity-50" />
        </div>
    )
}
