"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"

type UserRole = "patient" | "doctor" | "admin"

interface RoleContextType {
    role: UserRole
    isLoading: boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession()
    const [role, setRole] = useState<UserRole>("patient")

    useEffect(() => {
        if (session?.user?.role) {
            setRole(session.user.role as UserRole)
        }
    }, [session])

    return (
        <RoleContext.Provider value={{ role, isLoading: status === "loading" }}>
            {children}
        </RoleContext.Provider>
    )
}

export function useRole() {
    const context = useContext(RoleContext)
    if (context === undefined) {
        throw new Error("useRole must be used within a RoleProvider")
    }
    return context
}
