"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import SplitOverlay from "../../../../components/SplitOverlay";

// Using the same projects list from the gallery to simulate data fetching
const projects = [
    { id: "1", title: "Project 01", thumbnail: "/img/project/1.png", coverImage: "/img/heroo.png", role: "Frontend Developer", year: "2026" },
    { id: "2", title: "Project 02", thumbnail: "/img/project/2.png", coverImage: "/img/1b.jpg", role: "Fullstack Engineer", year: "2025" },
    { id: "3", title: "Project 03", thumbnail: "/img/project/3.png", coverImage: "/img/2b.jpg", role: "UI/UX & Frontend", year: "2026" },
    { id: "4", title: "Project 04", thumbnail: "/img/project/4.png", coverImage: "/img/3b.jpg", role: "Frontend Developer", year: "2025" },
    { id: "5", title: "Project 05", thumbnail: "/img/project/5.png", coverImage: "/img/4b.jpg", role: "Lead Developer", year: "2024" },
    { id: "6", title: "Project 06", thumbnail: "/img/project/6.png", coverImage: "/img/hero.png", role: "Frontend Engineer", year: "2026" },
    { id: "7", title: "Project 07", thumbnail: "/img/project/7.png", coverImage: "/img/qordex.png", role: "Fullstack Developer", year: "2025" }
];

export default function ProjectDetailsPage() {
    const params = useParams();
    const projectId = params.id as string;

    // Find project or fallback to defaults
    const project = projects.find(p => p.id === projectId) || {
        title: `Project ${projectId.padStart(2, '0')}`,
        thumbnail: `/img/project/${projectId}.png`,
        coverImage: `/img/heroo.png`,
        role: "Software Engineer",
        year: "2026"
    };

    return (
        <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
            <SplitOverlay />
            <Navbar />

            <main className="mx-auto max-w-6xl px-6 pb-32 pt-32 lg:pt-40">

                {/* Navigation & Breadcrumbs */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        href="/developer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to my work
                    </Link>
                </motion.div>

                {/* Project Header */}
                <header className="mb-16 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-20">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-oswald text-[clamp(48px,8vw,96px)] font-extrabold leading-[0.9] tracking-tight text-neutral-900"
                        >
                            {project.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-8 max-w-xl text-lg text-neutral-600 leading-relaxed"
                        >
                            A comprehensive showcase of clean interfaces, strong UX thinking, and performance-focused engineering tailored perfectly for the modern web.
                        </motion.p>
                    </div>

                    {/* Project Meta Data */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col justify-start gap-8 border-l border-neutral-200 pl-8 lg:pt-4"
                    >
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">Role</p>
                            <p className="font-medium text-neutral-900">{project.role}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">Year</p>
                            <p className="font-medium text-neutral-900">{project.year}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">Live Site</p>
                            <a href="#" className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 transition-colors">
                                View Project ↗
                            </a>
                        </div>
                    </motion.div>
                </header>

                {/* Main Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative mb-24 aspect-[16/9] w-full overflow-hidden rounded-[40px] bg-neutral-100 shadow-sm"
                >
                    <Image
                        src={project.coverImage}
                        alt={`${project.title} Cover`}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Project Details */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mx-auto max-w-3xl"
                >
                    <h2 className="font-oswald text-4xl font-bold mb-6 text-neutral-900">The Challenge</h2>
                    <p className="text-lg text-neutral-600 mb-12 leading-relaxed">
                        Building scalable software requires a disciplined approach to architecture and user experience.
                        For this project, the primary challenge was to create a digital experience that felt completely
                        fluid while managing complex datasets on the backend. This involved rewriting legacy endpoints
                        and crafting a bespoke frontend utilizing raw performance optimizations.
                    </p>

                    <h2 className="font-oswald text-4xl font-bold mb-6 text-neutral-900">The Solution</h2>
                    <p className="text-lg text-neutral-600 leading-relaxed mb-16">
                        By leveraging Next.js along with tailored Framer Motion animations, we struck the perfect balance
                        between interactivity and speed. We focused heavily on ensuring zero-layout shifts and instant
                        page transitions. The final result is an ecosystem that feels entirely native despite running
                        exclusively in the browser.
                    </p>
                </motion.section>

                {/* Additional Image */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-sm md:col-span-2 lg:col-span-2">
                        <Image
                            src={project.thumbnail}
                            alt="Detail View 1"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="relative aspect-auto flex-1 w-full overflow-hidden rounded-3xl bg-neutral-900 p-8 flex flex-col justify-between text-white shadow-sm">
                            <h3 className="font-oswald text-3xl font-bold">Key Results</h3>
                            <ul className="space-y-4 mt-6 text-sm text-neutral-300">
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white" /> +120% Engagement
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white" /> 0.8s Load Time
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white" /> 99 Lighthouse Score
                                </li>
                            </ul>
                        </div>
                        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-sm">
                            <Image
                                src={project.coverImage}
                                alt="Detail View 2"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </motion.section>

            </main>
        </div>
    );
}
