"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Video, FolderHeart, Settings, LogOut, X } from "lucide-react";
import { useAdminContext } from "./AdminContext";

export default function Sidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, setIsSidebarOpen } = useAdminContext();

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Blog Posts", href: "/admin/blogs", icon: FileText },
        { name: "Videos", href: "/admin/videos", icon: Video },
        { name: "Projects", href: "/admin/projects", icon: FolderHeart },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-neutral-200 bg-white transition-transform duration-300 dark:border-neutral-800 dark:bg-black ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                <div className="flex h-full flex-col px-4 py-8">
                    {/* Logo Area */}
                    <div className="mb-10 px-2">
                        <Link href="/" className="font-oswald text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            CHIRAA<span className="text-[#FF0000]">.</span>
                        </Link>
                        <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Admin Panel</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                                        ? "bg-[#FF0000] text-white shadow-md shadow-red-500/20"
                                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
                                        }`}
                                >
                                    <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-neutral-400"}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="mt-auto space-y-2 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white">
                            <Settings className="h-5 w-5 text-neutral-400" />
                            Settings
                        </button>
                        <button onClick={() => { sessionStorage.removeItem("adminAuth"); window.location.href = "/admin/login"; }} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-600 transition-colors hover:text-[#FF0000] dark:text-neutral-400 dark:hover:text-[#FF0000]">
                            <LogOut className="h-5 w-5 text-neutral-400 group-hover:text-[#FF0000]" />
                            Exit Application
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
