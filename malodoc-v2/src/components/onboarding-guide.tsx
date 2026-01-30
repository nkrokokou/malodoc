"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const steps = [
    {
        target: "overview", // Would normally target an element ID
        title: "Welcome to Dashboard",
        content: "This is your command center. Track patients, appointments, and donations in real-time.",
        position: { bottom: "20px", left: "20px" } // Demo positioning
    },
    {
        target: "sidebar",
        title: "Navigation Dock",
        content: "Access all major features here. It floats for easier access on large screens.",
        position: { top: "100px", left: "320px" }
    }
]

export function OnboardingGuide() {
    const [isVisible, setIsVisible] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        // Show after a short delay for demo
        const timer = setTimeout(() => setIsVisible(true), 1500)
        return () => clearTimeout(timer)
    }, [])

    if (!isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed z-50 max-w-xs"
                style={steps[currentStep].position}
            >
                <div className="relative">
                    {/* Bubble Tail */}
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-white transform rotate-45 border-l border-b border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900"></div>

                    <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-sm">{steps[currentStep].title}</h4>
                            <button onClick={() => setIsVisible(false)} className="text-zinc-400 hover:text-zinc-600">×</button>
                        </div>
                        <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                            {steps[currentStep].content}
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-zinc-400">{currentStep + 1} / {steps.length}</span>
                            <button
                                onClick={() => {
                                    if (currentStep < steps.length - 1) {
                                        setCurrentStep(prev => prev + 1)
                                    } else {
                                        setIsVisible(false)
                                    }
                                }}
                                className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                {currentStep === steps.length - 1 ? "Finish" : "Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
