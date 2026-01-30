"use client"

import { useState } from "react"
import { Save, Globe, Lock, Bell, Moon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AdminSettingsPage() {
    const { t } = useLanguage()
    const [maintenanceMode, setMaintenanceMode] = useState(false)

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">{t("admin.settings")}</h2>
                <p className="text-muted-foreground">Configure global system parameters.</p>
            </div>

            <Card className="glass-card border-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" /> General Configuration
                    </CardTitle>
                    <CardDescription>Basic system settings and availability.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Maintenance Mode</Label>
                            <p className="text-sm text-muted-foreground">Disable access for non-admin users.</p>
                        </div>
                        <Switch
                            checked={maintenanceMode}
                            onCheckedChange={setMaintenanceMode}
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Public Registration</Label>
                            <p className="text-sm text-muted-foreground">Allow new users to sign up.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card className="glass-card border-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary" /> Security & Access
                    </CardTitle>
                    <CardDescription>Manage security protocols.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Two-Factor Authentication (2FA)</Label>
                            <p className="text-sm text-muted-foreground">Enforce 2FA for all doctor/admin accounts.</p>
                        </div>
                        <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Session Timeout</Label>
                            <p className="text-sm text-muted-foreground">Auto-logout after 30 minutes of inactivity.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>
                    <Save className="mr-2 h-4 w-4" /> Save Configuration
                </Button>
            </div>
        </div>
    )
}
