"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Shield, Save, MapPin, Phone, Camera } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useRole } from "@/components/role-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
    const { t } = useLanguage()
    const { role } = useRole()
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = () => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            alert("Profile updated successfully!")
        }, 1500)
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">{t("profile.title")}</h2>
                <p className="text-muted-foreground">{t("profile.desc")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-1"
                >
                    <Card className="glass-card border-none overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                        <div className="px-6 relative">
                            <div className="absolute -top-16 left-6 rounded-full p-1 bg-background">
                                <Avatar className="h-32 w-32 border-4 border-background">
                                    <AvatarImage src="/avatar-placeholder.png" />
                                    <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                                        {role === 'admin' ? 'AD' : role === 'doctor' ? 'DR' : 'PA'}
                                    </AvatarFallback>
                                </Avatar>
                                <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-lg">
                                    <Camera className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="mt-20 px-6 pb-6">
                            <h3 className="text-xl font-bold text-foreground">
                                {role === 'admin' ? 'System Administrator' : role === 'doctor' ? 'Dr. Amina' : 'Kodjo Mensah'}
                            </h3>
                            <p className="text-sm text-muted-foreground capitalize flex items-center gap-1 mt-1">
                                <Shield className="h-3 w-3" /> {role} Account
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Settings Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-2 space-y-6"
                >
                    <Card className="glass-card border-none">
                        <CardHeader>
                            <CardTitle>{t("profile.personal_info")}</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t("profile.name")}</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="name" defaultValue={role === 'doctor' ? 'Amina' : 'Kodjo Mensah'} className="pl-10 bg-background/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t("profile.email")}</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="email" defaultValue={`${role}@malodoc.com`} className="pl-10 bg-background/50" disabled />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">{t("profile.bio")}</Label>
                                <Input id="bio" placeholder="Tell us a little about yourself" className="bg-background/50" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">{t("profile.location")}</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="location" defaultValue="Lomé, Togo" className="pl-10 bg-background/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="phone" defaultValue="+228 90 00 00 00" className="pl-10 bg-background/50" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button variant="ghost">Cancel</Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> {t("profile.save")}</>}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
