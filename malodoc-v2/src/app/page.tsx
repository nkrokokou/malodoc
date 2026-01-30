"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, Calendar, Activity, Pill } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden selection:bg-secondary selection:text-black">

      {/* Floating Nano-Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-8 border border-white/10 bg-black/30 backdrop-blur-md">
          <Link href="/" className="font-bold text-xl tracking-tighter text-white">Malodoc</Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
          </div>
          <Link href="/auth/login">
            <Button size="sm" className="rounded-full bg-white text-black hover:bg-zinc-200 h-8 px-4 font-semibold">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        {/* Immersive Hero Section */}
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] animate-pulse"></div>
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 brightness-150 contrast-150"></div>
          </div>

          <div className="relative z-10 container px-4 md:px-6 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400 backdrop-blur-md mb-4">
                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
                The Future of Healthcare is Here
              </div>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-4">
                Health without <br /> Boundaries.
              </h1>
              <p className="mx-auto max-w-[600px] text-zinc-400 md:text-xl">
                Connect with elite professionals, access solidarity slots, and manage your health with an interface designed for the future.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex gap-4"
            >
              <Button asChild size="lg" className="rounded-full h-12 px-8 bg-secondary text-black hover:bg-secondary/90 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105">
                <Link href="/auth/register">
                  Start Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8 border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-105">
                <Link href="/auth/login">
                  Access Dashboard
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="w-full py-24 bg-black relative z-10">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Engineered for Humans</h2>
              <p className="text-zinc-400">Experience a platform that cares as much as you do.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Large Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="md:col-span-2 glass-card p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Calendar className="w-48 h-48 text-primary" />
                </div>
                <div>
                  <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Smart Scheduling</h3>
                  <p className="text-zinc-400 max-w-sm">Use our solidarity slots engine to find free consultations when you need them most.</p>
                </div>
              </motion.div>

              {/* Tall Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="md:row-span-2 glass-card p-8 flex flex-col min-h-[300px] relative overflow-hidden group"
              >
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/30 transition-all"></div>
                <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 text-secondary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Verified Trust</h3>
                <p className="text-zinc-400 mb-6">Every professional is rigorously vetted manually.</p>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div> Doctors
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div> Pharmacies
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div> Donors
                  </div>
                </div>
              </motion.div>

              {/* Small Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-8"
              >
                <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center mb-4 text-red-400">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Donations</h3>
                <p className="text-sm text-zinc-400 mt-2">Fund care for others directly.</p>
              </motion.div>

              {/* Small Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-8"
              >
                <div className="h-10 w-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 text-orange-400">
                  <Pill className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Pharmacy Map</h3>
                <p className="text-sm text-zinc-400 mt-2">Find medicines in real-time.</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 w-full shrink-0 border-t border-white/5 bg-black text-center relative z-10">
        <p className="text-xs text-zinc-600">© 2026 Malodoc. Crafted for the future.</p>
      </footer>
    </div>
  )
}
