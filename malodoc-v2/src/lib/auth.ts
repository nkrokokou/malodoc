import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: "patient" // Default role for Google Login
                }
            }
        }),
        CredentialsProvider({
            name: "Malodoc Identity",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "text" } // We will pass role from the login form
            },
            async authorize(credentials) {
                // Mock users for demo
                const users = [
                    {
                        id: "demo-patient-1",
                        name: "Kodjo Mensah",
                        email: "patient@malodoc.com",
                        password: "password123",
                        role: "patient",
                        image: ""
                    },
                    {
                        id: "demo-doctor-1",
                        name: "Dr. Amina Diop",
                        email: "doctor@malodoc.com",
                        password: "password123",
                        role: "doctor",
                        image: ""
                    },
                    {
                        id: "demo-admin-1",
                        name: "Admin User",
                        email: "admin@malodoc.com",
                        password: "password123",
                        role: "admin",
                        image: ""
                    }
                ]

                const user = users.find(u => u.email === credentials?.email && u.password === credentials?.password)

                if (user) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role, // Pass the role from the user object
                        image: user.image
                    }
                }

                return null
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
                session.user.role = (token.role as string) || "patient"
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                token.role = (user as any).role
            }
            return token
        }
    },
    pages: {
        signIn: "/auth/login",
    },
}
