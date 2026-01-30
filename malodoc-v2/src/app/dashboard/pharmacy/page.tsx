"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Upload, Pill, CheckCircle2, XCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function PharmacyPage() {
    const { t } = useLanguage()

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">{t("pharmacy.title")}</h2>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Search & Map Section */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="glass-card border-border/50">
                        <CardHeader>
                            <CardTitle className="text-foreground">{t("pharmacy.search_title")}</CardTitle>
                            <CardDescription className="text-muted-foreground">{t("pharmacy.search_desc")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input placeholder={t("pharmacy.search_placeholder")} className="bg-accent/50 border-input text-foreground" />
                                <Button className="bg-primary"><Search className="h-4 w-4 mr-2" /> {t("pharmacy.search_btn")}</Button>
                            </div>

                            {/* Mock Results - REAL DATA LOME */}
                            <div className="space-y-2">
                                <div className="p-3 rounded-lg bg-card/50 border border-border/50 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                            <Pill className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">Pharmacie du Grand Marché</h4>
                                            <p className="text-xs text-muted-foreground flex items-center"><MapPin className="h-3 w-3 mr-1" /> 0.8km • Assigamé, Lomé</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/50">
                                        <CheckCircle2 className="h-3 w-3 mr-1" /> {t("pharmacy.in_stock")}
                                    </Badge>
                                </div>

                                <div className="p-3 rounded-lg bg-card/50 border border-border/50 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                            <Pill className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">Pharmacie des Oliviers</h4>
                                            <p className="text-xs text-muted-foreground flex items-center"><MapPin className="h-3 w-3 mr-1" /> 2.1km • Tokoin Habitat</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/50">
                                        <CheckCircle2 className="h-3 w-3 mr-1" /> {t("pharmacy.in_stock")}
                                    </Badge>
                                </div>

                                <div className="p-3 rounded-lg bg-card/50 border border-border/50 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                                            <Pill className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">Pharmacie de la Nation</h4>
                                            <p className="text-xs text-muted-foreground flex items-center"><MapPin className="h-3 w-3 mr-1" /> 4.5km • Blvd du 13 Janvier</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/50">
                                        <XCircle className="h-3 w-3 mr-1" /> {t("pharmacy.out_of_stock")}
                                    </Badge>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="h-64 w-full rounded-xl bg-muted/50 border border-border flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-inner">
                                <div className="absolute inset-0 bg-neutral-900/10 dark:bg-neutral-100/10"></div>
                                {/* Could insert a static map image of Lomé here if available in assets */}
                                <span className="relative z-10 bg-background/80 px-4 py-2 rounded-full text-foreground text-sm font-medium flex items-center shadow-lg">
                                    <MapPin className="h-4 w-4 mr-2 text-primary" /> {t("pharmacy.view_map")}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Upload Prescription */}
                <div>
                    <Card className="glass-card border-border/50 h-full">
                        <CardHeader>
                            <CardTitle className="text-foreground">{t("pharmacy.quick_order")}</CardTitle>
                            <CardDescription className="text-muted-foreground">{t("pharmacy.upload_desc")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="border-2 border-dashed border-border/50 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-colors cursor-pointer group">
                                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="h-6 w-6" />
                                </div>
                                <h4 className="font-medium text-foreground mb-1">{t("pharmacy.click_upload")}</h4>
                                <p className="text-xs text-muted-foreground">{t("pharmacy.upload_formats")}</p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-xs text-muted-foreground">
                                    {t("pharmacy.disclaimer")}
                                </p>
                                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md shadow-secondary/20">
                                    {t("pharmacy.send_btn")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
