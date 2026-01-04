"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { CreateTeamDialog } from "@/components/mesh/create-team-dialog"
import { api } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Briefcase, Plus, UserPlus, ShieldCheck } from "lucide-react"

interface MeshMember {
    id: string
    user_id: number
    role: string
    status: string
}

interface MeshTeam {
    id: string
    name: string
    description: string
    specialization: string
    leader_id: number
    members: MeshMember[]
}

export default function MeshPage() {
    const [teams, setTeams] = useState<MeshTeam[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTeams()
    }, [])

    const fetchTeams = async () => {
        try {
            const data = await api.get<MeshTeam[]>("/mesh/my-teams")
            setTeams(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const inviteMember = async (teamId: string) => {
        const email = prompt("Enter the email of the pro you want to invite:")
        if (!email) return

        try {
            await api.post(`/mesh/${teamId}/invite`, { email })
            alert(`Invite sent to ${email}!`)
        } catch (error: any) {
            alert(error.message || "Failed to invite user")
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                            Mtaa Mesh <Badge variant="secondary" className="bg-amber-100 text-amber-700">Beta</Badge>
                        </h1>
                        <p className="text-slate-500 mt-1">Form squads, combine skills, and bid for bigger jobs.</p>
                    </div>
                    <CreateTeamDialog />
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading your squads...</div>
                ) : teams.length === 0 ? (
                    <Card className="border-dashed border-2 border-slate-300 bg-slate-50/50">
                        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Users className="h-10 w-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">You haven't joined any squads yet</h3>
                            <p className="text-slate-500 max-w-md mb-6">
                                Create a squad to start working with other pros, or ask a squad leader to invite you.
                            </p>
                            <CreateTeamDialog />
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map((team) => (
                            <Card key={team.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{team.name}</CardTitle>
                                            <CardDescription className="flex items-center gap-1 mt-1">
                                                <Briefcase className="h-3 w-3" /> {team.specialization}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="outline" className="bg-slate-50">
                                            {team.leader_id === 1 ? "Leader" : "Member"}
                                            {/* Note: In real app compare with current user ID */}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-600 mb-6 line-clamp-2">
                                        {team.description || "No description provided."}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((_, i) => (
                                                <Avatar key={i} className="border-2 border-white w-8 h-8">
                                                    <AvatarFallback className="bg-slate-200 text-xs text-slate-600">M{i}</AvatarFallback>
                                                </Avatar>
                                            ))}
                                            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500 font-medium">
                                                +2
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium">
                                            5 Active Members
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-slate-50/50 border-t p-4 flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="w-full text-xs"
                                        onClick={() => inviteMember(team.id)}
                                    >
                                        <UserPlus className="mr-2 h-3 w-3" /> Invite Pro
                                    </Button>
                                    <Button className="w-full text-xs bg-slate-900 text-white">
                                        <ShieldCheck className="mr-2 h-3 w-3" /> View Jobs
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
