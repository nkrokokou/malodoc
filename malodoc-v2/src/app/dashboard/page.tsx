"use client"

import { motion } from "framer-motion"
import { Users, Calendar, Activity, CreditCard, ArrowUpRight, Heart, Pill } from "lucide-react"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { useLanguage } from "@/components/language-provider"
import { useRole } from "@/components/role-provider"
import { DoctorDashboard } from "@/components/dashboard/doctor-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function DashboardPage() {
    const { t } = useLanguage()
    const { role } = useRole()

    // If role is doctor, show Doctor Dashboard
    if (role === 'doctor') {
        return <DoctorDashboard />
    }

    // If role is admin, show Admin Dashboard
    if (role === 'admin') {
        return <AdminDashboard />
    }

    // Default: Patient Dashboard
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">{t("dashboard.overview")}</h2>
                    <p className="text-muted-foreground">{t("dashboard.welcome")}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stat 1 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group"
                >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all dark:bg-primary/20 dark:group-hover:bg-primary/30"></div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("dashboard.patients")}</p>
                        <h3 className="text-3xl font-bold mt-1 text-card-foreground">1,234</h3>
                    </div>
                    <div className="flex items-center text-sm text-green-500 bg-green-500/10 w-fit px-2 py-1 rounded-full dark:text-green-400 dark:bg-green-400/10">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        +20.1%
                    </div>
                    <Users className="absolute bottom-4 right-4 w-8 h-8 text-muted-foreground/20 group-hover:text-primary/50 transition-colors" />
                </motion.div>

                {/* Stat 2 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group"
                >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-all dark:bg-secondary/20 dark:group-hover:bg-secondary/30"></div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("dashboard.appointments")}</p>
                        <h3 className="text-3xl font-bold mt-1 text-card-foreground">573</h3>
                    </div>
                    <div className="flex items-center text-sm text-green-500 bg-green-500/10 w-fit px-2 py-1 rounded-full dark:text-green-400 dark:bg-green-400/10">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        +5%
                    </div>
                    <Calendar className="absolute bottom-4 right-4 w-8 h-8 text-muted-foreground/20 group-hover:text-secondary/50 transition-colors" />
                </motion.div>

                {/* Stat 3 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group"
                >
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("dashboard.doctors")}</p>
                        <h3 className="text-3xl font-bold mt-1 text-card-foreground">42</h3>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        Since last week
                    </div>
                    <Activity className="absolute bottom-4 right-4 w-8 h-8 text-muted-foreground/20 group-hover:text-primary/50 transition-colors" />
                </motion.div>

                {/* Stat 4 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group"
                >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all dark:bg-yellow-500/20 dark:group-hover:bg-yellow-500/30"></div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{t("dashboard.donations")}</p>
                        <h3 className="text-3xl font-bold mt-1 text-card-foreground">$12k</h3>
                    </div>
                    <div className="flex items-center text-sm text-green-500 bg-green-500/10 w-fit px-2 py-1 rounded-full dark:text-green-400 dark:bg-green-400/10">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        +12%
                    </div>
                    <CreditCard className="absolute bottom-4 right-4 w-8 h-8 text-muted-foreground/20 group-hover:text-yellow-500/50 transition-colors" />
                </motion.div>
            </div>

            {/* Bento Grid Main */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
                {/* Large Chart Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-2 glass-card p-6 flex flex-col relative"
                >
                    <h3 className="text-lg font-semibold text-card-foreground mb-4">{t("dashboard.activity")}</h3>
                    <div className="flex-1 w-full h-full min-h-[300px]">
                        <ActivityChart />
                    </div>
                </motion.div>

                {/* Sidebar Widgets */}
                <div className="grid grid-rows-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-5 flex items-center gap-4 hover:bg-black/5 cursor-pointer dark:hover:bg-white/10"
                    >
                        <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-600 dark:bg-red-500/20 dark:text-red-500">
                            <Heart className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-card-foreground">{t("sidebar.solidarity")}</h4>
                            <p className="text-xs text-muted-foreground">View latest contributions</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="glass-card p-5 flex items-center gap-4 hover:bg-black/5 cursor-pointer dark:hover:bg-white/10"
                    >
                        <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:bg-blue-500/20 dark:text-blue-500">
                            <Pill className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-card-foreground">{t("sidebar.pharmacy")}</h4>
                            <p className="text-xs text-muted-foreground">Locate medicine nearby</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
