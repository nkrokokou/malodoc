"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, Star } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function SolidarityPage() {
    const { t } = useLanguage()

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground glow-text">{t("solidarity.title")}</h2>
                    <p className="text-muted-foreground">{t("solidarity.desc")}</p>
                </div>
                <Button className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20">
                    <Heart className="mr-2 h-4 w-4" /> {t("solidarity.donate")}
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Doctor Card 1 - Free */}
                <Card className="glass-card border-border/50 group hover:bg-accent/50 transition-all">
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-zinc-800 border border-border overflow-hidden">
                                {/* Avatar placeholder */}
                                <div className="h-full w-full bg-gradient-to-br from-purple-500 to-indigo-500"></div>
                            </div>
                            <div>
                                <CardTitle className="text-lg text-foreground">Dr. Amina Diop</CardTitle>
                                <CardDescription className="text-muted-foreground">Pediatre • CHU Sylvanus Olympio</CardDescription>
                            </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/50">{t("solidarity.free")}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-1 text-yellow-500 text-xs">
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-muted-foreground ml-1">(42 {t("solidarity.reviews")})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Available for community consultation every Wednesday morning at CHU Sylvanus Olympio.
                        </p>
                        <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary">
                            <Calendar className="mr-2 h-4 w-4" /> {t("solidarity.book_free")}
                        </Button>
                    </CardContent>
                </Card>

                {/* Doctor Card 2 - Reduced */}
                <Card className="glass-card border-border/50 group hover:bg-accent/50 transition-all">
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-zinc-800 border border-border overflow-hidden">
                                {/* Avatar placeholder */}
                                <div className="h-full w-full bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                            </div>
                            <div>
                                <CardTitle className="text-lg text-foreground">Dr. Koffi Mensah</CardTitle>
                                <CardDescription className="text-muted-foreground">Cardiologue • Clinique Biasa</CardDescription>
                            </div>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">{t("solidarity.reduced")}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-1 text-yellow-500 text-xs">
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3" />
                            <span className="text-muted-foreground ml-1">(18 {t("solidarity.reviews")})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Special rate for students and low-income patients at Clinique Biasa.
                        </p>
                        <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary">
                            <Calendar className="mr-2 h-4 w-4" /> {t("solidarity.book_reduced")}
                        </Button>
                    </CardContent>
                </Card>

                {/* Doctor Card 3 - Free */}
                <Card className="glass-card border-border/50 group hover:bg-accent/50 transition-all">
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-zinc-800 border border-border overflow-hidden">
                                {/* Avatar placeholder */}
                                <div className="h-full w-full bg-gradient-to-br from-pink-500 to-rose-500"></div>
                            </div>
                            <div>
                                <CardTitle className="text-lg text-foreground">Dr. Sarah Yacé</CardTitle>
                                <CardDescription className="text-muted-foreground">Généraliste • CMS Adidogomé</CardDescription>
                            </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/50">{t("solidarity.free")}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-1 text-yellow-500 text-xs">
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-muted-foreground ml-1">(120 {t("solidarity.reviews")})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Volunteering for "Solidarity Health Week" at Centre Médico-Social d'Adidogomé.
                        </p>
                        <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary">
                            <Calendar className="mr-2 h-4 w-4" /> {t("solidarity.book_free")}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
