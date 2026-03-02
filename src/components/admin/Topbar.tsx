"use client";

import { Bell, LogOut, Search, User, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminContext } from "./AdminContext";

export default function Topbar() {
    const router = useRouter();
    const { toggleSidebar } = useAdminContext();

    const handleLogout = () => {
        sessionStorage.removeItem("admin_auth");
        router.push("/admin/login");
    };

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-neutral-200 bg-white/80 px-4 md:px-8 backdrop-blur-md dark:border-neutral-800 dark:bg-black/80">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 -ml-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Search Bar - hidden on very small screens */}
                <div className="hidden sm:flex w-full max-w-sm items-center gap-3 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900/50">
                    <Search className="h-5 w-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <button className="relative text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    <Bell className="h-6 w-6" />
                    <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-[#FF0000] ring-2 ring-white dark:ring-black"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-neutral-200 dark:border-neutral-800">
                    <div className="flex flex-col text-right">
                        <span className="text-sm font-semibold text-neutral-900 dark:text-white">Chiraa</span>
                        <span className="text-xs text-neutral-500">Super Admin</span>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                        <User className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                    </div>
                    <button
                        onClick={handleLogout}
                        title="Logout"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-red-100 hover:text-[#FF0000] dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
