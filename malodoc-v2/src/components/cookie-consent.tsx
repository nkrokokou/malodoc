"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if cookie consent is already given
        const consent = localStorage.getItem("malodoc-cookie-consent")
        if (!consent) {
            setTimeout(() => setIsVisible(true), 2000)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem("malodoc-cookie-consent", "true")
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-20 md:right-auto md:w-[400px] z-[60] p-4 glass-card border border-primary/20 shadow-2xl flex flex-col gap-4"
                >
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                            <Cookie className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground">We use cookies</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                                We use cookies to enhance your experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="text-xs">Decline</Button>
                        <Button size="sm" onClick={handleAccept} className="text-xs bg-primary text-white hover:bg-primary/90">Accept All</Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
