"use client"

import * as React from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, User, Stethoscope, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function LoginPage() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState("patient")
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "patient@malodoc.com", // Default for ease
            password: "password123",
        },
    })

    // Auto-fill credentials based on role (Demo Feature)
    React.useEffect(() => {
        if (activeTab === 'patient') {
            form.setValue('email', 'patient@malodoc.com')
        } else if (activeTab === 'doctor') {
            form.setValue('email', 'doctor@malodoc.com')
        } else if (activeTab === 'admin') {
            form.setValue('email', 'admin@malodoc.com')
        }
    }, [activeTab, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        const result = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })

        setIsLoading(false)

        if (result?.error) {
            alert("Invalid credentials. Please try again.")
        } else {
            router.push("/dashboard")
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        try {
            await signIn("google", { callbackUrl: "/dashboard" })
        } catch (error) {
            console.error(error)
            alert("Google Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-6 w-full max-w-md mx-auto">
            <div className="flex flex-col space-y-2 text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white glow-text">Malodoc Access</h1>
                <p className="text-sm text-zinc-400">
                    Select your portal and sign in.
                </p>
            </div>

            <Tabs defaultValue="patient" onValueChange={setActiveTab} className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
                    <TabsTrigger value="patient" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                        <User className="w-4 h-4 mr-2" /> Patient
                    </TabsTrigger>
                    <TabsTrigger value="doctor" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                        <Stethoscope className="w-4 h-4 mr-2" /> Doctor
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                        <ShieldCheck className="w-4 h-4 mr-2" /> Admin
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-300">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name@example.com"
                                        {...field}
                                        className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-300">Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        {...field}
                                        className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className={`w-full font-semibold transition-colors
                            ${activeTab === 'doctor' ? 'bg-blue-600 hover:bg-blue-700' :
                                activeTab === 'admin' ? 'bg-purple-600 hover:bg-purple-700' :
                                    'bg-primary hover:bg-primary/90'}
                        `}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Access {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Portal
                    </Button>
                </form>
            </Form>

            <div className="flex items-center gap-4 my-6">
                <Separator className="flex-1 bg-white/10" />
                <span className="text-xs text-zinc-500">OR</span>
                <Separator className="flex-1 bg-white/10" />
            </div>

            <Button variant="outline" className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white" onClick={handleGoogleLogin} disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" fill="currentColor" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                )}
                Continue with Google
            </Button>

            <p className="px-8 text-center text-sm text-zinc-500 mt-6">
                Don't have an account?{" "}
                <Link href="/auth/register" className="underline underline-offset-4 hover:text-white transition-colors">
                    Sign up
                </Link>
            </p>
        </div>
    )
}
