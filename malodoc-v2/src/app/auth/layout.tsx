export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen w-full bg-black">
            {/* Left Side - Abstract Art */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black items-center justify-center">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-primary/20 blur-[150px] animate-aurora"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-secondary/10 blur-[150px] animate-aurora"></div>

                <div className="relative z-10 p-12 text-center animate-float">
                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-10 w-10 text-white"
                        >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter text-white mb-4">Malodoc</h1>
                    <p className="text-zinc-400 text-lg max-w-md mx-auto">
                        Experience the next generation of healthcare management. Secure, fast, and beautiful.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[100px] animate-pulse"></div>
                </div>
                <div className="w-full max-w-[420px] relative z-10 glass-card p-1">
                    {children}
                </div>
            </div>
        </div>
    )
}
