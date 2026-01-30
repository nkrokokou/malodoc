"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { AIBot } from "@/components/ai-bot"
import { OnboardingGuide } from "@/components/onboarding-guide"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { CookieConsent } from "@/components/cookie-consent"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen w-full bg-background overflow-hidden flex font-sans selection:bg-secondary selection:text-black relative transition-colors duration-300">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5"></div>
            </div>

            {/* AI Helpers & Cookies */}
            <AIBot />
            <OnboardingGuide />
            <CookieConsent />

            {/* Desktop Sidebar (Hidden on Mobile) */}
            <div className="hidden md:flex flex-col w-72 h-[96vh] my-[2vh] ml-[2vh] z-20 shrink-0" id="sidebar">
                <div className="h-full rounded-2xl glass border border-border/50 overflow-hidden shadow-2xl">
                    <Sidebar />
                </div>
            </div>

            {/* Mobile Sidebar (Sheet) */}
            <div className="md:hidden absolute top-4 left-4 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="glass border-border/50">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 border-r-0 bg-transparent">
                        <div className="h-full w-full glass border-r border-border/50">
                            <Sidebar />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto relative z-10 p-4 md:p-8 pt-20 md:pt-8 scroll-smooth" id="overview">
                {/* Top Bar for Toggles */}
                <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50 flex items-center gap-2">
                    <LanguageToggle />
                    <ModeToggle />
                </div>

                <div className="max-w-7xl mx-auto h-full space-y-8">
                    {children}
                </div>
            </main>
        </div >
    )
}
