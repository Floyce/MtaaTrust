"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle, Calendar, MessageSquare, CreditCard, User, LogOut } from "lucide-react"
import Link from "next/link"

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
    },
    {
        id: "BK-5678",
        provider: "Pete the Plumber",
        service: "Sink Repair",
        date: "Mon, 15th Oct",
        status: "cancelled",
        amount: "KES 0",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Peter"
    }
]

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("bookings")

    return (
        <div className="min-h-screen bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 space-y-2 shrink-0">
                        <div className="p-4 mb-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                            <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                                JK
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900">Juma Kamau</div>
                                <div className="text-xs text-slate-500">Consumer Account</div>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            <Button
                                variant={activeTab === 'bookings' ? "secondary" : "ghost"}
                                className={`w-full justify-start ${activeTab === 'bookings' ? "bg-teal-50 text-teal-800" : "text-slate-600"}`}
                                onClick={() => setActiveTab('bookings')}
                            >
                                <Calendar className="h-4 w-4 mr-3" /> My Bookings
                            </Button>
                            <Button
                                variant={activeTab === 'payments' ? "secondary" : "ghost"}
                                className={`w-full justify-start ${activeTab === 'payments' ? "bg-teal-50 text-teal-800" : "text-slate-600"}`}
                                onClick={() => setActiveTab('payments')}
                            >
                                <CreditCard className="h-4 w-4 mr-3" /> Payments
                            </Button>
                            <Button
                                variant={activeTab === 'profile' ? "secondary" : "ghost"}
                                className={`w-full justify-start ${activeTab === 'profile' ? "bg-teal-50 text-teal-800" : "text-slate-600"}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                <User className="h-4 w-4 mr-3" /> Profile Settings
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-4"
                            >
                                <LogOut className="h-4 w-4 mr-3" /> Sign Out
                            </Button>
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-6">
                        {activeTab === 'bookings' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
                                    <Link href="/providers">
                                        <Button className="bg-teal-600 hover:bg-teal-700">Book New Service</Button>
                                    </Link>
                                </div>

                                {/* Active Bookings */}
                                <div className="grid gap-4">
                                    {MOCK_BOOKINGS.map((booking) => (
                                        <Card key={booking.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                    <div className="flex gap-4 items-center">
                                                        <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden shrink-0">
                                                            <img src={booking.image} alt={booking.provider} className="h-full w-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-slate-900">{booking.service}</h3>
                                                            <p className="text-sm text-slate-500">with {booking.provider}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm">
                                                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg">
                                                            <Calendar className="h-4 w-4 text-slate-400" />
                                                            {booking.date}
                                                        </div>
                                                        <div className="font-semibold text-slate-900">
                                                            {booking.amount}
                                                        </div>
                                                        <div>
                                                            <StatusBadge status={booking.status} />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {booking.status === 'confirmed' && (
                                                                <Button size="sm" variant="outline" className="h-8">
                                                                    <MessageSquare className="h-3 w-3 mr-2" /> Chat
                                                                </Button>
                                                            )}
                                                            {booking.status === 'completed' && (
                                                                <Button size="sm" variant="ghost" className="h-8 text-teal-700">
                                                                    View Receipt
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'payments' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment History</CardTitle>
                                    <CardDescription>View your recent transactions.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                            <CreditCard className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-slate-900">No transactions yet</h3>
                                            <p className="text-slate-500 max-w-sm">
                                                Once you complete a service, your payment history will appear here.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'profile' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Settings</CardTitle>
                                    <CardDescription>Manage your account details and preferences.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-500">Profile editing form would go here...</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case 'confirmed':
            return (
                <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                    <Clock className="h-3 w-3" /> Upcoming
                </span>
            )
        case 'completed':
            return (
                <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                    <CheckCircle2 className="h-3 w-3" /> Completed
                </span>
            )
        case 'cancelled':
            return (
                <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    <AlertCircle className="h-3 w-3" /> Cancelled
                </span>
            )
        default:
            return null
    }
}
