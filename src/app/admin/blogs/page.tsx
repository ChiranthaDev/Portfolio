"use client";

import { useEffect, useState } from "react";
import { FileText, Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
    id: string;
    title: string;
    linkedinLink: string;
    coverImage: string;
    status: string;
    views: string;
    date: string;
}

export default function BlogsAdminPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            const res = await fetch(`${baseUrl}/api/blogs?t=${Date.now()}`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to load");
            const data = await res.json();
            setBlogs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;

        try {
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            await fetch(`${baseUrl}/api/blogs/${id}`, {
                method: "DELETE",
            });
            setBlogs(blogs.filter(b => b.id !== id));
        } catch (err) {
            console.error("Failed to delete", err);
            alert("Failed to delete blog");
        }
    };

    return (
        <div className="space-y-8 fade-in">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-oswald text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                        Blog Posts
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">

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
                <div className="overflow-x-auto min-h-[300px]">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center text-neutral-500">
                            <FileText className="h-12 w-12 text-neutral-300 dark:text-neutral-700 mb-4" />
                            <p>No blog posts found. Write your first one!</p>
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
                            <thead className="border-b border-neutral-200 bg-neutral-50/50 text-xs uppercase text-neutral-700 dark:border-neutral-800 dark:bg-black/50 dark:text-neutral-300">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Post Title</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                {blogs.map((post) => (
                                    <tr key={post.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                                        <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-md bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative flex-shrink-0">
                                                {post.coverImage ? (
                                                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 bg-red-50 text-[#FF0000] dark:bg-neutral-800 dark:text-neutral-400 flex items-center justify-center">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="truncate w-48 font-medium">{post.title}</div>
                                                <div className="text-xs font-normal text-neutral-500 truncate w-48"><a href={post.linkedinLink} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-500">{post.linkedinLink}</a></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${post.status === 'Published'
                                                ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400'
                                                : 'bg-neutral-100 text-neutral-600 ring-1 ring-inset ring-neutral-500/20 dark:bg-neutral-800 dark:text-neutral-400'
                                                }`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{new Date(post.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleDelete(post.id)} title="Delete" className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-[#FF0000] dark:hover:bg-neutral-800 dark:hover:text-[#FF0000]">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
