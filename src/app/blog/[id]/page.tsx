"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import SplitOverlay from "../../../components/SplitOverlay";

const blogPosts = [
    {
        id: "1",
        title: "The Anatomy of a High-Converting Landing Page",
        date: "March 12, 2026",
        category: "UI/UX Design",
        readTime: "5 min read",
        image: "/img/others/blog1.svg",
        author: "Dev Chiraa",
        content: [
            { type: "p", text: "Welcome to this deep dive exploring the intersection of modern design and user psychology. The landscape of landing pages has drastically shifted over the past few years, requiring us to think differently about how we structuralize the hero section." },
            { type: "p", text: "Establishing a strong foundation in both interface design and robust frontend architecture is no longer optional. When you approach a new digital product, you must simultaneously consider the aesthetic emotional response and the technical performance budget." },
            { type: "h2", text: "The Power of Consistency" },
            { type: "p", text: "Consistency across your typographic scale, spatial systems, and interaction models directly correlates to user trust. If a button perfectly scales in on one page, but abruptly clicks on another, you have broken the immersive experience." },
            { type: "quote", text: "Design is not just what it looks like and feels like. Design is how it works. And performance is a core pillar of how it works." },
            { type: "h2", text: "What's Next?" },
            { type: "p", text: "As we push forward into AI-augmented development, the baseline for what constitutes a \"good\" website is rising. Fluid animations like those built with Framer Motion, instant navigation paradigms, and pristine accessibility should be the default starting point for any serious project." }
        ]
    },
    {
        id: "2",
        title: "Why Next.js App Router is a Game Changer",
        date: "February 28, 2026",
        category: "Web Engineering",
        readTime: "7 min read",
        image: "/img/others/blog2.png",
        author: "Dev Chiraa",
        content: [
            { type: "p", text: "The introduction of the Next.js App Router brought fundamental changes to how we think about React applications. Server Components represent a paradigm shift in performance, moving the heavy lifting away from the client device and onto the edge." },
            { type: "p", text: "When building enterprise-scale applications, the cost of JavaScript payloads cannot be overstated. By leveraging Server Components, we can ship complex rendering logic without sending a single byte of JS to the browser." },
            { type: "h2", text: "Hydration and Interactivity" },
            { type: "p", text: "We no longer have to hydrate entire nested trees. We can now strategically place \"use client\" boundaries only exactly where interactivity is needed. This micro-hydration approach leads to blazing fast Time to Interactive (TTI) scores." },
            { type: "quote", text: "The fastest code is the code that never has to run on the user's device." },
            { type: "h2", text: "Streaming Architectures" },
            { type: "p", text: "With React Suspense, we can stream UI components as they become ready from the server. This perceived performance boost is absolutely crucial for retaining users on high-latency networks." }
        ]
    },
    {
        id: "3",
        title: "Mastering Animations with Framer Motion",
        date: "January 14, 2026",
        category: "Frontend Design",
        readTime: "6 min read",
        image: "/img/others/blog3.avif",
        author: "Dev Chiraa",
        content: [
            { type: "p", text: "Animation on the web used to mean writing complex CSS keyframes or wrestling with imperative JavaScript libraries that caused layout thrashing. Framer Motion has fundamentally solved the declarative animation problem in React." },
            { type: "p", text: "By tying motion primitives directly to the component lifecycle, we can create complex layout animations, presence transitions, and scroll-linked effects with just a few lines of code." },
            { type: "h2", text: "Layout Animations" },
            { type: "p", text: "The layout prop in Framer Motion is arguably its most powerful feature. When a component's layout changes—whether due to a flexbox re-flow, a sort operation, or an explicit dimension change—Framer Motion automatically interpolates between the states using performant transforms." },
            { type: "quote", text: "Great animation is never noticed. It feels entirely native and expected." },
            { type: "h2", text: "Variants and Orchestration" },
            { type: "p", text: "Orchestrating animations across complex component trees is made trivial with variants. By defining states like 'hidden' and 'visible' at the parent level, we can easily stagger the entrance of children using staggerChildren and delayChildren properties." }
        ]
    }
];

export default function BlogPostPage() {
    const params = useParams();
    const postId = params.id as string;

    // Find project dynamically
    const post = blogPosts.find(p => p.id === postId) || blogPosts[0];

    return (
        <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
            <SplitOverlay />
            <Navbar />

            <main className="mx-auto max-w-4xl px-6 pb-32 pt-32 lg:pt-40">

                {/* Navigation & Breadcrumbs */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-[#FF0000]"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Articles
                    </Link>
                </motion.div>

                {/* Blog Header */}
                <header className="mb-14 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-[#FF0000]"
                    >
                        <span>{post.category}</span>
                        <span className="text-neutral-300">•</span>
                        <span className="text-neutral-500">{post.readTime}</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-oswald text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.05] tracking-tight text-neutral-900"
                    >
                        {post.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-8 flex items-center justify-center gap-4 text-neutral-500"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-neutral-900 border border-neutral-200">
                            DC
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-medium text-neutral-900">{post.author}</p>
                            <p className="text-xs">{post.date}</p>
                        </div>
                    </motion.div>
                </header>

                {/* Main Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative mb-16 aspect-[21/9] w-full overflow-hidden rounded-[32px] bg-neutral-100 shadow-sm"
                >
                    <Image
                        src={post.image}
                        alt={`${post.title} Cover`}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Article Body */}
                <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mx-auto max-w-3xl prose prose-lg prose-neutral prose-headings:font-oswald prose-headings:font-bold prose-h2:text-4xl prose-h2:mt-12 prose-a:text-[#FF0000] prose-img:rounded-2xl"
                >
                    {post.content.map((block, idx) => {
                        if (block.type === "h2") {
                            return <h2 key={idx} className="text-neutral-900">{block.text}</h2>;
                        }
                        if (block.type === "quote") {
                            return (
                                <blockquote key={idx} className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 my-8">
                                    "{block.text}"
                                </blockquote>
                            );
                        }
                        // Default to paragraph
                        const isFirstP = idx === 0;
                        return (
                            <p
                                key={idx}
                                className={isFirstP
                                    ? "text-xl leading-relaxed text-neutral-600 mb-8 border-l-4 border-[#FF0000] pl-6 font-medium"
                                    : "mb-6 text-neutral-600 leading-relaxed"}
                            >
                                {block.text}
                            </p>
                        );
                    })}
                </motion.article>

                {/* Footer actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-20 flex flex-wrap items-center justify-between border-t border-neutral-200 pt-8"
                >
                    <div className="flex gap-4">
                        <button className="rounded-full border border-neutral-200 px-6 py-2 text-sm font-semibold transition hover:bg-neutral-900 hover:text-white">Share Article</button>
                    </div>
                    <Link href="/blog" className="rounded-full bg-[#FF0000] px-6 py-2 text-sm font-semibold text-white transition hover:bg-black">
                        Read More Posts
                    </Link>
                </motion.div>

            </main>
        </div>
    );
}
