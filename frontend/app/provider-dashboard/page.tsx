"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
    XCircle,
    Clock,
    MoreHorizontal,
    MapPin,
    Calendar
} from "lucide-react"

// Mock Data
const STATS = [
    { label: "Total Revenue", value: "KES 45,200", icon: Wallet, trend: "+12% vs last month", color: "text-teal-600 bg-teal-50" },
    { label: "Jobs Completed", value: "24", icon: Briefcase, trend: "+4 new this week", color: "text-blue-600 bg-blue-50" },
    { label: "Profile Views", value: "1,204", icon: Users, trend: "+18% vs last month", color: "text-purple-600 bg-purple-50" },
    { label: "Average Rating", value: "4.8", icon: Star, trend: "Based on 124 reviews", color: "text-amber-600 bg-amber-50" },
]

const INCOMING_REQUESTS = [
    {
        id: "REQ-991",
        client: "Mercy Wanjiku",
        location: "Kileleshwa, Othaya Road",
        service: "Electrical Repair",
        description: "My master bedroom lights are flickering and sometimes go off completely.",
        date: "Today, 10:30 AM",
        budget: "KES 2,000 Est.",
        status: "pending"
    },
    {
        id: "REQ-992",
        client: "Tom Odhiambo",
        location: "Langata, Phenom Estate",
        service: "Socket Installation",
        description: "Need 2 new sockets installed in the home office.",
        date: "Yesterday, 4:15 PM",
        budget: "KES 1,500 Est.",
        status: "pending"
    }
]

const ACTIVE_JOBS = [
    {
        id: "JOB-881",
        client: "Alice M.",
        location: "Kilimani",
        status: "In Progress",
        date: "Scheduled: Today, 2:00 PM",
        amount: "KES 1,500"
    }
]

export default function ProviderDashboardPage() {
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col fixed inset-y-0 z-50">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-8 w-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
                        <span className="text-xl font-bold text-white">MtaaTrust Pro</span>
                    </div>

                    <nav className="space-y-2">
                        <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                        <SidebarItem icon={Briefcase} label="Jobs & Requests" active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} />
                        <SidebarItem icon={Wallet} label="Earnings" active={activeTab === 'earnings'} onClick={() => setActiveTab('earnings')} />
                        <SidebarItem icon={Settings} label="Profile & Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 bg-teal-800 rounded-full flex items-center justify-center text-white font-bold">JO</div>
                        <div>
                            <div className="font-semibold text-white">Juma Ochieng</div>
                            <div className="text-xs text-slate-500">Electrician</div>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30">
                        <LogOut className="h-4 w-4 mr-3" /> Sign Out
                    </Button>
                    <Link href="/" className="block mt-2">
                        <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-slate-300">
                            &larr; Back to Home
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                            <Button className="bg-teal-600 hover:bg-teal-700">
                                <TrendingUp className="h-4 w-4 mr-2" /> Boost Profile
                            </Button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {STATS.map((stat) => (
                                <Card key={stat.label} className="border-slate-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-2 rounded-lg ${stat.color}`}>
                                                <stat.icon className="h-5 w-5" />
                                            </div>
                                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                                {stat.trend}
                                            </span>
                                        </div>
                                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                        <div className="text-sm text-slate-500">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Incoming Requests */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-slate-900">New Requests</h2>
                                    <Button variant="link" className="text-teal-600">View All</Button>
                                </div>
                                {INCOMING_REQUESTS.map((req) => (
                                    <Card key={req.id} className="border-teal-100 bg-teal-50/30">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex gap-4">
                                                    <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold shrink-0">
                                                        {req.client.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900">{req.client}</h3>
                                                        <div className="text-sm text-slate-500 flex items-center gap-1">
                                                            <MapPin className="h-3 w-3" /> {req.location}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-slate-900">{req.budget}</div>
                                                    <div className="text-xs text-slate-500">{req.date}</div>
                                                </div>
                                            </div>

                                            <div className="bg-white p-3 rounded-lg border border-slate-200 mb-4 text-sm text-slate-600">
                                                <span className="font-semibold text-slate-900 block mb-1">{req.service}</span>
                                                "{req.description}"
                                            </div>

                                            <div className="flex gap-3">
                                                <Button className="flex-1 bg-teal-600 hover:bg-teal-700">Accept Request</Button>
                                                <Button variant="outline" className="flex-1 border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-100">Decline</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Active Jobs Sidebar in Overview */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-bold text-slate-900">Today's Schedule</h2>
                                <Card className="border-slate-200">
                                    <CardContent className="p-0">
                                        {ACTIVE_JOBS.map((job, i) => (
                                            <div key={job.id} className={`p-4 ${i !== ACTIVE_JOBS.length - 1 ? 'border-b border-slate-100' : ''}`}>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                    <div className="text-sm font-semibold text-slate-900">{job.status}</div>
                                                </div>
                                                <div className="font-medium text-slate-900 mb-1">{job.client} - {job.location}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                                                    <Clock className="h-3 w-3" /> {job.date}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Button size="sm" variant="outline" className="h-8 text-xs">
                                                        View Details
                                                    </Button>
                                                    <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700 text-white" onClick={() => alert(`Initiating M-Pesa STK Push to ${job.client}...`)}>
                                                        Request Payment
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="p-4 bg-slate-50 rounded-b-xl text-center">
                                            <Link href="#" className="text-xs font-medium text-teal-600 hover:text-teal-700">
                                                View Full Calendar
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'jobs' && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h1 className="text-2xl font-bold text-slate-900">Job Management</h1>
                        <p className="text-slate-500">Full job list and history implementation coming soon...</p>
                    </div>
                )}

                {activeTab === 'earnings' && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h1 className="text-2xl font-bold text-slate-900">Earnings & Payouts</h1>
                        <p className="text-slate-500">Detailed financial charts implementation coming soon...</p>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
                        <Card>
                            <CardHeader>
                                <CardTitle>Business Details</CardTitle>
                                <CardDescription>Update your service information seen by customers.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Business Name</label>
                                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue="Juma's Electricals" />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">About</label>
                                    <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue="Professional electrician with over 7 years of experience..." />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    )
}

function SidebarItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm
                ${active ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}
            `}
        >
            <Icon className="h-5 w-5" />
            {label}
        </button>
    )
}
