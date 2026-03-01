"use client";

import type { ReactNode } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { usePathname } from "next/navigation";


export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-neutral-50 font-poppins text-neutral-900 selection:bg-neutral-900 selection:text-white dark:bg-[#0a0a0a] dark:text-white dark:selection:bg-white dark:selection:text-black">
                {children}
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-neutral-50 font-poppins text-neutral-900 selection:bg-neutral-900 selection:text-white dark:bg-[#0a0a0a] dark:text-white dark:selection:bg-white dark:selection:text-black">
            {/* Sidebar component - fixed on desktop */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex flex-1 flex-col md:pl-64">
                <Topbar />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
