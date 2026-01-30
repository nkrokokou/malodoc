"use client"

import { motion } from "framer-motion"
import { Users, AlertTriangle, Activity, Server, ShieldCheck, Database, HardDrive, Ban } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ActivityChart } from "@/components/dashboard/activity-chart"

export function AdminDashboard() {
    const { t } = useLanguage()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">{t("admin.portal")}</h2>
                    <p className="text-muted-foreground">System Overview & Health Status</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium border border-green-500/20">
                    <Activity className="w-4 h-4" />
                    System Operational
                </div>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group border-l-4 border-l-red-500/50"
                >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                        <h3 className="text-3xl font-bold mt-1 text-foreground">12,403</h3>
                    </div>
                    <div className="flex items-center text-sm text-green-500 bg-green-500/10 w-fit px-2 py-1 rounded-full">
                        <Users className="w-4 h-4 mr-1" />
                        +124 today
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group border-l-4 border-l-blue-500/50"
                >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Doctors</p>
                        <h3 className="text-3xl font-bold mt-1 text-foreground">842</h3>
                    </div>
                    <div className="flex items-center text-sm text-blue-500 bg-blue-500/10 w-fit px-2 py-1 rounded-full">
                        <ShieldCheck className="w-4 h-4 mr-1" />
                        Verified
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group border-l-4 border-l-yellow-500/50"
                >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Server Load</p>
                        <h3 className="text-3xl font-bold mt-1 text-foreground">24%</h3>
                    </div>
                    <div className="flex items-center text-sm text-yellow-500 bg-yellow-500/10 w-fit px-2 py-1 rounded-full">
                        <Server className="w-4 h-4 mr-1" />
                        Healthy
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group border-l-4 border-l-purple-500/50"
                >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Database</p>
                        <h3 className="text-3xl font-bold mt-1 text-foreground">1.2 GB</h3>
                    </div>
                    <div className="flex items-center text-sm text-purple-500 bg-purple-500/10 w-fit px-2 py-1 rounded-full">
                        <Database className="w-4 h-4 mr-1" />
                        Optimized
                    </div>
                </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                {/* Traffic Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 glass-card p-6 flex flex-col relative"
                >
                    <h3 className="text-lg font-semibold text-foreground mb-4">Traffic Analysis</h3>
                    <div className="flex-1 w-full h-full min-h-[300px]">
                        <ActivityChart />
                    </div>
                </motion.div>

                {/* System Logs */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-6 overflow-hidden flex flex-col"
                >
                    <h3 className="text-lg font-semibold text-foreground mb-4">Live Security Logs</h3>
                    <div className="space-y-4 overflow-y-auto pr-2 relative">
                        <div className="absolute left-2 top-2 bottom-2 w-[1px] bg-border"></div>
                        {[
                            { time: "10:42 AM", msg: "New admin login: nkro0", type: "info" },
                            { time: "10:38 AM", msg: "Database backup completed", type: "success" },
                            { time: "10:15 AM", msg: "Failed login attempt (IP: 192.168.x.x)", type: "warning" },
                            { time: "09:55 AM", msg: "Doctor 'Dr. Amina' verified", type: "success" },
                            { time: "09:30 AM", msg: "Server restart initiated", type: "error" },
                            { time: "09:00 AM", msg: "Morning health check passed", type: "info" },
                        ].map((log, i) => (
                            <div key={i} className="relative pl-6">
                                <span className={`absolute left-[5px] top-2 h-2 w-2 rounded-full ${log.type === 'error' ? 'bg-red-500' :
                                        log.type === 'warning' ? 'bg-orange-500' :
                                            log.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                    }`}></span>
                                <p className="text-xs text-muted-foreground font-mono">{log.time}</p>
                                <p className="text-sm font-medium text-foreground">{log.msg}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
