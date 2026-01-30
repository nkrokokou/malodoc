"use client"

import { motion } from "framer-motion"
import { Users, Clock, CheckCircle, XCircle } from "lucide-react"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppointments } from "@/components/appointment-provider"
import { useLanguage } from "@/components/language-provider"

export function DoctorDashboard() {
    const { appointments } = useAppointments()
    const { t } = useLanguage()

    const pendingRequests = appointments.filter(a => a.status === 'pending')
    const confirmedAppointments = appointments.filter(a => a.status === 'confirmed')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">{t("doctor.portal")}</h2>
                    <p className="text-muted-foreground">{t("doctor.welcome").replace("{name}", "Dr. Amina")}</p>
                </div>
            </div>

            {/* Doctor Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group"
                >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("doctor.total_appointments")}</p>
                        <h3 className="text-3xl font-bold mt-1 text-foreground">{appointments.length}</h3>
                    </div>
                    <div className="flex items-center text-sm text-green-500 bg-green-500/10 w-fit px-2 py-1 rounded-full">
                        <Clock className="w-4 h-4 mr-1" />
                        {t("doctor.synced_live")}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group"
                >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all"></div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("doctor.pending_requests")}</p>
                        <h3 className="text-3xl font-bold mt-1 text-foreground">{pendingRequests.length}</h3>
                    </div>
                    <div className="flex items-center text-sm text-orange-500 bg-orange-500/10 w-fit px-2 py-1 rounded-full">
                        {t("doctor.action_required")}
                    </div>
                </motion.div>
            </div>

            {/* Appointments List (Doctor View) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                <div className="lg:col-span-2 glass-card p-6 overflow-hidden flex flex-col">
                    <CardHeader className="px-0 pt-0">
                        <CardTitle className="text-foreground">{t("doctor.requests_title")}</CardTitle>
                        <CardDescription>{t("doctor.requests_desc")}</CardDescription>
                    </CardHeader>
                    <div className="space-y-4 overflow-y-auto pr-2">
                        {appointments.map((appt) => (
                            <div key={appt.id} className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50 hover:bg-accent/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-black font-bold">
                                        {appt.patientName.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">{appt.patientName}</h4>
                                        <p className="text-sm text-muted-foreground">{appt.details} • {appt.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant={appt.status === 'confirmed' ? 'default' : 'secondary'}>
                                        {appt.status.toUpperCase()}
                                    </Badge>
                                    {appt.status === 'pending' && (
                                        <>
                                            <Button size="sm" variant="outline" className="text-green-500 border-green-500/20 hover:bg-green-500/10 gap-1">
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/10 gap-1">
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Patient Schedule */}
                <div className="glass-card p-6">
                    <CardHeader className="px-0 pt-0">
                        <CardTitle className="text-foreground">{t("doctor.todays_schedule")}</CardTitle>
                        <CardDescription>{t("doctor.timeline")}</CardDescription>
                    </CardHeader>
                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                        {confirmedAppointments.map((appt, i) => (
                            <div className="relative" key={i}>
                                <span className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-primary border-[3px] border-background"></span>
                                <p className="text-xs text-muted-foreground">{appt.date.split(',')[1] || 'Today'}</p>
                                <h4 className="text-sm font-bold text-foreground">Consultation: {appt.patientName}</h4>
                                <Badge variant="secondary" className="mt-1 text-[10px]">{appt.details}</Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
