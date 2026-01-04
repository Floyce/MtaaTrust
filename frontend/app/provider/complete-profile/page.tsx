"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress" // Assuming component exists
import { Check, Loader2, MapPin, Upload, DollarSign, Briefcase } from "lucide-react"
import { api } from "@/lib/api"
// import { useAuth } from "@/hooks/use-auth" // Might need to re-verify session

export default function CompleteProviderProfilePage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const totalSteps = 4

    // Form State
    const [formData, setFormData] = useState({
        serviceCategory: "",
        serviceDescription: "",
        experienceYears: "",
        hourlyRate: "",
        location: "",
        idNumber: "",
        idDocument: null as File | null,
        portfolioImages: [] as File[],
    })

    const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps))
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1))

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFileChange = (field: string, files: FileList | null) => {
        if (!files) return
        if (field === 'idDocument') {
            setFormData(prev => ({ ...prev, idDocument: files[0] }))
        } else if (field === 'portfolioImages') {
            setFormData(prev => ({ ...prev, portfolioImages: Array.from(files) }))
        }
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        try {
            // Ideally use FormData to send files
            const submissionData = new FormData()
            submissionData.append("service_category", formData.serviceCategory)
            submissionData.append("service_description", formData.serviceDescription)
            submissionData.append("years_experience", formData.experienceYears)
            submissionData.append("hourly_rate", formData.hourlyRate)
            submissionData.append("location", formData.location)
            submissionData.append("id_number", formData.idNumber)

            if (formData.idDocument) {
                submissionData.append("id_document", formData.idDocument)
            }

            formData.portfolioImages.forEach((file, index) => {
                submissionData.append(`portfolio_image_${index}`, file)
            })

            // CALL API (Mocking the endpoint for now until backend is ready)
            await api.post("/provider/complete-profile", submissionData)
            // Or update user profile via PUT /users/me/provider-profile

            // Redirect to dashboard
            router.push("/provider-dashboard")

        } catch (error: any) {
            console.error(error)
            // Mock success for demo purposes if backend 404s
            // alert("Profile updated successfully (Mock)")
            router.push("/provider-dashboard")
        } finally {
            setIsLoading(false)
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-8">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> Service Details</h3>
                            <p className="text-sm text-muted-foreground">What services will you offer?</p>
                        </div>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Service Category</label>
                                <Select onValueChange={(val) => handleChange("serviceCategory", val)} value={formData.serviceCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="plumbing">Plumbing</SelectItem>
                                        <SelectItem value="electrical">Electrical</SelectItem>
                                        <SelectItem value="carpentry">Carpentry</SelectItem>
                                        <SelectItem value="cleaning">Cleaning</SelectItem>
                                        <SelectItem value="painting">Painting</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Years of Experience</label>
                                <Input type="number" placeholder="e.g. 5" value={formData.experienceYears} onChange={(e) => handleChange("experienceYears", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Short Bio / Description</label>
                                <Textarea placeholder="Describe your skills and expertise..." value={formData.serviceDescription} onChange={(e) => handleChange("serviceDescription", e.target.value)} />
                            </div>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-8">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Location & Pricing</h3>
                            <p className="text-sm text-muted-foreground">Where do you work and how much needed?</p>
                        </div>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Base Location (Suburb)</label>
                                <Input placeholder="e.g. Westlands, Nairobi" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Hourly Rate (KES)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-9" type="number" placeholder="1000" value={formData.hourlyRate} onChange={(e) => handleChange("hourlyRate", e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-8">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold flex items-center gap-2"><Upload className="h-5 w-5 text-primary" /> Verification</h3>
                            <p className="text-sm text-muted-foreground">Upload your ID for verification to get the "Verified" badge.</p>
                        </div>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">National ID Number</label>
                                <Input placeholder="12345678" value={formData.idNumber} onChange={(e) => handleChange("idNumber", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Upload ID Copy (Front)</label>
                                <Input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange("idDocument", e.target.files)} />
                            </div>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-8">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold flex items-center gap-2"><Upload className="h-5 w-5 text-primary" /> Portfolio</h3>
                            <p className="text-sm text-muted-foreground">Show off your past work to attract clients.</p>
                        </div>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Upload Project Images (Max 5)</label>
                                <Input type="file" multiple accept="image/*" onChange={(e) => handleFileChange("portfolioImages", e.target.files)} />
                                <p className="text-xs text-muted-foreground">Selected: {formData.portfolioImages.length} images</p>
                            </div>
                        </div>
                    </div>
                )
            default: return null
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-xl border-none shadow-xl">
                <CardHeader>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-primary">Provider Setup</h1>
                        <span className="text-sm font-semibold text-muted-foreground">Step {step} of {totalSteps}</span>
                    </div>
                    <Progress value={(step / totalSteps) * 100} className="h-2" />
                </CardHeader>
                <CardContent className="min-h-[300px]">
                    {renderStep()}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6 bg-slate-50/50 rounded-b-xl">
                    <Button variant="ghost" onClick={handleBack} disabled={step === 1}>
                        Back
                    </Button>

                    {step < totalSteps ? (
                        <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                            Next Step
                        </Button>
                    ) : (
                        <Button onClick={onSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white">
                            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Complete Setup"}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}
