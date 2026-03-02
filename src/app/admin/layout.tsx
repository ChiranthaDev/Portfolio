"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { usePathname, useRouter } from "next/navigation";
import { AdminProvider } from "../../components/admin/AdminContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === "/admin/login";
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        if (!isLoginPage) {
            const auth = sessionStorage.getItem("admin_auth");
            if (auth !== "true") {
                router.replace("/admin/login");
            } else {
                setIsAuthed(true);
            }
        }
    }, [isLoginPage, router]);

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-neutral-50 font-poppins text-neutral-900 selection:bg-neutral-900 selection:text-white dark:bg-[#0a0a0a] dark:text-white dark:selection:bg-white dark:selection:text-black">
                {children}
            </div>
        );
    }

    if (!isAuthed) {
        return null; // Show nothing while redirecting
    }

    return (
        <AdminProvider>
            <div className="flex min-h-screen bg-neutral-50 font-poppins text-neutral-900 selection:bg-neutral-900 selection:text-white dark:bg-[#0a0a0a] dark:text-white dark:selection:bg-white dark:selection:text-black">
                {/* Sidebar component - fixed on desktop */}
                <Sidebar />

                {/* Main content area */}
                <div className="flex flex-1 flex-col md:pl-64">
                    <Topbar />
                    <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </AdminProvider>
    );
}
