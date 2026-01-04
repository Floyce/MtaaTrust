"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, MapPin, ThumbsUp, ShieldAlert, Zap, Search } from "lucide-react"
import { api } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface Alert {
    id: string
    title: string
    description: string
    type: string
    severity: string
    location_name: string
    upvotes: number
    created_at: string
}

export default function WatchPage() {
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetchAlerts()
    }, [])

    const fetchAlerts = async () => {
        try {
            const data = await api.get<Alert[]>("/alerts/feed")
            setAlerts(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleReport = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        try {
            await api.post("/alerts/report", {
                title: formData.get("title"),
                description: formData.get("description"),
                type: formData.get("type"),
                severity: formData.get("severity"),
                location_name: formData.get("location")
            })
            setOpen(false)
            fetchAlerts()
        } catch (error) {
            console.error(error)
            alert("Failed to post alert")
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                            Mtaa Watch <ShieldAlert className="h-8 w-8 text-red-600" />
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Real-time community safety & utility alerts.
                        </p>
                    </div>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200">
                                <AlertTriangle className="mr-2 h-4 w-4" /> Report Incident
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Report an Incident</DialogTitle>
                                <DialogDescription>Help keep your community safe and informed.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleReport} className="space-y-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" placeholder="e.g. Broken Street Light" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="type">Type</Label>
                                        <Select name="type" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Security">Security</SelectItem>
                                                <SelectItem value="Utility">Utility (Power/Water)</SelectItem>
                                                <SelectItem value="Traffic">Traffic/Roads</SelectItem>
                                                <SelectItem value="LostFound">Lost & Found</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="severity">Severity</Label>
                                        <Select name="severity" required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Low">Low</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="High">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" name="location" placeholder="e.g. Near Junction Mall" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" name="description" placeholder="Describe what happened..." />
                                </div>
                                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">Submit Alert</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Feed */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-20 text-slate-400">Loading alerts...</div>
                    ) : alerts.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                            <ShieldAlert className="h-12 w-12 text-slate-200 mx-auto mb-3" />
                            <h3 className="text-slate-900 font-medium">No recent alerts</h3>
                            <p className="text-slate-500">Your neighborhood is safe and sound!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            {alerts.map((alert) => (
                                <Card key={alert.id} className="border-l-4 border-l-red-500/50 hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-2">
                                                <Badge variant="outline" className={`${alert.type === 'Security' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        alert.type === 'Utility' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                            'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {alert.type}
                                                </Badge>
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                                                    {alert.severity}
                                                </Badge>
                                            </div>
                                            <span className="text-xs text-slate-400">
                                                {new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <CardTitle className="text-lg mt-2">{alert.title}</CardTitle>
                                        <div className="flex items-center text-sm text-slate-500 mt-1">
                                            <MapPin className="h-3 w-3 mr-1" /> {alert.location_name}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-600 text-sm">
                                            {alert.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="pt-0 flex justify-between items-center text-xs text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="sm" className="h-8 hover:text-teal-600">
                                                <ThumbsUp className="h-3 w-3 mr-1" />
                                                Verify ({alert.upvotes})
                                            </Button>
                                        </div>
                                        <div>
                                            Posted by Neighbor
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
