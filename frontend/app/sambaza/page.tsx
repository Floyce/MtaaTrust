"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Share2 } from "lucide-react"
import { SambazaCard } from "@/components/sambaza-card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { Navbar } from "@/components/navbar"

// Mock Initial Data while database is empty
const MOCK_GROUPS = [
    {
        id: "1",
        title: "Kilimani Weekly Fumigation",
        suburb: "Kilimani",
        participantCount: 3,
        targetCount: 10,
        discountTier: "10%",
        expiresAt: "2024-02-10T00:00:00Z"
    },
    {
        id: "2",
        title: "Kileleshwa Bulk Laundry",
        suburb: "Kileleshwa",
        participantCount: 8,
        targetCount: 15,
        discountTier: "20%",
        expiresAt: "2024-02-12T00:00:00Z"
    },
    {
        id: "3",
        title: "Estate Garbage Collection",
        suburb: "Langata",
        participantCount: 45,
        targetCount: 50,
        discountTier: "25%",
        expiresAt: "2024-02-08T00:00:00Z"
    }
]

export default function SambazaPage() {
    // In real app, use SWR or React Query to fetch /sambaza/active
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateOpen, setIsCreateOpen] = useState(false)

    // Create Form State
    const [newTitle, setNewTitle] = useState("")
    const [newSuburb, setNewSuburb] = useState("")

    async function handleCreate() {
        // Call API
        try {
            await api.post("/sambaza/create", {
                title: newTitle,
                service_category: "General", // simplified
                suburb: newSuburb
            })
            alert("Group Created!")
            setIsCreateOpen(false)
        } catch (e) {
            alert("Failed to create.")
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Hero Section */}
                <div className="mb-12 text-center space-y-4">
                    <span className="bg-teal-100 text-teal-800 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Coming Together Pay Less
                    </span>
                    <h1 className="text-4xl font-extrabold text-slate-900">
                        Sambaza Deals 🇰🇪
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Join forces with your neighbors to unlock massive volume discounts.
                        More people = Better prices for everyone.
                    </p>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input
                            placeholder="Find deals in your suburb..."
                            className="pl-10 h-11"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="h-11 bg-teal-600 hover:bg-teal-700 w-full md:w-auto font-semibold">
                                <Plus className="mr-2 h-5 w-5" /> Start New Group
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Start a Sambaza Group</DialogTitle>
                                <DialogDescription>Organize a deal for your estate.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label>Group Title</Label>
                                    <Input placeholder="e.g. Weekly Estate Cleaning" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Suburb/Estate</Label>
                                    <Input placeholder="e.g. South C" value={newSuburb} onChange={e => setNewSuburb(e.target.value)} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleCreate} className="bg-teal-600">Create & Share</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_GROUPS.map(group => (
                        <SambazaCard key={group.id} group={group} />
                    ))}
                </div>
            </main>
        </div>
    )
}
