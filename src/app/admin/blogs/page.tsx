"use client";

import { FileText, Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

const blogPosts = [
    { id: 1, title: "The Anatomy of a High-Converting Landing Page", category: "UI/UX Design", date: "March 12, 2026", views: "1.2k", status: "Published" },
    { id: 2, title: "Why Next.js App Router is a Game Changer", category: "Web Engineering", date: "February 28, 2026", views: "3.4k", status: "Published" },
    { id: 3, title: "Mastering Animations with Framer Motion", category: "Frontend Design", date: "January 14, 2026", views: "856", status: "Published" },
    { id: 4, title: "The Psychology of Color in Digital Interface", category: "Design Systems", date: "December 05, 2025", views: "-", status: "Draft" },
];

export default function BlogsAdminPage() {
    return (
        <div className="space-y-8 fade-in">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-oswald text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                        Blog Posts
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Manage your blog posts, drafts, and categories.
                    </p>
                </div>
                <Link href="/admin/blogs/new" className="flex items-center gap-2 rounded-xl bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:bg-black dark:hover:bg-neutral-800">
                    <Plus className="h-4 w-4" />
                    New Post
                </Link>
            </div>

            {/* List Section */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#111] overflow-hidden">
                {/* Search & Filters */}
                <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800 gap-4">
                    <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <Search className="h-4 w-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
                        <thead className="border-b border-neutral-200 bg-neutral-50/50 text-xs uppercase text-neutral-700 dark:border-neutral-800 dark:bg-black/50 dark:text-neutral-300">
                            <tr>
                                <th className="px-6 py-4 font-medium">Post Title</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {blogPosts.map((post) => (
                                <tr key={post.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white flex items-center gap-3">
                                        <div className="h-8 w-8 rounded bg-red-50 text-[#FF0000] flex items-center justify-center dark:bg-neutral-800 dark:text-neutral-400">
                                            <FileText className="h-4 w-4" />
                                        </div>
                                        {post.title}
                                    </td>
                                    <td className="px-6 py-4">{post.category}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${post.status === 'Published'
                                            ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400'
                                            : 'bg-neutral-100 text-neutral-600 ring-1 ring-inset ring-neutral-500/20 dark:bg-neutral-800 dark:text-neutral-400'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{post.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button title="Edit" className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-blue-600 dark:hover:bg-neutral-800 dark:hover:text-blue-400">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button title="Delete" className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-[#FF0000] dark:hover:bg-neutral-800 dark:hover:text-[#FF0000]">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
