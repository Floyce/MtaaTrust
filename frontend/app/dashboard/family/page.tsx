"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, User, Phone, ShieldCheck, Heart } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function FamilyDashboardPage() {
    const [members, setMembers] = useState([
        { id: 1, name: "Mama Shiro", relationship: "Parent", phone: "+254 711 223 344", status: "Active" },
        { id: 2, name: "Uncle Ben", relationship: "Relative", phone: "+254 799 887 766", status: "Active" }
    ])

    const [isAddOpen, setIsAddOpen] = useState(false)
    const [newMember, setNewMember] = useState({ name: "", phone: "", relationship: "" })

    const handleAdd = () => {
        setMembers([...members, { ...newMember, id: Date.now(), status: "Invite Sent" }])
        setIsAddOpen(false)
        setNewMember({ name: "", phone: "", relationship: "" })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Family & Trusted Contacts</h1>
                    <p className="text-slate-500">Manage accounts you can book for.</p>
                </div>

                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-teal-600 hover:bg-teal-700">
                            <Plus className="h-4 w-4 mr-2" /> Add Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Family Member</DialogTitle>
                            <DialogDescription>
                                They will receive an SMS invite to join your circle.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" placeholder="+254..." value={newMember.phone} onChange={e => setNewMember({ ...newMember, phone: e.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="rel">Relationship</Label>
                                <Input id="rel" placeholder="e.g. Parent, Child" value={newMember.relationship} onChange={e => setNewMember({ ...newMember, relationship: e.target.value })} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAdd} className="bg-teal-600">Send Invite</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Trusted Contact Cards */}
                {members.map(member => (
                    <Card key={member.id} className="border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Heart className="h-24 w-24 text-teal-600" />
                        </div>
                        <CardHeader className="pb-3">
                            <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 mb-3">
                                <User className="h-6 w-6" />
                            </div>
                            <CardTitle>{member.name}</CardTitle>
                            <CardDescription>{member.relationship}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                    {member.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                    <span className="text-green-700 font-medium">{member.status}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button variant="outline" className="w-full text-teal-700 border-teal-200 hover:bg-teal-50">
                                    Manage Permissions
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
