"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Phone, MoreHorizontal, Calendar, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Mock Data for Patients (Lomé Context)
const patients = [
    {
        id: "P001",
        name: "Koffi Mensah",
        age: 34,
        location: "Adidogomé, Lomé",
        status: "Active",
        lastVisit: "2024-01-28",
        condition: "Hyper tension",
        avatar: "KM"
    },
    {
        id: "P002",
        name: "Afi Denise",
        age: 27,
        location: "Tokoin Doumasséssé",
        status: "Recovering",
        lastVisit: "2024-01-25",
        condition: "Malaria Treatment",
        avatar: "AD"
    },
    {
        id: "P003",
        name: "Jean-Paul Agbogan",
        age: 45,
        location: "Bè-Kpota, Lomé",
        status: "Critical",
        lastVisit: "2024-01-30",
        condition: "Diabetes Type 2",
        avatar: "JP"
    },
    {
        id: "P004",
        name: "Sarah Lawson",
        age: 22,
        location: "Agoè-Nyivé",
        status: "Active",
        lastVisit: "2024-01-20",
        condition: "Prenatal Checkup",
        avatar: "SL"
    },
    {
        id: "P005",
        name: "Kodjo Emmanuel",
        age: 58,
        location: "Kodjoviakopé",
        status: "Stable",
        lastVisit: "2023-12-15",
        condition: "Post-surgery check",
        avatar: "KE"
    },
    {
        id: "P006",
        name: "Aminata Touré",
        age: 31,
        location: "Hedzranawoé",
        status: "Active",
        lastVisit: "2024-01-29",
        condition: "Flu / Fever",
        avatar: "AT"
    }
]

export default function PatientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">Patient Management</h2>
                    <p className="text-muted-foreground">Monitor patient health records across Greater Lomé.</p>
                </div>
                <Button className="bg-primary text-white shadow-lg shadow-primary/20">
                    + Add New Patient
                </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search patients by name or ID..." className="pl-9 bg-accent/50 border-border/50" />
                </div>
                <Button variant="outline" className="hidden md:flex">Filter by Location</Button>
            </div>

            {/* Patients Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {patients.map((patient) => (
                    <Card key={patient.id} className="glass-card border-border/50 group hover:border-primary/50 transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-primary/20">
                                    <AvatarFallback className="bg-primary/10 text-primary">{patient.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base text-card-foreground">{patient.name}</CardTitle>
                                    <CardDescription className="text-xs text-muted-foreground">{patient.id}</CardDescription>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Location</span>
                                    <span className="text-foreground font-medium">{patient.location}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> Last Visit</span>
                                    <span className="text-foreground">{patient.lastVisit}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-1"><FileText className="h-3 w-3" /> Condition</span>
                                    <span className="text-foreground">{patient.condition}</span>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center justify-between border-t border-border/50 mt-2">
                                <Badge variant="outline" className={`
                                    ${patient.status === 'Critical' ? 'border-red-500 text-red-500 bg-red-500/10' : ''}
                                    ${patient.status === 'Active' ? 'border-green-500 text-green-500 bg-green-500/10' : ''}
                                    ${patient.status === 'Recovering' ? 'border-blue-500 text-blue-500 bg-blue-500/10' : ''}
                                    ${patient.status === 'Stable' ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' : ''}
                                `}>
                                    {patient.status}
                                </Badge>
                                <Button variant="ghost" size="sm" className="text-xs h-7" asChild>
                                    <Link href={`/dashboard/patients/${patient.id}`}>View Profile</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
