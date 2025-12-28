"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, X, Send } from "lucide-react"
import { cn } from "@/lib/utils"
// Import the logic
import { processMessage, Intent } from "@/lib/ask-mtaa-logic"

interface Message {
    role: 'user' | 'bot';
    text: string;
}

export function AskMtaa() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', text: "Sasa! I'm Mtaa, your local helper. Tell me what you need fixed (e.g., 'My sink is leaking in Kilimani')." }
    ])
    const [input, setInput] = useState("")
    // State for the conversation flow
    const [chatState, setChatState] = useState({
        intent: null as Intent | null,
        step: 0,
        answers: {}
    });

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = () => {
        if (!input.trim()) return

        const userMsg = input
        setMessages(prev => [...prev, { role: 'user', text: userMsg }])
        setInput("")

        // Process message using our logic library
        // Simulate thinking delay for realism
        setTimeout(() => {
            const { response, newState } = processMessage(userMsg, chatState);
            setChatState(newState);
            setMessages(prev => [...prev, { role: 'bot', text: response }]);
        }, 600)
    }

    return (
        <>
            {/* Floating Button */}
            <Button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl transition-all duration-300 z-50 bg-teal-700 hover:bg-teal-800",
                    isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                )}
            >
                <MessageSquare className="h-6 w-6 text-white" />
            </Button>

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-6 right-6 w-80 md:w-96 transition-all duration-300 z-50 transform",
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
                )}
            >
                <Card className="border-teal-700/20 shadow-2xl">
                    <CardHeader className="bg-teal-700 text-white rounded-t-lg flex flex-row items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse absolute top-0 right-0" />
                                <span className="text-xl">🤖</span>
                            </div>
                            <div>
                                <CardTitle className="text-base font-bold">Ask Mtaa</CardTitle>
                                <p className="text-xs text-teal-100">Your Local Expert</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="h-96 flex flex-col p-0 bg-slate-50">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "max-w-[85%] rounded-2xl p-3 text-sm shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-teal-600 text-white ml-auto rounded-tr-none"
                                            : "bg-white text-slate-800 mr-auto rounded-tl-none border border-slate-200"
                                    )}
                                >
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-3 border-t bg-white flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type here..."
                                className="bg-slate-50 focus-visible:ring-teal-500"
                            />
                            <Button size="icon" onClick={handleSend} className="bg-teal-600 hover:bg-teal-700">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

