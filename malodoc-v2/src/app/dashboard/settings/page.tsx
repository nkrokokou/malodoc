"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"

export default function SettingsPage() {
    const { t } = useLanguage()

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-white glow-text">{t("sidebar.settings")}</h2>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Profile Information */}
                <Card className="glass-card border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Profile Information</CardTitle>
                        <CardDescription className="text-zinc-400">Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-white">First Name</Label>
                                <Input id="firstName" placeholder="John" className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-white">Last Name</Label>
                                <Input id="lastName" placeholder="Doe" className="bg-white/5 border-white/10 text-white" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="age" className="text-white">Age</Label>
                                <Input id="age" type="number" placeholder="30" className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sex" className="text-white">Sex</Label>
                                <select id="sex" className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-white">Location / Address</Label>
                            <Input id="location" placeholder="Abidjan, Cocody" className="bg-white/5 border-white/10 text-white" />
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90">Save Profile</Button>
                    </CardContent>
                </Card>

                {/* Medical History */}
                <Card className="glass-card border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Medical History (Dossier Médical)</CardTitle>
                        <CardDescription className="text-zinc-400">Important info for your doctors</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="allergies" className="text-white">Allergies</Label>
                            <Input id="allergies" placeholder="Peanuts, Penicillin..." className="bg-white/5 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bloodType" className="text-white">Blood Type</Label>
                            <select id="bloodType" className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary">
                                <option value="">Select...</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="history" className="text-white">Notes / History</Label>
                            <Textarea id="history" placeholder="Previous surgeries, chronic conditions..." className="bg-white/5 border-white/10 text-white min-h-[100px]" />
                        </div>
                        <Button variant="secondary" className="w-full">Update Medical Record</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
