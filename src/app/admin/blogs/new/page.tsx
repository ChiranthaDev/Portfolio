"use client";

import { FileText, ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewBlogPostPage() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [linkedinLink, setLinkedinLink] = useState("");

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock save action
        console.log("Saved blog post", { title, category, linkedinLink });
        alert("Blog post saved successfully! (Mock Action)");
    };

    return (
        <div className="space-y-8 fade-in max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blogs
                    </Link>
                    <h1 className="font-oswald text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                        Write New Blog Post
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800">
                        Save as Draft
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:bg-black dark:hover:bg-neutral-800">
                        <Save className="h-4 w-4" />
                        Publish Post
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
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white">Post Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter post title"
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Web Engineering">Web Engineering</option>
                                    <option value="Frontend Design">Frontend Design</option>
                                    <option value="Design Systems">Design Systems</option>
                                </select>
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-900 dark:text-white">Cover Image</label>
                            <button type="button" className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-12 text-sm font-medium text-neutral-500 transition-colors hover:border-[#FF0000] hover:bg-red-50 hover:text-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-[#FF0000] dark:hover:bg-red-500/10">
                                <ImageIcon className="h-6 w-6" />
                                Click to upload image cover
                            </button>
                        </div>

                        {/* LinkedIn Link */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-900 dark:text-white">LinkedIn Post Link</label>
                            <input
                                type="url"
                                value={linkedinLink}
                                onChange={(e) => setLinkedinLink(e.target.value)}
                                placeholder="https://www.linkedin.com/posts/..."
                                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                required
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
