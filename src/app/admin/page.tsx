"use client";

import { useState, useEffect } from "react";
import { FolderHeart, FileText, Video, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

const stats = [
    { name: "Total Projects", value: "15", change: "+12%", icon: FolderHeart, href: "/admin/projects" },
    { name: "Active Blogs", value: "4", change: "+2%", icon: FileText, href: "/admin/blogs" },
    { name: "Videos Uploaded", value: "3", change: "+8%", icon: Video, href: "/admin/videos" },
];

const recentActivity = [
    { id: 1, action: "Published new blog post", title: "The Anatomy of a High-Converting Landing Page", date: "2 hours ago", status: "completed" },
    { id: 2, action: "Added new video", title: "How I Design My UI Kits", date: "5 hours ago", status: "completed" },
    { id: 3, action: "Updated project", title: "Qordex Redesign", date: "1 day ago", status: "completed" },
    { id: 4, action: "Draft created", title: "The Psychology of Color", date: "2 days ago", status: "draft" },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState([
        { name: "Total Projects", value: "0", change: "+0%", icon: FolderHeart, href: "/admin/projects" },
        { name: "Active Blogs", value: "0", change: "+0%", icon: FileText, href: "/admin/blogs" },
        { name: "Videos Uploaded", value: "0", change: "+0%", icon: Video, href: "/admin/videos" },
    ]);

    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");

                // Fetch all data in parallel
                const [projectsRes, blogsRes, videosRes] = await Promise.all([
                    fetch(`${baseUrl}/api/projects?t=${Date.now()}`, { cache: 'no-store' }).then(res => res.json()),
                    fetch(`${baseUrl}/api/blogs?t=${Date.now()}`, { cache: 'no-store' }).then(res => res.json()),
                    fetch(`${baseUrl}/api/videos?t=${Date.now()}`, { cache: 'no-store' }).then(res => res.json()),
                ]);

                // Fallbacks in case APIs return error objects
                const projects = Array.isArray(projectsRes) ? projectsRes : [];
                const blogs = Array.isArray(blogsRes) ? blogsRes : [];
                const videos = Array.isArray(videosRes) ? videosRes : [];

                setStats([
                    { name: "Total Projects", value: projects.length.toString(), change: "Latest", icon: FolderHeart, href: "/admin/projects" },
                    { name: "Active Blogs", value: blogs.filter(b => b.status === 'Published').length.toString(), change: "Latest", icon: FileText, href: "/admin/blogs" },
                    { name: "Videos Uploaded", value: videos.length.toString(), change: "Latest", icon: Video, href: "/admin/videos" },
                ]);

                // Map into recent activity timeline
                let allActivities = [
                    ...projects.map(p => ({
                        id: `p-${p.id}`,
                        action: "Created new project",
                        title: p.title,
                        rawDate: new Date(p.date || p.createdAt),
                        status: "completed"
                    })),
                    ...blogs.map(b => ({
                        id: `b-${b.id}`,
                        action: b.status === 'Draft' ? "Drafted blog post" : "Published blog post",
                        title: b.title,
                        rawDate: new Date(b.date || b.createdAt),
                        status: b.status === 'Draft' ? "draft" : "completed"
                    })),
                    ...videos.map(v => ({
                        id: `v-${v.id}`,
                        action: "Added new video",
                        title: v.title,
                        rawDate: new Date(v.date || v.createdAt),
                        status: "completed"
                    }))
                ];

                // Sort by date descending and take top 5
                allActivities.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
                const topActivities = allActivities.slice(0, 5).map(act => ({
                    ...act,
                    date: act.rawDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                }));

                setRecentActivity(topActivities);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-8 fade-in pb-20">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-oswald text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                        Overview
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Welcome back, Chiraa! Here is what&apos;s happening with your portfolio today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/projects/new"
                        className="flex items-center gap-2 rounded-xl bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:bg-black dark:hover:bg-neutral-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add New Project
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat: any) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#111]">
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-[#FF0000] dark:bg-black dark:text-white border dark:border-neutral-800">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                                    <ArrowUpRight className="h-4 w-4" />
                                    {stat.change}
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className="text-sm font-medium text-neutral-500">{stat.name}</p>
                                <p className="mt-1 font-oswald text-4xl font-bold text-neutral-900 dark:text-white">
                                    {isLoading ? "..." : stat.value}
                                </p>
                            </div>
                            <Link href={stat.href} className="absolute inset-0 z-10" aria-label={`View ${stat.name}`} />
                        </div>
                    );
                })}
            </div>

            {/* Dashboard Content */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Recent Activity */}
                <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#111]">
                    <div className="border-b border-neutral-200 p-6 dark:border-neutral-800 flex justify-between items-center">
                        <h2 className="font-oswald text-xl font-bold text-neutral-900 dark:text-white">Recent Activity</h2>
                        <button className="text-sm font-medium text-neutral-500 hover:text-[#FF0000] transition-colors cursor-default">Latest Actions</button>
                    </div>
                    <div className="p-6">
                        {isLoading ? (
                            <div className="py-10 text-center text-sm text-neutral-500 animate-pulse">Loading latest timeline...</div>
                        ) : recentActivity.length === 0 ? (
                            <div className="py-10 text-center text-sm text-neutral-500">No recent activity found.</div>
                        ) : (
                            <div className="space-y-6">
                                {recentActivity.map((activity: any, itemIdx: number) => (
                                    <div key={activity.id} className="relative flex gap-6">
                                        <div className="relative flex flex-col items-center">
                                            {itemIdx !== recentActivity.length - 1 ? (
                                                <div className="absolute top-8 bottom-0 left-1/2 -ml-px w-px bg-neutral-200 dark:bg-neutral-800" />
                                            ) : null}
                                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 ring-4 ring-white dark:bg-neutral-800 dark:ring-[#111]">
                                                <div className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
                                            </div>
                                        </div>
                                        <div className="flex flex-1 items-start justify-between pb-4">
                                            <div>
                                                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                                    {activity.action}
                                                </p>
                                                <p className="mt-1 text-sm text-neutral-500">
                                                    {activity.title}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-neutral-400">{activity.date}</span>
                                                <div className="mt-1">
                                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${activity.status === 'completed'
                                                        ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400'
                                                        : 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400'
                                                        }`}>
                                                        {activity.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#111] h-fit">
                    <div className="border-b border-neutral-200 p-6 dark:border-neutral-800">
                        <h2 className="font-oswald text-xl font-bold text-neutral-900 dark:text-white">Quick Shortcuts</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <Link href="/admin/blogs/new" className="group flex items-center justify-between rounded-xl border border-neutral-200 p-4 transition-all hover:border-[#FF0000] hover:shadow-sm dark:border-neutral-800 dark:hover:border-[#FF0000]">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-black border dark:border-neutral-800 group-hover:text-[#FF0000]">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Write Blog Post</p>
                                    <p className="text-xs text-neutral-500">Draft your thoughts</p>
                                </div>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-[#FF0000]" />
                        </Link>
                        <Link href="/admin/videos/new" className="group flex items-center justify-between rounded-xl border border-neutral-200 p-4 transition-all hover:border-[#FF0000] hover:shadow-sm dark:border-neutral-800 dark:hover:border-[#FF0000]">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-black border dark:border-neutral-800 group-hover:text-[#FF0000]">
                                    <Video className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Add Video</p>
                                    <p className="text-xs text-neutral-500">Link YouTube/TikTok</p>
                                </div>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-[#FF0000]" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
