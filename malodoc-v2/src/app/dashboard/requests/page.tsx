"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppointments } from "@/components/appointment-provider"
import { useLanguage } from "@/components/language-provider"

export default function RequestsPage() {
    const { t } = useLanguage()
    const { appointments } = useAppointments()

    const pendingRequests = appointments.filter(a => a.status === 'pending')

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">{t("requests.title")}</h2>
                <p className="text-muted-foreground">{t("requests.desc")}</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {pendingRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 glass-card border-dashed">
                        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <CheckCircle className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{t("requests.empty")}</h3>
                        <p className="text-muted-foreground">{t("requests.empty_desc")}</p>
                    </div>
                ) : (
                    pendingRequests.map((appt, idx) => (
                        <motion.div
                            key={appt.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {appt.patientName.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg text-foreground">{appt.patientName}</h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <Badge variant="outline" className="gap-1 border-primary/20 text-primary bg-primary/5">
                                            <Calendar className="h-3 w-3" /> {appt.date}
                                        </Badge>
                                        <span>• {appt.details}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Button className="flex-1 md:flex-none gap-2 bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20">
                                    <CheckCircle className="h-4 w-4" /> {t("requests.accept")}
                                </Button>
                                <Button variant="secondary" className="flex-1 md:flex-none gap-2 hover:bg-red-500/10 hover:text-red-500">
                                    <XCircle className="h-4 w-4" /> {t("requests.decline")}
                                </Button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}
