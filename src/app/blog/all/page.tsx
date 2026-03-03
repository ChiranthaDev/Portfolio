"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import SplitOverlay from "../../../components/SplitOverlay";
import Navbar from "../../../components/Navbar";

interface BlogPost {
    id: string;
    title: string;
    linkedinLink: string;
    coverImage: string;
    status: string;
}

export default function BlogArchivePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to load");
            const data = await res.json();
            // Optional: Filter out drafted posts
            const published = data.filter((p: BlogPost) => p.status !== 'Draft');
            setBlogPosts(published);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Helper to format date if needed, fallback for mock UI
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-200 selection:bg-neutral-900 selection:text-white transition-colors duration-300">
            <SplitOverlay />
            <Navbar />

            <main className="mx-auto max-w-6xl px-6 pb-32 pt-28 md:pt-36">

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 transition hover:text-[#FF0000] dark:hover:text-[#FF0000]"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Highlights
                    </Link>
                </motion.div>

                {/* Header content */}
                <section className="mb-20 space-y-6 text-center md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="inline-block rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 shadow-sm"
                    >
                        Archive
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-oswald text-[clamp(44px,8vw,80px)] font-bold leading-[1.05] tracking-tight text-neutral-900 dark:text-white"
                    >
                        All <span className="text-[#FF0000]">Articles</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mx-auto max-w-2xl text-lg text-neutral-500 dark:text-neutral-400 mb-8"
                    >
                        Browse through the complete collection of insights on design, frontend development, and creating next-generation web experiences.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mx-auto max-w-xl relative"
                    >
                        <input
                            type="text"
                            placeholder="Search articles by title or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 py-4 text-sm outline-none transition-shadow focus:border-neutral-400 focus:shadow-sm dark:focus:border-neutral-600 dark:text-white"
                        />
                        <svg className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </motion.div>
                </section>

                {/* Blog Grid */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {isLoading ? (
                        <div className="flex w-full items-center justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-neutral-300" />
                        </div>
                    ) : (
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <a href={post.linkedinLink} target="_blank" rel="noopener noreferrer" key={post.id} className="group cursor-pointer block">
                                        <article className="flex h-full flex-col p-4 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-3xl transition-colors">
                                            <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-800">
                                                {post.coverImage && (
                                                    <Image
                                                        src={post.coverImage}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-[#FF0000] mb-3">
                                                <span>Article</span>
                                            </div>
                                            <h3 className="font-oswald text-2xl font-bold leading-snug text-neutral-900 dark:text-white transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-300 mb-2 flex-grow">
                                                {post.title}
                                            </h3>
                                            <p className="mt-auto text-sm text-neutral-500 dark:text-neutral-400">{today} • Read on LinkedIn</p>
                                        </article>
                                    </a>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <h3 className="font-oswald text-2xl font-bold text-neutral-900 dark:text-white mb-2">No articles found</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400">We couldn&apos;t find any articles matching &quot;{searchQuery}&quot;.</p>
                                </div>
                            )}
                        </div>
                    )}
                </motion.section>

            </main>
        </div>
    );
}
