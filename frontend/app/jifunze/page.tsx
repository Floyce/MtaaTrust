"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, BookOpen, AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Calculator, HardHat } from "lucide-react"
import { api } from "@/lib/api"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface DIYGuide {
    id: string
    title: string
    category: string
    difficulty: string
    content: string
    tools_required: string[]
    estimated_time_minutes: number
}

// Mock seed data for demo if API is empty
const MOCK_GUIDES: DIYGuide[] = [
    {
        id: "1",
        title: "Fix a Leaking Tap",
        category: "Plumbing",
        difficulty: "Easy",
        content: "Step 1: Turn off water supply...",
        tools_required: ["Adjustable Wrench", "Screwdriver", "Washers"],
        estimated_time_minutes: 30
    },
    {
        id: "2",
        title: "Replace a Light Switch",
        category: "Electrical",
        difficulty: "Medium",
        content: "Warning: Ensure power is off at mains...",
        tools_required: ["Screwdriver", "Voltage Tester", "Wire Strippers"],
        estimated_time_minutes: 45
    },
    {
        id: "3",
        title: "Unclog a Drain",
        category: "Plumbing",
        difficulty: "Easy",
        content: "Try using a plunger first...",
        tools_required: ["Plunger", "Drain Snake"],
        estimated_time_minutes: 15
    }
]

