"use client";

import Image from "next/image";
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
                    <div className="flex items-center gap-2 px-8 py-4">
                        <Link href="/" aria-label="Admin">
                            <Image src="/img/logo.png" alt="Logo" width={32} height={42} className="h-10 w-auto" />
                        </Link>
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
                </div>
            </aside>
        </>
    );
}
