"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider"

const appointments = [
    {
        id: "APP-001",
        patient: "Kodjo Mensah",
        date: "2024-02-15",
        time: "10:00 AM",
        doctor: "Dr. Smith",
        status: "Confirmed",
        type: "General Checkup",
    },
    {
        id: "APP-002",
        patient: "Afi Teteh",
        date: "2024-02-16",
        time: "02:30 PM",
        doctor: "Dr. Doe",
        status: "Pending",
        type: "Solidarity Slot",
    },
    {
        id: "APP-003",
        patient: "Jean-Paul Koffi",
        date: "2024-02-14",
        time: "11:15 AM",
        doctor: "Dr. Smith",
        status: "Completed",
        type: "Consultation",
    },
]

export default function AppointmentsPage() {
    const { t } = useLanguage()

    return (
        <Card className="glass-card border-border/50">
            <CardHeader>
                <CardTitle className="glow-text">{t("appointments.title")}</CardTitle>
                <CardDescription>
                    {t("appointments.desc")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">{t("appointments.col_id")}</TableHead>
                            <TableHead>{t("appointments.col_patient")}</TableHead>
                            <TableHead>{t("appointments.col_date")}</TableHead>
                            <TableHead>{t("appointments.col_doctor")}</TableHead>
                            <TableHead>{t("appointments.col_type")}</TableHead>
                            <TableHead>{t("appointments.col_status")}</TableHead>
                            <TableHead className="text-right">{t("appointments.col_actions")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.map((app) => (
                            <TableRow key={app.id}>
                                <TableCell className="font-medium">{app.id}</TableCell>
                                <TableCell>{app.patient}</TableCell>
                                <TableCell>
                                    {app.date} <br />
                                    <span className="text-xs text-muted-foreground">{app.time}</span>
                                </TableCell>
                                <TableCell>{app.doctor}</TableCell>
                                <TableCell>{app.type}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        app.status === 'Confirmed' ? 'default' :
                                            app.status === 'Pending' ? 'secondary' : 'outline'
                                    }>
                                        {app.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>{t("appointments.col_actions")}</DropdownMenuLabel>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/dashboard/appointments/${app.id}`} className="w-full cursor-pointer">
                                                    {t("appointments.action_view")}
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>{t("appointments.action_reschedule")}</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">{t("appointments.action_cancel")}</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
