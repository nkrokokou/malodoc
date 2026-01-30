"use client"

// Note: In Next.js 15, params are async/awaited in server components, but for client components we use `useParams`
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Mail, Calendar, FileText, Activity } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PatientDetailPage() {
    const params = useParams()
    const id = params?.id

    return (
        <div className="space-y-6">
            <Link href="/dashboard/patients">
                <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients
                </Button>
            </Link>

            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-primary/20">
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">PA</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground glow-text">Patient {id}</h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <MapPin className="h-3 w-3" /> Lomé, Togo
                        </p>
                    </div>
                </div>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/50 px-4 py-1">Active</Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-card border-border/50 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" /> Medical Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-accent/50">
                                <p className="text-xs text-muted-foreground">Blood Type</p>
                                <p className="text-lg font-bold">O+</p>
                            </div>
                            <div className="p-4 rounded-lg bg-accent/50">
                                <p className="text-xs text-muted-foreground">Allergies</p>
                                <p className="text-lg font-bold">Peanuts</p>
                            </div>
                            <div className="p-4 rounded-lg bg-accent/50">
                                <p className="text-xs text-muted-foreground">Height</p>
                                <p className="text-lg font-bold">178 cm</p>
                            </div>
                            <div className="p-4 rounded-lg bg-accent/50">
                                <p className="text-xs text-muted-foreground">Weight</p>
                                <p className="text-lg font-bold">75 kg</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Recent Visit History</h3>
                            <div className="space-y-4 border-l-2 border-primary/20 pl-4 ml-1">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary"></div>
                                    <p className="text-sm font-medium">General Checkup</p>
                                    <p className="text-xs text-muted-foreground">Jan 28, 2024 • Dr. Amina</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-muted-foreground/30"></div>
                                    <p className="text-sm font-medium">Malaria Test (Negative)</p>
                                    <p className="text-xs text-muted-foreground">Dec 15, 2023 • Lab Tech</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border/50 h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" /> Contact
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Phone className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Phone</p>
                                <p className="text-xs text-muted-foreground">+228 90 12 34 56</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Mail className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-xs text-muted-foreground">patient@example.com</p>
                            </div>
                        </div>
                        <Button className="w-full mt-4">Message Patient</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
