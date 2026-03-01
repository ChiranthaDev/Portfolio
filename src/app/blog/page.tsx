"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SplitOverlay from "../../components/SplitOverlay";
import Navbar from "../../components/Navbar";

const blogPosts = [
    {
        id: "1",
        title: "The Anatomy of a High-Converting Landing Page",
        date: "March 12, 2026",
        category: "UI/UX Design",
        readTime: "5 min read",
        image: "/img/others/blog1.svg",
        link: "https://www.linkedin.com/in/chirantha-dev/"
    },
    {
        id: "2",
        title: "Why Next.js App Router is a Game Changer",
        date: "February 28, 2026",
        category: "Web Engineering",
        readTime: "7 min read",
        image: "/img/others/blog2.png",
        link: "https://www.linkedin.com/in/chirantha-dev/"
    },
    {
        id: "3",
        title: "Mastering Animations with Framer Motion",
        date: "January 14, 2026",
        category: "Frontend Design",
        readTime: "6 min read",
        image: "/img/others/blog3.avif",
        link: "https://www.linkedin.com/in/chirantha-dev/"
    },
    {
        id: "4",
        title: "The Psychology of Color in Digital Interface",
        date: "December 05, 2025",
        category: "Design Systems",
        readTime: "4 min read",
        image: "/img/qordex.png",
        link: "https://www.linkedin.com/in/chirantha-dev/"
    }
];

const videos = [
    {
        id: 1,
        platform: "YouTube",
        title: "How I Design My UI Kits",
        thumbnail: "/img/heroo.png",
        link: "#"
    },
    {
        id: 2,
        platform: "TikTok",
        title: "Day in the life of a Freelancer",
        thumbnail: "/img/herooo.png",
        link: "#"
    },
    {
        id: 3,
        platform: "Facebook",
        title: "Logo Design Process (Timelapse)",
        thumbnail: "/img/1b.jpg",
        link: "#"
    }
];

export default function BlogPage() {
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
                        <Link href="/blog/all" className="text-sm font-medium text-neutral-500 hover:text-[#FF0000] transition-colors">
                            View all
                        </Link>
                    </div>

                    <div className="grid gap-10 md:grid-cols-2">
                        {blogPosts.slice(0, 4).map((post) => (
                            <a href={post.link} target="_blank" rel="noopener noreferrer" key={post.id} className="group cursor-pointer block">
                                <article>
                                    <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-neutral-500 mb-3">
                                        <span className="text-neutral-900">{post.category}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="font-oswald text-2xl font-bold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-600 md:text-3xl">
                                        {post.title}
                                    </h3>
                                    <p className="mt-3 text-sm text-neutral-500">{post.date}</p>
                                </article>
                            </a>
                        ))}
                    </div>
                </motion.section>

                {/* Video Content Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="mb-10 flex items-center justify-between border-b border-neutral-200 pb-4">
                        <h2 className="font-oswald text-3xl font-bold text-neutral-900">Content Creation</h2>
                        <div className="flex items-center gap-4 text-sm font-medium text-neutral-500">
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] cursor-pointer transition-colors">YouTube</a>
                            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-black cursor-pointer transition-colors">TikTok</a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2] cursor-pointer transition-colors">Facebook</a>
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {videos.map((video) => (
                            <a href={video.link} target="_blank" rel="noopener noreferrer" key={video.id} className="group block">
                                <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition-shadow group-hover:shadow-md">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
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
                </motion.section>

            </main>
        </div>
    );
}
