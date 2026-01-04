"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShieldCheck, Truck, UserCheck, AlertCircle } from "lucide-react"
import { api } from "@/lib/api"

interface GateLogEntry {
    id: string
    time: string
    provider_name: string
    company_name: string
    service: string
    house_number: string
    vehicle_reg: string
    status: string
}

export default function EstatePage() {
    const [logs, setLogs] = useState<GateLogEntry[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        // Fetch logs
        async function fetchLogs() {
            try {
                const data = await api.get<GateLogEntry[]>("/estate/gate-log")
                setLogs(data)
            } catch (e) {
                console.error("Failed to fetch logs")
            } finally {
                setIsLoading(false)
            }
        }
        fetchLogs()
    }, [])

    const filteredLogs = logs.filter(log =>
        log.provider_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.house_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.vehicle_reg.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const stats = {
        expected: logs.length,
        checkedIn: logs.filter(l => l.status === "Checked In").length,
        pending: logs.filter(l => l.status === "Expected").length
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-blue-900 p-3 rounded-xl text-white">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Estate Gate Pass</h1>
                        <p className="text-slate-500">Security Access Control • {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <Card className="border-l-4 border-l-blue-600">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Total Expected</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900">{stats.expected}</div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Checked In</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900">{stats.checkedIn}</div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-amber-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Pending Arrival</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900">{stats.pending}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search & Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-semibold text-slate-800">Today's Log</h3>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search Name, House, Reg..."
                                className="pl-9 bg-white"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Time</th>
                                    <th className="px-6 py-3 font-medium">Provider</th>
                                    <th className="px-6 py-3 font-medium">Service</th>
                                    <th className="px-6 py-3 font-medium">House No.</th>
                                    <th className="px-6 py-3 font-medium">Vehicle Reg</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isLoading ? (
                                    <tr><td colSpan={7} className="text-center py-8">Loading logs...</td></tr>
                                ) : filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-mono text-slate-600">{log.time}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{log.provider_name}</div>
                                            <div className="text-xs text-slate-500">{log.company_name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">
                                                {log.service}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800">{log.house_number}</td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            {log.vehicle_reg !== "Walk-in" ? <Truck className="h-4 w-4 text-slate-400" /> : <UserCheck className="h-4 w-4 text-slate-400" />}
                                            {log.vehicle_reg}
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.status === "Checked In" ? (
                                                <span className="flex items-center gap-1 text-green-700 font-medium text-xs">
                                                    <div className="h-2 w-2 rounded-full bg-green-500" /> On Site
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-amber-700 font-medium text-xs">
                                                    <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" /> Expected
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.status !== "Checked In" && (
                                                <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 h-8">
                                                    Verify Entry
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
