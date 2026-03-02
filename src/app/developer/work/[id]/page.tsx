"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import DeveloperFooter from "../../../../components/portfolio/developer/DeveloperFooter";
import { ArrowLeft, Loader2, ExternalLink } from "lucide-react";

interface Project {
    id: string;
    title: string;
    type: string;
    role: string;
    year: string;
    description: string;
    coverImage: string;
    mainImage: string;
    additionalImages?: string[];
    link?: string;
}

export default function ProjectDetailsPage() {
    const params = useParams();
    const projectId = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProject = async () => {
        try {
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            const res = await fetch(`${baseUrl}/api/projects`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to load");
            const data = await res.json();
            // Find the specific project by ID
            const foundProject = data.find((p: Project) => String(p.id) === projectId);
            setProject(foundProject || null);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-[#FDFCF8] flex-col items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-[#FF0000]" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-[#FDFCF8]">
                <Navbar />
                <div className="flex h-[70vh] flex-col items-center justify-center text-center">
                    <h1 className="font-oswald text-4xl font-bold uppercase text-black">Project Not Found</h1>
                    <p className="mt-4 text-neutral-600">The project you are looking for does not exist.</p>
                    <Link
                        href="/developer"
                        className="mt-8 rounded-full border border-black px-6 py-2 text-sm font-medium uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
                    >
                        Back to Developer
                    </Link>
                </div>
                <DeveloperFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCF8]">
            <Navbar />

            <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
                <Link
                    href="/developer"
                    className="inline-flex items-center gap-2 mb-8 text-sm font-medium uppercase tracking-widest text-[black] hover:text-black transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Developer
                </Link>

                {/* Hero Section */}
                <div className="mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-oswald text-5xl uppercase leading-none tracking-tight text-black md:text-8xl"
                    >
                        {project.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex flex-wrap gap-8 border-t border-neutral-200 pt-8"
                    >
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF0000]">Role</p>
                            <p className="mt-2 text-sm font-medium text-neutral-800">{project.role}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF0000]">Type</p>
                            <p className="mt-2 text-sm font-medium text-neutral-800">{project.type}</p>
                        </div>
                        {project.year && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF0000]">Year</p>
                                <p className="mt-2 text-sm font-medium text-neutral-800">{project.year}</p>
                            </div>
                        )}
                        {project.link && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF0000]">Live Site</p>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm font-medium text-neutral-800 flex items-center gap-2 hover:underline">
                                    Visit Project <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Main Image (16:9 Hero) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative mb-16 aspect-video w-full overflow-hidden rounded-[40px] bg-neutral-100"
                >
                    {(project.mainImage || project.coverImage) && (
                        <Image
                            src={project.mainImage || project.coverImage}
                            alt={`${project.title} visualization`}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </motion.div>

                {/* Description */}
                {project.description && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-24 max-w-4xl max-w-3xl"
                    >
                        <h2 className="font-oswald text-4xl uppercase tracking-tight text-black mb-6">About the project</h2>
                        <p className="text-lg leading-relaxed text-neutral-700 whitespace-pre-wrap">{project.description}</p>
                    </motion.div>
                )}

                {/* Additional Images Grid */}
                {project.additionalImages && project.additionalImages.length > 0 && (
                    <div className="mt-24">
                        <h2 className="font-oswald text-4xl uppercase tracking-tight text-black mb-12 text-center">
                            Project Gallery
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.additionalImages.map((src, index) => (
                                <div key={index} className="relative aspect-[4/3] w-full overflow-hidden rounded-[30px] bg-neutral-100">
                                    <Image
                                        src={src}
                                        alt={`${project.title} additional preview ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            <DeveloperFooter />
        </div>
    );
}
