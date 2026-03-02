"use client";

import { useEffect, useState } from "react";
import { Video, Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface VideoData {
    id: string;
    title: string;
    platform: string;
    link: string;
    thumbnail: string;
    views: string;
    date: string;
}

export default function VideosAdminPage() {
    const [videos, setVideos] = useState<VideoData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchVideos = async () => {
        try {
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            const res = await fetch(`${baseUrl}/api/videos?t=${Date.now()}`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to load");
            const data = await res.json();
            setVideos(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this video?")) return;

        try {
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            await fetch(`${baseUrl}/api/videos/${id}`, {
                method: "DELETE",
            });
            setVideos(videos.filter(v => v.id !== id));
        } catch (err) {
            console.error("Failed to delete", err);
            alert("Failed to delete video");
        }
    };

    return (
        <div className="space-y-8 fade-in">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-oswald text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                        Videos
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Manage your social media video links to display on the portfolio.
                    </p>
                </div>
                <Link href="/admin/videos/new" className="flex items-center gap-2 rounded-xl bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:bg-black dark:hover:bg-neutral-800">
                    <Plus className="h-4 w-4" />
                    Add Video
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
                            placeholder="Search videos..."
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
                    ) : videos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center text-neutral-500">
                            <Video className="h-12 w-12 text-neutral-300 dark:text-neutral-700 mb-4" />
                            <p>No videos found. Add your first one!</p>
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
                            <thead className="border-b border-neutral-200 bg-neutral-50/50 text-xs uppercase text-neutral-700 dark:border-neutral-800 dark:bg-black/50 dark:text-neutral-300">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Video Details</th>
                                    <th className="px-6 py-4 font-medium">Platform</th>
                                    <th className="px-6 py-4 font-medium">Date Added</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                {videos.map((video) => (
                                    <tr key={video.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                                        <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white flex items-center gap-4">
                                            <div className="h-12 w-20 rounded-md bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative flex-shrink-0">
                                                {video.thumbnail ? (
                                                    <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
                                                        <Video className="h-4 w-4 text-neutral-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="truncate w-48 font-medium">{video.title}</div>
                                                <div className="text-xs font-normal text-neutral-500 truncate w-48"><a href={video.link} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-500">{video.link}</a></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                                {video.platform}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{new Date(video.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleDelete(video.id)} title="Delete" className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-[#FF0000] dark:hover:bg-neutral-800 dark:hover:text-[#FF0000]">
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
