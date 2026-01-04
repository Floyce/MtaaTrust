"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
    LayoutDashboard,
    Briefcase,
    Wallet,
    Settings,
    LogOut,
    TrendingUp,
    Users,
    Star,
    CheckCircle2,
    Clock,
    MapPin,
    Calendar,
    BarChart3,
    FileText,
    Megaphone,
    GraduationCap,
    MoreHorizontal
} from "lucide-react"
import { Navbar } from "@/components/navbar"

// Mock Data
const STATS = [
    { label: "Today's Earnings", value: "KES 8,450", icon: Wallet, trend: "+12%", color: "text-emerald-600 bg-emerald-50" },
    { label: "Active Jobs", value: "3", icon: Briefcase, trend: "Busy", color: "text-blue-600 bg-blue-50" },
    { label: "Response Rate", value: "92%", icon: Clock, trend: "-2%", color: "text-amber-600 bg-amber-50" },
    { label: "Trust Score", value: "87", icon: Star, trend: "Top Rated", color: "text-purple-600 bg-purple-50" },
]

const INCOMING_REQUESTS = [
    {
        id: "REQ-991",
        client: "Mercy Wanjiku",
        location: "Kileleshwa, Othaya Road",
        service: "Electrical Repair",
        description: "My master bedroom lights are flickering and sometimes go off completely.",
        time: "10 mins ago",
        priority: "emergency",
        budget: "KES 2,000 Est."
    },
    {
        id: "REQ-992",
        client: "Tom Odhiambo",
        location: "Langata, Phenom Estate",
        service: "Socket Installation",
        description: "Need 2 new sockets installed in the home office.",
        time: "2 hours ago",
        priority: "normal",
        budget: "KES 1,500 Est."
    }
]

const ACTIVE_JOBS = [
    {
        id: "JOB-881",
        client: "Alice M.",
        location: "Kilimani",
        status: "In Progress",
        time: "Started 1 hour ago",
        amount: "KES 1,500"
    }
]

export default function ProviderDashboardPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Provide specialized navbar or use standard one with role check */}
            <Navbar />

            <main className="container mx-auto px-4 py-8 max-w-7xl">

                {/* Stats Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {STATS.map((stat, i) => (
                        <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.color}`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Job Management */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Emergency Alert Banner (Mock) */}
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between animate-pulse">
                            <div className="flex items-center gap-3 text-red-800">
                                <div className="bg-red-100 p-2 rounded-full"><Clock className="h-5 w-5 text-red-600" /></div>
                                <span className="font-bold">🚨 EMERGENCY JOB NEARBY: Leaking Pipe in Karen (2.3km)</span>
                            </div>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white border-none">View</Button>
                        </div>

                        {/* Job Requests */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-900">New Requests <span className="text-slate-400 text-sm font-normal">(5)</span></h2>
                                <Button variant="ghost" className="text-teal-600">View All</Button>
                            </div>
                            <div className="space-y-4">
                                {INCOMING_REQUESTS.map((req) => (
                                    <Card key={req.id} className={`border-l-4 ${req.priority === 'emergency' ? 'border-l-red-500 bg-red-50/10' : 'border-l-teal-500'} shadow-sm`}>
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex gap-4">
                                                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700">
                                                        {req.client.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900">{req.client}</h3>
                                                        <div className="text-sm text-slate-500 flex items-center gap-1">
                                                            <MapPin className="h-3 w-3" /> {req.location}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-semibold text-slate-400">{req.time}</span>
                                            </div>

                                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 my-4 text-sm text-slate-700">
                                                <span className="font-semibold block mb-1">{req.service}</span>
                                                "{req.description}"
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <span className="font-bold text-slate-900">{req.budget}</span>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" className="text-slate-500 hover:text-slate-700">Decline</Button>
                                                    <Button className="bg-teal-600 hover:bg-teal-700">Accept Job</Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Active Jobs */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Active Jobs <span className="text-slate-400 text-sm font-normal">(3)</span></h2>
                            {ACTIVE_JOBS.map((job) => (
                                <Card key={job.id} className="border-slate-200">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                            <div>
                                                <h3 className="font-bold text-slate-900">{job.client} - {job.location}</h3>
                                                <p className="text-xs text-slate-500">{job.time}</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                                            Request Payment
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </section>
                    </div>

                    {/* Right Column: Calendar & Tools */}
                    <div className="space-y-8">
                        {/* Integrated Calendar Mock */}
                        <Card className="border-none shadow-md overflow-hidden">
                            <CardHeader className="bg-teal-700 text-white p-4">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Calendar className="h-4 w-4" /> Schedule
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="p-4 bg-white min-h-[300px] flex items-center justify-center text-slate-400 text-sm">
                                    [FullCalendar Component Placeholder]
                                    <br />
                                    3 Jobs Scheduled Today
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 p-2 justify-center">
                                <Button variant="link" size="sm" className="text-teal-700 h-8">View Full Calendar</Button>
                            </CardFooter>
                        </Card>

                        {/* Quick Tools */}
                        <section>
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Tools</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <ToolButton icon={BarChart3} label="Analytics" />
                                <ToolButton icon={FileText} label="Invoices" />
                                <ToolButton icon={Megaphone} label="Broadcast" />
                                <ToolButton icon={GraduationCap} label="Training" />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

function ToolButton({ icon: Icon, label }: any) {
    return (
        <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-md transition-all group">
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors text-slate-500">
                <Icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{label}</span>
        </button>
    )
}
