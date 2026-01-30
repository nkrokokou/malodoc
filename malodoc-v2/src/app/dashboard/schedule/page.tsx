"use client"

import { motion } from "framer-motion"
import { Calendar as CalendarIcon, Clock, Video, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppointments } from "@/components/appointment-provider"
import { useLanguage } from "@/components/language-provider"

export default function SchedulePage() {
    const { t } = useLanguage()
    const { appointments } = useAppointments()
    const confirmedAppointments = appointments.filter(a => a.status === 'confirmed')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">{t("schedule.title")}</h2>
                    <p className="text-muted-foreground">{t("schedule.desc")}</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <CalendarIcon className="h-4 w-4" /> {t("schedule.sync")}
                </Button>
            </div>

            <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 space-y-8 py-4">
                {confirmedAppointments.map((appt, idx) => (
                    <motion.div
                        key={appt.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-6 h-5 w-5 rounded-full bg-background border-4 border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] z-10"></div>

                        <div className="glass-card p-6 relative overflow-hidden group hover:border-primary/50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="secondary" className="text-xs font-mono">{appt.date.split(',')[1] || 'Today'}</Badge>
                                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">{t("schedule.consultation")}</Badge>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground">{appt.patientName}</h3>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 45 mins</span>
                                        <span className="flex items-center gap-1"><Video className="h-3 w-3" /> {t("schedule.telemedicine")}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button size="sm" className="bg-primary text-white hover:bg-primary/90">{t("schedule.join_call")}</Button>
                                    <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