export default function JifunzePage() {
    const [mode, setMode] = useState<"hub" | "wizard">("hub")
    const [guides, setGuides] = useState<DIYGuide[]>([])

    // Wizard State
    const [wizardStep, setWizardStep] = useState(0)
    const [wizardAnswers, setWizardAnswers] = useState<Record<string, string>>({})

    useEffect(() => {
        // Fetch from API, fallback to mock
        const loadGuides = async () => {
            try {
                const data = await api.get<DIYGuide[]>("/jifunze/guides")
                if (data && data.length > 0) {
                    setGuides(data)
                } else {
                    setGuides(MOCK_GUIDES)
                }
            } catch (e) {
                setGuides(MOCK_GUIDES)
            }
        }
        loadGuides()
    }, [])

    const resetWizard = () => {
        setWizardStep(0)
        setWizardAnswers({})
        setMode("wizard")
    }

    // Wizard Logic
    const WIZARD_QUESTIONS = [
        {
            key: "category",
            question: "What kind of issue is it?",
            options: [
                { label: "Water / Plumbing", value: "plumbing", icon: Wrench },
                { label: "Power / Electrical", value: "electrical", icon: ZapIcon },
                { label: "Walls / Paint", value: "general", icon: HardHat },
            ]
        },
        {
            key: "danger",
            question: "Is there any immediate danger? (Sparks, Flooding)",
            options: [
                { label: "Yes, it's dangerous!", value: "yes", danger: true },
                { label: "No, it's safe", value: "no" },
            ]
        },
        {
            key: "tools",
            question: "Do you have basic tools? (Screwdriver, Hammer)",
            options: [
                { label: "Yes, I have tools", value: "yes" },
                { label: "No, I have nothing", value: "no" },
            ]
        },
    ]

    const handleAnswer = (value: string) => {
        const currentQ = WIZARD_QUESTIONS[wizardStep]

        // Safety Check
        if (currentQ.key === "danger" && value === "yes") {
            setWizardStep(99) // Jump to danger/pro recommendation
            return
        }

        // Tool Check
        if (currentQ.key === "tools" && value === "no") {
            setWizardStep(98) // Jump to "Hire a Pro" recommendation
            return
        }

        const newAnswers = { ...wizardAnswers, [currentQ.key]: value }
        setWizardAnswers(newAnswers)

        if (wizardStep < WIZARD_QUESTIONS.length - 1) {
            setWizardStep(wizardStep + 1)
        } else {
            setWizardStep(100) // Success / Results
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 font-sans">
            <Navbar />

            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-teal-900 mb-4 flex items-center justify-center gap-3">
                        <BookOpen className="h-10 w-10 text-teal-600" />
                        Jifunze DIY Hub
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Learn to fix simple things yourself, or use our smart wizard to decide when to call a pro.
                    </p>

                    <div className="flex justify-center gap-4 mt-8">
                        <Button
                            size="lg"
                            variant={mode === "hub" ? "default" : "outline"}
                            className={mode === "hub" ? "bg-teal-600 hover:bg-teal-700" : ""}
                            onClick={() => setMode("hub")}
                        >
                            Browse Guides
                        </Button>
                        <Button
                            size="lg"
                            variant={mode === "wizard" ? "default" : "outline"}
                            className={mode === "wizard" ? "bg-amber-500 hover:bg-amber-600 border-none text-white" : ""}
                            onClick={resetWizard}
                        >
                            <Calculator className="mr-2 h-5 w-5" />
                            Start Decision Wizard
                        </Button>
                    </div>
                </div>

                {/* Content Area */}
                {mode === "hub" ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guides.map((guide) => (
                            <Card key={guide.id} className="hover:shadow-lg transition-all border-t-4 border-t-teal-500 cursor-pointer group">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="secondary" className="bg-teal-50 text-teal-700">
                                            {guide.category}
                                        </Badge>
                                        <Badge className={`
                                            ${guide.difficulty === 'Easy' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                                            ${guide.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : ''}
                                        `}>
                                            {guide.difficulty}
                                        </Badge>
                                    </div>
                                    <CardTitle className="group-hover:text-teal-700 transition-colors">{guide.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-2">
                                        <Wrench className="h-4 w-4" />
                                        {guide.tools_required.length} tools needed
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-neutral-500 line-clamp-3">
                                        {guide.content}
                                    </p>
                                </CardContent>
                                <CardFooter className="border-t pt-4">
                                    <div className="flex justify-between items-center w-full text-sm text-neutral-400">
                                        <span>{guide.estimated_time_minutes} mins</span>
                                        <span className="flex items-center text-teal-600 font-medium">
                                            Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                                        </span>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto">
                        <Card className="border-2 border-amber-100 shadow-xl">
                            <CardHeader className="bg-amber-50/50 border-b border-amber-100">
                                <CardTitle className="flex justify-between items-center">
                                    <span>Decision Wizard</span>
                                    <span className="text-sm font-normal text-neutral-500">
                                        {wizardStep < 10 ? `Step ${wizardStep + 1} of 3` : 'Result'}
                                    </span>
                                </CardTitle>
                                {wizardStep < 10 && <Progress value={(wizardStep / 3) * 100} className="h-1 mt-2" />}
                            </CardHeader>
                            <CardContent className="p-8">
                                {/* DANGER RESULT */}
                                {wizardStep === 99 && (
                                    <div className="text-center space-y-4 animate-in fade-in zoom-in">
                                        <AlertCircle className="h-20 w-20 text-red-500 mx-auto" />
                                        <h2 className="text-2xl font-bold text-red-600">STOP! It's too dangerous.</h2>
                                        <p className="text-neutral-600">
                                            Issues involving sparks, flooding, or gas require immediate professional attention. Do not attempt to fix this yourself.
                                        </p>
                                        <Link href="/emergency">
                                            <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 mt-4">
                                                Call Emergency SOS
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" onClick={resetWizard}>Restart</Button>
                                    </div>
                                )}

                                {/* NO TOOLS RESULT */}
                                {wizardStep === 98 && (
                                    <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                        <Wrench className="h-20 w-20 text-amber-500 mx-auto" />
                                        <h2 className="text-2xl font-bold text-neutral-800">You need the right tools.</h2>
                                        <p className="text-neutral-600">
                                            Without basic tools, it's better to hire a professional who comes prepared. It's often cheaper than buying tools you'll only use once.
                                        </p>
                                        <Link href="/dashboard">
                                            <Button size="lg" className="w-full bg-teal-600 hover:bg-teal-700 mt-4">
                                                Find a Pro Now
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" onClick={resetWizard}>Restart</Button>
                                    </div>
                                )}

                                {/* SUCCESS RESULT */}
                                {wizardStep === 100 && (
                                    <div className="text-center space-y-4 animate-in fade-in zoom-in">
                                        <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
                                        <h2 className="text-2xl font-bold text-green-700">You can do this!</h2>
                                        <p className="text-neutral-600">
                                            This sounds like a standard issue that is safe to tackle. We have found 3 guides that match your problem.
                                        </p>
                                        <Button size="lg" className="bg-teal-600 hover:bg-teal-700 mt-4" onClick={() => setMode("hub")}>
                                            View Recommended Guides
                                        </Button>
                                    </div>
                                )}

                                {/* QUESTIONS */}
                                {wizardStep < 10 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-medium text-center">
                                            {WIZARD_QUESTIONS[wizardStep].question}
                                        </h2>
                                        <div className="grid gap-3">
                                            {WIZARD_QUESTIONS[wizardStep].options.map((opt) => (
                                                <Button
                                                    key={opt.value}
                                                    variant="outline"
                                                    className="h-auto py-4 text-lg justify-start px-6 gap-3 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-all"
                                                    onClick={() => handleAnswer(opt.value)}
                                                >
                                                    {opt.icon && <opt.icon className="h-5 w-5" />}
                                                    {opt.danger && <AlertCircle className="h-5 w-5 text-red-500" />}
                                                    {opt.label}
                                                    <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    )
}

function ZapIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
        </svg>
    )
}
