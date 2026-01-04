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

// ... imports
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

// Data for Charts
const EARNINGS_DATA = [
    { name: 'Mon', amount: 4000 },
    { name: 'Tue', amount: 3000 },
    { name: 'Wed', amount: 2000 },
    { name: 'Thu', amount: 2780 },
    { name: 'Fri', amount: 1890 },
    { name: 'Sat', amount: 6390 },
    { name: 'Sun', amount: 3490 },
];

export default function ProviderDashboardPage() {
    const [isEmergencySoundOn, setIsEmergencySoundOn] = useState(true)

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
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

                        {/* Emergency Alert Banner */}
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center justify-between animate-pulse relative overflow-hidden">
                            <div className="absolute inset-0 bg-red-500/5 animate-ping"></div>
                            <div className="flex items-center gap-3 text-red-800 z-10">
                                <div className="bg-red-100 p-2 rounded-full"><Clock className="h-6 w-6 text-red-600 animate-bounce" /></div>
                                <div>
                                    <span className="font-extrabold text-lg block">🚨 EMERGENCY JOB NEARBY</span>
                                    <span className="text-sm">Leaking Pipe in Karen (2.3km) - High Priority</span>
                                </div>
                            </div>
                            <div className="flex gap-2 z-10">
                                <Button variant="ghost" size="icon" onClick={() => setIsEmergencySoundOn(!isEmergencySoundOn)} className="text-red-700 hover:text-red-900 hover:bg-red-100">
                                    {isEmergencySoundOn ? "🔊" : "🔇"}
                                </Button>
                                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-500/30">View Now</Button>
                            </div>
                        </div>

                        {/* Job Requests */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-900">New Requests <span className="text-slate-400 text-sm font-normal">(5)</span></h2>
                                <Button variant="ghost" className="text-green-600">View All</Button>
                            </div>
                            <div className="space-y-4">
                                {INCOMING_REQUESTS.map((req) => (
                                    <Card key={req.id} className={`border-l-4 ${req.priority === 'emergency' ? 'border-l-red-500 bg-red-50/10' : 'border-l-green-500'} shadow-sm group hover:shadow-md transition-all`}>
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex gap-4">
                                                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700 border border-slate-200">
                                                        {req.client.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                                            {req.client}
                                                            {req.priority === 'emergency' && <Badge variant="destructive" className="animate-pulse">Emergency</Badge>}
                                                            {req.priority === 'normal' && <Badge variant="secondary" className="bg-blue-100 text-blue-700">Standard</Badge>}
                                                        </h3>
                                                        <div className="text-sm text-slate-500 flex items-center gap-1">
                                                            <MapPin className="h-3 w-3" /> {req.location}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-semibold text-slate-400">{req.time}</span>
                                            </div>

                                            <div className="bg-white/50 p-3 rounded-lg border border-slate-100 my-4 text-sm text-slate-700">
                                                <span className="font-semibold block mb-1 flex items-center gap-2"><Briefcase className="h-3 w-3" /> {req.service}</span>
                                                "{req.description}"
                                            </div>

                                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-4">
                                                <span className="font-bold text-slate-900 text-lg">{req.budget}</span>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" className="text-slate-500 hover:text-slate-700 hover:bg-slate-100">Decline</Button>
                                                    <Button className="bg-green-600 hover:bg-green-700 shadow-md shadow-green-600/20">Accept Job</Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Earnings Analytics */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Earnings Analytics</h2>
                            <Card className="border-none shadow-sm">
                                <CardContent className="p-6">
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={EARNINGS_DATA}>
                                                <defs>
                                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} /> {/* green-600 */}
                                                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value: number) => `K${value}`} />
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                    cursor={{ stroke: '#16a34a', strokeWidth: 1 }}
                                                />
                                                <Area type="monotone" dataKey="amount" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Active Jobs */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Active Jobs <span className="text-slate-400 text-sm font-normal">(3)</span></h2>
                            {ACTIVE_JOBS.map((job) => (
                                <Card key={job.id} className="border-slate-200">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                                            <div>
                                                <h3 className="font-bold text-slate-900">{job.client} - {job.location}</h3>
                                                <p className="text-xs text-slate-500">{job.time}</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
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
                        <Card className="border-none shadow-md overflow-hidden ring-1 ring-slate-100">
                            <CardHeader className="bg-green-700 text-white p-4">
                                <CardTitle className="text-base flex items-center justify-between">
                                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Schedule</span>
                                    <span className="text-xs bg-white/20 px-2 py-1 rounded">Jan 2026</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 bg-white">
                                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-slate-400 font-medium">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                    {/* Mock Dates */}
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                                        const hasEvent = [4, 15, 22].includes(day);
                                        const isToday = day === 4;
                                        return (
                                            <button
                                                key={day}
                                                className={`
                                                    h-8 w-8 rounded-full flex items-center justify-center transition-all
                                                    ${isToday ? 'bg-green-600 text-white font-bold shadow-md' : 'hover:bg-slate-100 text-slate-700'}
                                                    ${hasEvent && !isToday ? 'bg-green-50 text-green-700 font-semibold ring-1 ring-green-200' : ''}
                                                `}
                                            >
                                                {day}
                                            </button>
                                        )
                                    })}
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Upcoming</p>
                                    <div className="flex items-center gap-3 text-sm p-2 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer hover:bg-green-50 transition-colors">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <span className="flex-1 font-medium">Plumbing @ Karen</span>
                                        <span className="text-slate-500 text-xs">2:00 PM</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 p-2 justify-center">
                                <Button variant="link" size="sm" className="text-green-700 h-8">View Full Calendar</Button>
                            </CardFooter>
                        </Card>

                        {/* Quick Tools */}
                        <section>
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <ToolButton icon={Briefcase} label="Add Service" />
                                <ToolButton icon={FileText} label="Create Invoice" onClick={() => alert("Generate Invoice Modal")} />
                                <ToolButton icon={Megaphone} label="Broadcast" onClick={() => alert("Broadcast Availability")} />
                                <ToolButton icon={BarChart3} label="Analytics" />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

function ToolButton({ icon: Icon, label, onClick }: any) {
    return (
        <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all group" onClick={onClick}>
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-green-50 group-hover:text-green-600 transition-colors text-slate-500">
                <Icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{label}</span>
        </button>
    )
}
