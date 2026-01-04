"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Wifi, WifiOff, Smartphone, Radio, CloudOff, RefreshCw, Send, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Peer {
    id: string
    name: string
    role: string
    distance: string
    signal: number
}

const MOCK_PEERS: Peer[] = [
    { id: "1", name: "Fundi John", role: "Plumber", distance: "15m", signal: 90 },
    { id: "2", name: "Mama Pendo", role: "Vendor", distance: "45m", signal: 75 },
    { id: "3", name: "Kevin Elec", role: "Electrician", distance: "120m", signal: 40 },
]

export default function MtaaMeshPage() {
    const [isOffline, setIsOffline] = useState(false)
    const [isScanning, setIsScanning] = useState(false)
    const [peers, setPeers] = useState<Peer[]>([])
    const [syncQueue, setSyncQueue] = useState<string[]>(["Job #1293 Payment", "Message to Client"])

    // Effect to clear peers when switching modes
    useEffect(() => {
        setPeers([])
        setIsScanning(false)
    }, [isOffline])

    const toggleScan = () => {
        if (isScanning) {
            setIsScanning(false)
            return
        }

        setIsScanning(true)
        setPeers([])

        // Simulate finding peers
        setTimeout(() => {
            setPeers([MOCK_PEERS[0]])
        }, 1500)
        setTimeout(() => {
            setPeers([MOCK_PEERS[0], MOCK_PEERS[1]])
        }, 3000)
    }

    const handleSync = () => {
        if (isOffline) {
            alert("No internet connection! connect to Mesh or wait for data.")
            return
        }
        const initialCount = syncQueue.length
        if (initialCount === 0) return

        let synced = 0
        const interval = setInterval(() => {
            setSyncQueue(prev => prev.slice(1))
            synced++
            if (synced >= initialCount) clearInterval(interval)
        }, 800)
    }

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isOffline ? 'bg-slate-950 text-emerald-50' : 'bg-slate-50 text-slate-900'}`}>
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Header Control */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Radio className={`h-8 w-8 ${isOffline ? 'text-emerald-500' : 'text-blue-600'}`} />
                            Mtaa Mesh
                            {isOffline && <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">OFFLINE MODE</Badge>}
                        </h1>
                        <p className={`mt-2 ${isOffline ? 'text-slate-400' : 'text-slate-600'}`}>
                            {isOffline
                                ? "Connectivity severed. Using local Bluetooth mesh protocol."
                                : "Connected to global internet. Mesh allows local discovery."}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-200/10 p-4 rounded-xl backdrop-blur-sm border border-slate-200/20">
                        <span className={`text-sm font-bold ${isOffline ? 'text-emerald-400' : 'text-slate-600'}`}>
                            {isOffline ? "GO ONLINE" : "GO OFFLINE"}
                        </span>
                        <Switch
                            checked={isOffline}
                            onCheckedChange={setIsOffline}
                            className="data-[state=checked]:bg-emerald-500"
                        />
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Radar / Peer Discovery */}
                    <Card className={`lg:col-span-2 border-none shadow-2xl overflow-hidden relative ${isOffline ? 'bg-slate-900/50' : 'bg-white'}`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />

                        <CardHeader>
                            <CardTitle className={isOffline ? 'text-white' : 'text-slate-900'}>Nearby Mesh Nodes</CardTitle>
                            <CardDescription>Providers and clients within range</CardDescription>
                        </CardHeader>

                        <CardContent className="min-h-[400px] flex flex-col items-center justify-center relative">
                            {/* Scanning Animation */}
                            <div className="relative w-64 h-64 flex items-center justify-center">
                                {/* Rings */}
                                <div className={`absolute inset-0 border-2 rounded-full opacity-20 ${isOffline ? 'border-emerald-500' : 'border-blue-500'}`} />
                                <div className={`absolute inset-12 border-2 rounded-full opacity-40 ${isOffline ? 'border-emerald-500' : 'border-blue-500'}`} />
                                <div className={`absolute inset-24 border-2 rounded-full opacity-60 ${isOffline ? 'border-emerald-500' : 'border-blue-500'}`} />

                                {/* Radar Sweep */}
                                {isScanning && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-emerald-500/20"
                                        style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 50%)" }}
                                    />
                                )}

                                {/* Center Point */}
                                <div className={`w-4 h-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] z-10 ${isOffline ? 'bg-emerald-500' : 'bg-blue-600'}`} />

                                {/* Peers */}
                                <AnimatePresence>
                                    {peers.map((peer, i) => (
                                        <motion.div
                                            key={peer.id}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="absolute"
                                            style={{
                                                top: `${20 + (i * 25)}%`,
                                                left: `${20 + (i * 30)}%`
                                            }}
                                        >
                                            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-emerald-400 flex items-center justify-center">
                                                    <Smartphone className="h-4 w-4 text-emerald-400" />
                                                </div>
                                                <Badge className="bg-emerald-900/80 text-emerald-200 border-0 backdrop-blur-sm">
                                                    {peer.name}
                                                </Badge>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <Button
                                onClick={toggleScan}
                                size="lg"
                                className={`mt-12 w-48 font-bold ${isScanning
                                        ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                                        : isOffline ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'
                                    }`}
                            >
                                {isScanning ? "STOP SCANNING" : "SCAN FOR PEERS"}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Sync & Offline Actions */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <Card className={`${isOffline ? 'bg-slate-900 text-white border-slate-800' : 'bg-white'}`}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    {isOffline ? <WifiOff className="text-red-500" /> : <Wifi className="text-green-500" />}
                                    Network Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-500/10">
                                        <span className="text-sm opacity-80">Signal Strength</span>
                                        <span className="font-mono font-bold">{isOffline ? '0%' : 'LTE 4G'}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-500/10">
                                        <span className="text-sm opacity-80">Mesh Peers</span>
                                        <span className="font-mono font-bold">{peers.length} active</span>
                                    </div>
                                    {isOffline && (
                                        <Button variant="destructive" className="w-full">
                                            <Send className="mr-2 h-4 w-4" /> Send Emergency SMS
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sync Queue */}
                        <Card className={`${isOffline ? 'bg-slate-900 text-white border-slate-800' : 'bg-white'}`}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <CloudOff className={syncQueue.length > 0 ? "text-amber-500" : "text-slate-400"} />
                                    Sync Queue
                                </CardTitle>
                                <CardDescription>Data waiting for connection</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {syncQueue.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-6 text-slate-500">
                                        <CheckCircle2 className="h-10 w-10 mb-2 opacity-50" />
                                        <p className="text-sm">All synced up!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {syncQueue.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded bg-amber-500/10 border border-amber-500/20 text-sm">
                                                <span>{item}</span>
                                                <span className="text-xs uppercase font-bold text-amber-500">Pending</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                            <CardContent className="pt-0">
                                <Button
                                    onClick={handleSync}
                                    disabled={syncQueue.length === 0 || isOffline}
                                    className="w-full bg-slate-800 hover:bg-slate-700"
                                >
                                    <RefreshCw className={`mr-2 h-4 w-4 ${!isOffline && syncQueue.length > 0 ? 'animate-spin' : ''}`} />
                                    Sync Now
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
