"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import SplitOverlay from "../../../components/SplitOverlay";
import { Loader2, ExternalLink, ArrowLeft } from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    category: string;
    linkedinLink: string;
    coverImage: string;
    status: string;
}

export default function BlogPostPage() {
    const params = useParams();
    const postId = params.id as string;
    const router = useRouter();

    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPost = async () => {
        try {
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to load");
            const data = await res.json();
            const foundPost = data.find((p: BlogPost) => String(p.id) === postId);
            setPost(foundPost || null);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (postId) {
            fetchPost();
        }
    }, [postId]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-[#FDFCF8] flex-col items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-[#FF0000]" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[#FDFCF8]">
                <Navbar />
                <div className="flex h-[70vh] flex-col items-center justify-center text-center">
                    <h1 className="font-oswald text-4xl font-bold uppercase text-black">Article Not Found</h1>
                    <p className="mt-4 text-neutral-600">This article might have been moved or deleted.</p>
                    <Link
                        href="/blog"
                        className="mt-8 rounded-full border border-black px-6 py-2 text-sm font-medium uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
                    >
                        Back to Articles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
            <SplitOverlay />
            <Navbar />

            <main className="mx-auto max-w-4xl px-6 pb-32 pt-32 lg:pt-40 text-center">

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex justify-center"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-[#FF0000]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Articles
                    </Link>
                </motion.div>

                {/* Blog Header */}
                <header className="mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6 inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF0000] shadow-sm"
                    >
                        {post.category}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-oswald text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.05] tracking-tight text-neutral-900"
                    >
                        {post.title}
                    </motion.h1>
                </header>

                {/* Main Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative mb-16 aspect-[21/9] w-full overflow-hidden rounded-[32px] bg-neutral-100 shadow-sm"
                >
                    {post.coverImage && (
                        <Image
                            src={post.coverImage}
                            alt={`${post.title} Cover`}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </motion.div>

                {/* External Action */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mx-auto max-w-xl text-center"
                >
                    <p className="text-xl text-neutral-600 mb-8 border-l-4 border-neutral-200 pl-6 text-left italic">
                        All of my deep-dive articles and technical write-ups are published and discussed directly on my LinkedIn.
                        Join the conversation there!
                    </p>

                    {post.linkedinLink && (
                        <a
                            href={post.linkedinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 rounded-2xl bg-[#0077B5] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#006097]"
                        >
                            Read Full Article on LinkedIn
                            <ExternalLink className="h-5 w-5" />
                        </a>
                    )}
                </motion.div>

            </main>
        </div>
    );
}
