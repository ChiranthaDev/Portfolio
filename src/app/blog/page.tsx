"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SplitOverlay from "../../components/SplitOverlay";
import Navbar from "../../components/Navbar";
import { Loader2 } from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    category: string;
    linkedinLink: string;
    coverImage: string;
    status: string;
}

interface Video {
    id: string;
    title: string;
    platform: string;
    link: string;
    thumbnail: string;
}

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
    const [isLoadingVideos, setIsLoadingVideos] = useState(true);

    const fetchData = async () => {
        try {
            const [blogsRes, videosRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/blogs`, { cache: 'no-store' }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/videos`, { cache: 'no-store' })
            ]);

            if (blogsRes.ok) {
                const bData = await blogsRes.json();
                setBlogPosts(bData);
            }
            if (videosRes.ok) {
                const vData = await videosRes.json();
                setVideos(vData);
            }
        } catch (err) {
            console.error("Failed to fetch blog or video data", err);
        } finally {
            setIsLoadingBlogs(false);
            setIsLoadingVideos(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Helper to format date if needed, fallback for mock UI
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
            <SplitOverlay />
            <Navbar />

            <main className="mx-auto max-w-6xl px-6 pb-32 pt-28 md:pt-36">
                {/* Header content */}
                <section className="mb-20 space-y-6 md:mb-28 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 shadow-sm"
                    >
                        Insights & Media
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="font-oswald text-[clamp(44px,8vw,88px)] font-bold leading-[1.05] tracking-tight text-neutral-900"
                    >
                        Thoughts, Articles <br />
                        <span className="text-neutral-400">&amp; Content Creation.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mx-auto max-w-2xl text-lg text-neutral-600 md:text-xl"
                    >
                        Dive into my latest write-ups on design, development, and watch my creative process across social platforms.
                    </motion.p>
                </section>

                {/* Blog Posts Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mb-24"
                >
                    <div className="mb-10 flex items-center justify-between border-b border-neutral-200 pb-4">
                        <h2 className="font-oswald text-3xl font-bold text-neutral-900">Latest Articles</h2>
                    </div>

                    {isLoadingBlogs ? (
                        <div className="flex w-full items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-neutral-300" />
                        </div>
                    ) : blogPosts.length === 0 ? (
                        <p className="text-neutral-500 py-8">No articles published yet.</p>
                    ) : (
                        <div className="grid gap-10 md:grid-cols-2">
                            {blogPosts.filter(p => p.status !== 'Draft').slice(0, 4).map((post) => (
                                <a href={post.linkedinLink} target="_blank" rel="noopener noreferrer" key={post.id} className="group cursor-pointer block">
                                    <article>
                                        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
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
                                            <span>{post.category}</span>
                                            <span className="text-neutral-300">•</span>
                                            <span className="text-neutral-500">Read on LinkedIn</span>
                                        </div>
                                        <h3 className="font-oswald text-2xl font-bold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-600 md:text-3xl">
                                            {post.title}
                                        </h3>
                                        <p className="mt-3 text-sm text-neutral-500">{today}</p>
                                    </article>
                                </a>
                            ))}
                        </div>
                    )}
                </motion.section>

                {/* Video Content Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-4 gap-4">
                        <h2 className="font-oswald text-3xl font-bold text-neutral-900">Content Creation</h2>
                        <div className="flex items-center gap-4 text-sm font-medium text-neutral-500">
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] cursor-pointer transition-colors">YouTube</a>
                            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-black cursor-pointer transition-colors">TikTok</a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2] cursor-pointer transition-colors">Facebook</a>
                        </div>
                    </div>

                    {isLoadingVideos ? (
                        <div className="flex w-full items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-neutral-300" />
                        </div>
                    ) : videos.length === 0 ? (
                        <p className="text-neutral-500 py-8">No videos published yet.</p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {videos.map((video) => (
                                <a href={video.link} target="_blank" rel="noopener noreferrer" key={video.id} className="group block">
                                    <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition-shadow group-hover:shadow-md">
                                        {video.thumbnail && (
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                        )}
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-300 group-hover:bg-black/30">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6 text-neutral-900">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Platform Badge */}
                                        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold shadow-sm">
                                            {video.platform}
                                        </div>
                                    </div>
                                    <h3 className="font-oswald text-xl font-bold leading-tight text-neutral-900 transition-colors group-hover:text-neutral-600">
                                        {video.title}
                                    </h3>
                                </a>
                            ))}
                        </div>
                    )}
                </motion.section>

            </main>
        </div>
    );
}
