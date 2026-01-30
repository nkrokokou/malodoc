"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Calendar, Pill, Heart, Settings, LogOut, FileText, ClipboardList, Shield, Lock, User } from "lucide-react"
import { useRole } from "@/components/role-provider"
import { useLanguage } from "@/components/language-provider"
import { signOut } from "next-auth/react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const { role } = useRole()
    const { t } = useLanguage()

    // Admin Routes
    const adminRoutes = [
        {
            label: t("admin.portal"),
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-red-500",
        },
        {
            label: t("admin.users"),
            icon: Users,
            href: "/dashboard/admin/users",
            color: "text-blue-500",
        },
        {
            label: t("admin.settings"),
            icon: Settings,
            href: "/dashboard/admin/settings",
            color: "text-gray-500",
        },
    ]

    // Doctor Routes
    const doctorRoutes = [
        {
            label: t("sidebar.doctor_portal"),
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-blue-500",
        },
        {
            label: t("sidebar.my_patients"),
            icon: Users,
            href: "/dashboard/patients",
            color: "text-purple-500",
        },
        {
            label: t("sidebar.requests"),
            icon: ClipboardList,
            href: "/dashboard/requests",
            color: "text-orange-500",
        },
        {
            label: t("sidebar.schedule"),
            icon: Calendar,
            href: "/dashboard/schedule",
            color: "text-green-500",
        },
    ]

    // Patient Routes
    const patientRoutes = [
        {
            label: t("sidebar.overview"),
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-sky-500",
        },
        {
            label: t("sidebar.appointments"),
            icon: Calendar,
            href: "/dashboard/appointments",
            color: "text-violet-500",
        },
        {
            label: t("sidebar.pharmacy"),
            icon: Pill,
            href: "/dashboard/pharmacy",
            color: "text-orange-700",
        },
        {
            label: t("sidebar.solidarity"),
            icon: Heart,
            href: "/dashboard/solidarity",
            color: "text-emerald-500",
        },
        {
            label: t("sidebar.settings"),
            icon: FileText,
            href: "/dashboard/settings",
            color: "text-pink-500",
        },
    ]

    let routes = patientRoutes
    if (role === 'doctor') routes = doctorRoutes
    if (role === 'admin') routes = adminRoutes

    return (
        <div className={cn("h-full py-4 flex flex-col bg-card/40 backdrop-blur-xl transition-colors duration-300", className)}>
            <div className="px-6 py-4">
                <Link href="/" className="flex items-center gap-2 mb-8">
                    <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                        role === 'admin' ? "bg-red-600" :
                            role === 'doctor' ? "bg-gradient-to-tr from-blue-600 to-cyan-500" :
                                "bg-gradient-to-tr from-primary to-secondary"
                    )}>
                        <span className="font-bold text-white">M</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        {role === 'admin' ? "MaloAdmin" : role === 'doctor' ? t("app.pro") : t("app.name")}
                    </span>
                </Link>

                <div className="space-y-1">
                    {routes.map((route) => (
                        <Button
                            key={route.href}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start relative overflow-hidden transition-all duration-300",
                                pathname === route.href
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                            asChild
                        >
                            <Link href={route.href}>
                                {pathname === route.href && (
                                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></span>
                                )}
                                <route.icon className={cn("mr-3 h-5 w-5 transition-colors", pathname === route.href ? "text-primary" : route.color)} />
                                {route.label}
                            </Link>
                        </Button>
                    ))}
                </div>

                <div className="mt-8">
                    <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Account</p>
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start relative overflow-hidden transition-all duration-300",
                            pathname === '/dashboard/profile'
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                        asChild
                    >
                        <Link href="/dashboard/profile">
                            <User className="mr-3 h-5 w-5" />
                            {t("profile.title")}
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="mt-auto px-6 pb-6">
                {(role === 'patient') && (
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 mb-4 border border-border/50">
                        <p className="text-xs font-semibold text-foreground mb-1">{t("sidebar.premium")}</p>
                        <p className="text-[10px] text-muted-foreground mb-3">{t("sidebar.premium_desc")}</p>
                        <Button size="sm" className="w-full h-7 text-xs">{t("sidebar.upgrade")}</Button>
                    </div>
                )}
                {role === 'doctor' && (
                    <div className="bg-blue-500/10 rounded-xl p-4 mb-4 border border-blue-500/20">
                        <p className="text-xs font-semibold text-foreground mb-1">{t("sidebar.status_online")}</p>
                        <p className="text-[10px] text-muted-foreground mb-3">{t("sidebar.status_desc")}</p>
                        <Button size="sm" variant="outline" className="w-full h-7 text-xs border-blue-500/50 text-blue-500 hover:bg-blue-500/20">{t("sidebar.go_offline")}</Button>
                    </div>
                )}

                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10 dark:text-red-400 dark:hover:text-red-300"
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                >
                    <LogOut className="mr-2 h-5 w-5" />
                    {t("sidebar.logout")}
                </Button>
            </div>
        </div>
    )
}
