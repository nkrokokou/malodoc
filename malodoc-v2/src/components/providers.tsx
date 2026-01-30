"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { RoleProvider } from "@/components/role-provider"
import { AppointmentProvider } from "@/components/appointment-provider"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <LanguageProvider>
                    <RoleProvider>
                        <AppointmentProvider>
                            {children}
                        </AppointmentProvider>
                    </RoleProvider>
                </LanguageProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}
