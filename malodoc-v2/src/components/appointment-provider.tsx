"use client"

import React, { createContext, useContext, useState } from "react"

export type Appointment = {
    id: string
    patientName: string
    doctorName: string
    date: string
    status: "pending" | "confirmed" | "cancelled"
    details: string
}

interface AppointmentContextType {
    appointments: Appointment[]
    addAppointment: (appt: Appointment) => void
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
    // Initial Mock Data
    const [appointments, setAppointments] = useState<Appointment[]>([
        { id: "1", patientName: "Kodjo Mensah", doctorName: "Dr. Amina", date: "Today, 14:00", status: "pending", details: "Cardiology Checkup" },
        { id: "2", patientName: "Sarah Yace", doctorName: "Dr. Amina", date: "Tomorrow, 09:00", status: "confirmed", details: "General Consultation" }
    ])

    const addAppointment = (appt: Appointment) => {
        setAppointments(prev => [appt, ...prev])
    }

    return (
        <AppointmentContext.Provider value={{ appointments, addAppointment }}>
            {children}
        </AppointmentContext.Provider>
    )
}

export function useAppointments() {
    const context = useContext(AppointmentContext)
    if (context === undefined) {
        throw new Error("useAppointments must be used within an AppointmentProvider")
    }
    return context
}
