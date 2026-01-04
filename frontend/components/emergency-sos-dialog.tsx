import { useState } from "react"
import { AlertTriangle, MapPin, Siren } from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { api } from "@/lib/api"

export function EmergencySOSDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [category, setCategory] = useState("plumbing")
    const [location, setLocation] = useState("")
    const [status, setStatus] = useState<"idle" | "searching" | "found">("idle")
    const [resultMessage, setResultMessage] = useState("")

    async function handleSOS() {
        setIsLoading(true)
        try {
            // Mock geolocation if empty
            const finalLocation = location || "Current Location (GPS)"

            const response = await api.post<{ message: string, providers_notified: number }>("/emergency/request", {
                category,
                location_description: finalLocation
            })

            setStatus("found")
            setResultMessage(response.message)
        } catch (error) {
            alert("Failed to send SOS signal. Please call directly if urgent.")
        } finally {
            setIsLoading(false)
        }
    }

    function reset() {
        setIsOpen(false)
        setStatus("idle")
        setResultMessage("")
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold animate-pulse-slow shadow-lg shadow-red-200 border-2 border-red-500"
                    size="lg"
                >
                    <Siren className="mr-2 h-5 w-5" />
                    EMERGENCY SOS
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-l-8 border-l-red-600">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600 text-2xl">
                        <AlertTriangle className="h-8 w-8" />
                        EMERGENCY REQUEST
                    </DialogTitle>
                    <DialogDescription className="font-semibold text-slate-700">
                        Premium rates apply (+25%) for immediate response.
                    </DialogDescription>
                </DialogHeader>

                {status === "idle" && (
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="category" className="text-lg">What's the emergency?</Label>
                            <RadioGroup defaultValue="plumbing" onValueChange={setCategory} className="grid grid-cols-2 gap-4">
                                <div>
                                    <RadioGroupItem value="plumbing" id="plumbing" className="peer sr-only" />
                                    <Label
                                        htmlFor="plumbing"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600"
                                    >
                                        <span className="text-2xl mb-2">🚿</span>
                                        Plumbing
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="electrical" id="electrical" className="peer sr-only" />
                                    <Label
                                        htmlFor="electrical"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600"
                                    >
                                        <span className="text-2xl mb-2">⚡</span>
                                        Electrical
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location" className="text-right">
                                Location
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="location"
                                    placeholder="Auto-detecting..."
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {status === "found" && (
                    <div className="py-8 text-center space-y-4">
                        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
                            <span className="text-4xl">🚑</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Help Found!</h3>
                        <p className="text-slate-600 text-lg">{resultMessage}</p>
                        <p className="text-sm text-slate-400">Providers act fast. Keep your phone nearby.</p>
                    </div>
                )}

                <DialogFooter>
                    {status === "idle" ? (
                        <Button
                            type="submit"
                            onClick={handleSOS}
                            disabled={isLoading}
                            className="w-full bg-red-600 hover:bg-red-700 text-lg h-12"
                        >
                            {isLoading ? "Broadcasting Signal..." : "REQUEST HELP NOW"}
                        </Button>
                    ) : (
                        <Button onClick={reset} className="w-full h-12 text-lg">
                            Close
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
