"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send, Sparkles, Globe, ChevronRight, Search, Map, Calendar, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from "next/navigation"
import { useRole } from "@/components/role-provider"

type Message = {
    role: "bot" | "user"
    content: string
    isThinking?: boolean
    sources?: string[]
    action?: {
        label: string
        href: string
    }
}

export function AIBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const router = useRouter()
    const { role } = useRole()

    // 1. Context Awareness: Initial Greeting based on Page & Role
    useEffect(() => {
        let greeting = "Hello! I am Malo AI. How can I assist you today?"

        if (pathname.includes("pharmacy")) {
            greeting = "I see you're looking for medicines. I can help you check interaction risks or find the nearest pharmacy with stock."
        } else if (pathname.includes("appointments")) {
            greeting = "Need to reschedule? I can check doctor availability for you instantly."
        } else if (pathname.includes("admin")) {
            greeting = "Admin Mode Detected. I can help you generate system reports or audit user logs."
        } else if (role === 'doctor') {
            greeting = "Dr. Amina, you have 3 critical patients today. Do you want a summary?"
        }

        setMessages([{ role: "bot", content: greeting }])
    }, [pathname, role, isOpen])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isTyping])

    const simulateWebSearch = async (query: string) => {
        setIsTyping(true)

        // Phase 1: Analyzing
        await new Promise(r => setTimeout(r, 1000))
        setMessages(prev => [...prev, { role: "bot", content: "Analyzing request...", isThinking: true }])

        // Phase 2: "Searching Web"
        await new Promise(r => setTimeout(r, 1200))
        setMessages(prev => {
            const newMsgs = [...prev]
            newMsgs.pop() // Remove "Analyzing"
            return [...newMsgs, { role: "bot", content: `Searching healthcare database for "${query}"...`, isThinking: true }]
        })

        // Phase 3: Result
        await new Promise(r => setTimeout(r, 1500))
        setMessages(prev => {
            const newMsgs = [...prev]
            newMsgs.pop() // Remove "Searching"
            return newMsgs
        })

        setIsTyping(false)
        return true
    }

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg = { role: "user" as const, content: input }
        setMessages(prev => [...prev, userMsg])
        const currentInput = input
        setInput("")

        // Intelligence Logic
        if (currentInput.toLowerCase().includes("headache") || currentInput.toLowerCase().includes("pain")) {
            await simulateWebSearch(currentInput)
            setMessages(prev => [...prev, {
                role: "bot",
                content: "Based on your symptoms, this could be a tension headache or migraine. I've found 3 specialists nearby available today.",
                sources: ["Malodoc Medical Graph", "WHO Database"],
                action: { label: "Book Specialist", href: "/dashboard/appointments" }
            }])
        }
        else if (currentInput.toLowerCase().includes("pharmacy") || currentInput.toLowerCase().includes("drug")) {
            await simulateWebSearch("Stock availability Lomé")
            setMessages(prev => [...prev, {
                role: "bot",
                content: "I've located 'Pharmacie de la Grâce' (2km away) which has this in stock.",
                action: { label: "View on Map", href: "/dashboard/pharmacy" }
            }])
        }
        else if (currentInput.toLowerCase().includes("admin") || currentInput.toLowerCase().includes("user")) {
            setMessages(prev => [...prev, {
                role: "bot",
                content: "Navigating you to the User Management panel.",
                action: { label: "Go to Users", href: "/dashboard/admin/users" }
            }])
        }
        else {
            setIsTyping(true)
            setTimeout(() => {
                setIsTyping(false)
                setMessages(prev => [...prev, {
                    role: "bot",
                    content: "I'm processing that context. As an AI trained on local healthcare data, I can assist with appointments, diagnosis pre-checks, and solidarity funding.",
                }])
            }, 1500)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-[380px] h-[600px] glass-card border border-border/50 flex flex-col shadow-2xl overflow-hidden rounded-2xl ring-1 ring-white/10"
                    >
                        {/* Intelligent Header */}
                        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 flex items-center justify-between border-b border-border/10 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
                                        <Bot className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-black"></span>
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                                        Malo AI <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/20 text-primary border border-primary/20">PRO</span>
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Globe className="h-3 w-3" /> Connected to Global Graph
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setIsOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/50 scroll-smooth" ref={scrollRef}>
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm relative ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                                        : 'bg-card text-card-foreground border border-border/50 rounded-tl-none'
                                        }`}>

                                        {msg.isThinking ? (
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Search className="h-3 w-3 animate-spin" />
                                                {msg.content}
                                            </div>
                                        ) : (
                                            <>
                                                {msg.content}
                                                {msg.sources && (
                                                    <div className="mt-2 text-[10px] text-muted-foreground border-t border-border/20 pt-1 flex items-center gap-1">
                                                        <Globe className="h-3 w-3" /> Source: {msg.sources.join(", ")}
                                                    </div>
                                                )}
                                                {msg.action && (
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="mt-3 w-full text-xs h-7 gap-1 bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground border border-secondary/20"
                                                        onClick={() => router.push(msg.action!.href)}
                                                    >
                                                        {msg.action.label} <ChevronRight className="h-3 w-3" />
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && !messages[messages.length - 1]?.isThinking && (
                                <div className="flex justify-start">
                                    <div className="bg-card border border-border/50 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Smart Input Area */}
                        <div className="p-3 bg-card/80 border-t border-border/10 flex gap-2 backdrop-blur-md flex-col">
                            {/* Quick Chips */}
                            <div className="flex gap-2 mb-2 overflow-x-auto pb-1 scrollbar-hide">
                                <Button variant="outline" size="sm" className="h-6 text-[10px] rounded-full whitespace-nowrap bg-background/50" onClick={() => setInput("Booking a Doctor")}>
                                    <Calendar className="h-3 w-3 mr-1" /> Booking
                                </Button>
                                <Button variant="outline" size="sm" className="h-6 text-[10px] rounded-full whitespace-nowrap bg-background/50" onClick={() => setInput("Find Pharmacy")}>
                                    <Map className="h-3 w-3 mr-1" /> Pharmacy
                                </Button>
                                <Button variant="outline" size="sm" className="h-6 text-[10px] rounded-full whitespace-nowrap bg-background/50" onClick={() => setInput("Check Interactions")}>
                                    <Pill className="h-3 w-3 mr-1" /> Interactions
                                </Button>
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask Malo AI..."
                                    className="bg-muted/50 border-transparent focus:bg-background focus:border-primary/50 text-sm h-10 transition-all rounded-full px-4"
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <Button size="icon" className="h-10 w-10 shrink-0 rounded-full bg-primary hover:bg-primary/90 shadow-lg" onClick={handleSend}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher with Notification Badge */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-2xl shadow-primary/40 text-white relative group ring-2 ring-white/20"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}

                {/* Notification Badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-background">
                        1
                    </span>
                )}
            </motion.button>
        </div>
    )
}
