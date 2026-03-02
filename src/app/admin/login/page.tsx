"use client";

import { useState } from "react";
import { ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "PortChira@022004";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        setTimeout(() => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                sessionStorage.setItem("admin_auth", "true");
                router.push("/admin");
            } else {
                setError("Invalid email or password. Please try again.");
            }
            setIsLoading(false);
        }, 600);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 font-poppins dark:bg-[#0a0a0a]">
            <div className="w-full max-w-md space-y-8 rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl dark:border-neutral-800 dark:bg-[#111] sm:p-10 fade-in">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-block font-oswald text-4xl font-bold tracking-tight text-neutral-900 dark:text-white transition-opacity hover:opacity-80">
                        CHIRAA<span className="text-[#FF0000]">.</span>
                    </Link>
                    <h2 className="mt-6 text-xl font-semibold text-neutral-900 dark:text-white">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-neutral-500">
                        Sign in to your admin dashboard.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-900 dark:text-white">Email Address</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <Mail className="h-5 w-5 text-neutral-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl border border-neutral-300 bg-neutral-50 py-3 pl-11 pr-4 text-sm text-neutral-900 transition-colors focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-900 dark:text-white">Password</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <Lock className="h-5 w-5 text-neutral-400" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-neutral-300 bg-neutral-50 py-3 pl-11 pr-4 text-sm text-neutral-900 transition-colors focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative flex w-full justify-center rounded-xl bg-[#FF0000] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:bg-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70 dark:hover:bg-neutral-800"
                    >
                        {isLoading ? (
                            "Signing in..."
                        ) : (
                            <span className="flex items-center gap-2">
                                Sign in
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
