"use client";

import { Video, ArrowLeft, Save, Link as LinkIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function NewVideoPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [link, setLink] = useState("");

    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
        const res = await fetch(`${baseUrl}/api/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        return data.url;
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !platform || !link) return alert("Please fill all required fields");

        setIsSubmitting(true);
        try {
            let thumbnailUrl = "";

            if (thumbnailFile) {
                thumbnailUrl = await uploadImage(thumbnailFile);
            }

            const videoData = {
                title,
                platform,
                link,
                thumbnail: thumbnailUrl,
            };

            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            const res = await fetch(`${baseUrl}/api/videos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(videoData)
            });

            if (!res.ok) throw new Error("Failed to save video");

            router.push('/admin/videos');
        } catch (err) {
            console.error(err);
            alert("An error occurred while saving.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 fade-in max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Link href="/admin/videos" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Videos
                    </Link>
                    <h1 className="font-oswald text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                        Add New Video
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/videos" className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800">
                        Cancel
                    </Link>
                    <button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-xl bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:bg-black dark:hover:bg-neutral-800 disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isSubmitting ? 'Saving...' : 'Save Video'}
                    </button>
                </div>
            </div>

            {/* Form Section */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#111] overflow-hidden">
                <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
                    {/* General Info */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-900 dark:text-white">Video Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. How I Design My UI Kits"
                                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                required
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white">Platform</label>
                                <select
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                    required
                                >
                                    <option value="" disabled>Select platform</option>
                                    <option value="YouTube">YouTube</option>
                                    <option value="TikTok">TikTok</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Instagram">Instagram</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white">Video Link / URL</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <LinkIcon className="h-4 w-4 text-neutral-400" />
                                    </div>
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder="https://youtube.com/watch?v=..."
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Upload  */}
                        <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                            <label className="text-sm font-semibold text-neutral-900 dark:text-white flex justify-between">
                                Custom Thumbnail
                                <span className="text-xs text-neutral-500 font-normal">Optional</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-10 text-sm font-medium text-neutral-500 transition-colors hover:border-[#FF0000] hover:bg-red-50 hover:text-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-[#FF0000] dark:hover:bg-red-500/10"
                            >
                                {thumbnailFile ? (
                                    <span className="text-[#FF0000] font-semibold">{thumbnailFile.name}</span>
                                ) : (
                                    <>
                                        <Video className="h-6 w-6" />
                                        <span>Click to upload local thumbnail</span>
                                        <span className="text-xs font-normal text-neutral-400">If skipping, thumbnail will be fetched via URL.</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
