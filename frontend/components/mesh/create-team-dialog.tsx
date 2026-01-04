"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Loader2 } from "lucide-react"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

export function CreateTeamDialog() {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.target as HTMLFormElement)
        const name = formData.get("name") as string
        const specialization = formData.get("specialization") as string
        const description = formData.get("description") as string

        try {
            await api.post("/mesh/create", {
                name,
                specialization,
                description
            })

            setOpen(false)
            router.refresh()
            // In a real app with SWR/Tanstack Query we would invalidate cache here
            window.location.reload()
        } catch (error) {
            console.error("Failed to create team", error)
            alert("Failed to create team. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                    <Users className="mr-2 h-4 w-4" /> Create Squad
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Form a New Squad</DialogTitle>
                    <DialogDescription>
                        Create a team to bid for larger projects together. You will be the team leader.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Team Name
                            </Label>
                            <Input id="name" name="name" placeholder="e.g. Nairobi Elite Painters" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="specialization" className="text-right">
                                Skillset
                            </Label>
                            <Input id="specialization" name="specialization" placeholder="e.g. Construction, Event Planning" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Bio
                            </Label>
                            <Textarea id="description" name="description" placeholder="Briefly describe your team's capability..." className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Squad
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
