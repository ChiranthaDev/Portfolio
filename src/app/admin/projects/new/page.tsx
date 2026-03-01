"use client";

import { FolderHeart, ArrowLeft, Save, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewProjectPage() {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [role, setRole] = useState("");
    const [link, setLink] = useState("");

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock save action
        console.log("Saved project", { title, type, role, link });
        alert("Project created successfully! (Mock Action)");
    };

    return (
        <div className="space-y-8 fade-in max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Projects
                    </Link>
                    <h1 className="font-oswald text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                        Create New Project
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/projects" className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800">
                        Cancel
                    </Link>
                    <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:bg-black dark:hover:bg-neutral-800">
                        <Save className="h-4 w-4" />
                        Save Project
                    </button>
                </div>
            </div>

            {/* Form Section */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#111] overflow-hidden">
                <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
                    {/* General Info */}
                    <div className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white">Project Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Qordex Re-design"
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white">Project Type</label>
                                <input
                                    type="text"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    placeholder="e.g. UI/UX Design, Web App"
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white">Portfolio Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                    required
                                >
                                    <option value="" disabled>Select role page</option>
                                    <option value="Designer">Show on Designer Page</option>
                                    <option value="Developer">Show on Developer Page</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white">Live URL</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <LinkIcon className="h-4 w-4 text-neutral-400" />
                                    </div>
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Cover Image Upload  */}
                        <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white flex justify-between">
                                    Main Cover Image
                                </label>
                                <button type="button" className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-12 text-sm font-medium text-neutral-500 transition-colors hover:border-[#FF0000] hover:bg-red-50 hover:text-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-[#FF0000] dark:hover:bg-red-500/10">
                                    <ImageIcon className="h-8 w-8 text-neutral-400" />
                                    <span>Click to upload display image</span>
                                    <span className="text-xs font-normal text-neutral-400">1920x1080px recommended. Max 5MB.</span>
                                </button>
                            </div>

                            {/* Additional Images */}
                            <div className="space-y-2 pt-2">
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white flex justify-between">
                                    Additional Images (Optional)
                                    <span className="text-xs font-normal text-neutral-500">Up to 3 images</span>
                                </label>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    {[1, 2, 3].map((num) => (
                                        <button key={num} type="button" className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-8 text-sm font-medium text-neutral-500 transition-colors hover:border-[#FF0000] hover:bg-red-50 hover:text-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-[#FF0000] dark:hover:bg-red-500/10">
                                            <ImageIcon className="h-6 w-6 text-neutral-400" />
                                            <span>Image {num}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
