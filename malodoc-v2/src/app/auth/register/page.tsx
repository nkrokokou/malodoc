"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function RegisterPage() {
    const [isLoading, setIsLoading] = React.useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        // TODO: Implement credential registration
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: "Success",
                description: "Account created successfully. Please sign in.",
            })
        }, 1000)
    }

    return (
        <div className="p-6">
            <div className="flex flex-col space-y-2 text-center mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-white">Create an account</h1>
                <p className="text-sm text-zinc-400">
                    Enter your information to create your Malodoc account
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-300">Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-300">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="m@example.com" {...field} className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50" />
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
                                    <Input type="password" placeholder="••••••••" autoComplete="new-password" {...field} className="bg-black/20 border-white/10 text-white placeholder:text-zinc-600 focus:border-primary/50" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full bg-white text-black hover:bg-zinc-200 font-semibold" type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                    </Button>
                </form>
            </Form>

            <p className="px-8 text-center text-sm text-zinc-500 mt-6">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline underline-offset-4 hover:text-white transition-colors">
                    Sign in
                </Link>
            </p>
        </div>
    )
}
