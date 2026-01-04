"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Clock, UsersRound } from "lucide-react"
import { api } from "@/lib/api"
import { useState } from "react"

interface SambazaGroupProps {
    id: string
    title: string
    suburb: string
    participantCount: number
    targetCount: number
    discountTier: string
    expiresAt: string
}

export function SambazaCard({ group }: { group: SambazaGroupProps }) {
    const [joined, setJoined] = useState(false)
    const [loading, setLoading] = useState(false)

    const percentage = Math.min((group.participantCount / group.targetCount) * 100, 100)

    async function handleJoin() {
        setLoading(true)
        try {
            await api.post(`/sambaza/${group.id}/join`, {})
            setJoined(true)
        } catch (e) {
            alert("Failed to join group.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-2 border-teal-100/50 hover:border-teal-500 transition-colors cursor-pointer group">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                            {group.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                            <UsersRound className="h-3 w-3" /> {group.suburb}
                        </div>
                    </div>
                    <div className="bg-teal-100 text-teal-800 text-xs font-bold px-2 py-1 rounded-full">
                        {group.discountTier} OFF
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                {/* Progress Bar */}
                <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1 text-slate-600">
                        <span>{group.participantCount} joined</span>
                        <span>Goal: {group.targetCount}</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Ends in 3 days
                    </p>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    className={`w-full ${joined ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'}`}
                    disabled={joined || loading}
                    onClick={handleJoin}
                >
                    {joined ? "You're In! 🎉" : "Join Deal"}
                </Button>
            </CardFooter>
        </Card>
    )
}
