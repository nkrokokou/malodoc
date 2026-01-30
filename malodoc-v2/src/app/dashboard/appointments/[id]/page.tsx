"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, User, Video, FileText, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function AppointmentDetailPage() {
    const params = useParams()
    const id = params?.id

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <Link href="/dashboard/appointments">
                <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Appointments
                </Button>
            </Link>

            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight glow-text">Appointment Details</h2>
                <Badge variant="outline" className="border-green-500 text-green-500 bg-green-500/10 px-3 py-1">Confirmed</Badge>
            </div>

            <Card className="glass-card border-border/50">
                <CardHeader className="border-b border-border/50 pb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-xl">General Checkup</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                                ID: {id} • <span className="text-primary font-medium">Solidarity Slot</span>
                            </CardDescription>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold">Feb 15, 2024</p>
                            <p className="text-muted-foreground">10:00 AM</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <User className="h-4 w-4" /> Doctor
                            </p>
                            <p className="text-lg font-semibold">Dr. Amina Diop</p>
                            <p className="text-sm text-muted-foreground">Pediatrician • CHU Sylvanus Olympio</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> Location
                            </p>
                            <p className="text-lg font-semibold">CHU Sylvanus Olympio</p>
                            <p className="text-sm text-muted-foreground">Wing B, Room 304</p>
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" /> Pre-Visit Instructions
                        </h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Please arrive 15 minutes early.</li>
                            <li>Bring your previous medical records and ID.</li>
                            <li>Wear a mask if you have flu-like symptoms.</li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-border/50 pt-6">
                    <Button variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/10">
                        <XCircle className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                    <div className="flex gap-3">
                        <Button variant="outline">Reschedule</Button>
                        <Button>
                            <Video className="mr-2 h-4 w-4" /> Join Tele-Consult
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
