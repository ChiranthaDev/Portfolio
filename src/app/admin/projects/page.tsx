"use client";

import { useEffect, useState } from "react";
import { FolderHeart, Plus, Search, Settings2, Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    type: string;
    role: string;
    year: string;
    category: string;
    description: string;
    status: string;
    date: string;
}

export default function ProjectsAdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            const res = await fetch(`${baseUrl}/api/projects?t=${Date.now()}`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to load");
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            await fetch(`${baseUrl}/api/projects/${id}`, {
                method: "DELETE",
            });
            setProjects(projects.filter(p => p.id !== id));
        } catch (err) {
            console.error("Failed to delete", err);
            alert("Failed to delete project");
        }
    };

    return (
        <div className="space-y-8 fade-in">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-oswald text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                        Projects
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Manage your Developer and Designer portfolio projects.
                    </p>
                </div>
                <Link href="/admin/projects/new" className="flex items-center gap-2 rounded-xl bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:bg-black dark:hover:bg-neutral-800">
                    <Plus className="h-4 w-4" />
                    Add Project
                </Link>
            </div>

            {/* List Section */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#111] overflow-hidden">
                {/* Search & Filters */}
                <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800 gap-4">
                    <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <Search className="h-4 w-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search projects by name or type..."
                            className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto min-h-[300px]">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-center text-neutral-500">
                            <FolderHeart className="h-12 w-12 text-neutral-300 dark:text-neutral-700 mb-4" />
                            <p>No projects found. Add your first one!</p>
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400 min-w-[600px]">
                            <thead className="border-b border-neutral-200 bg-neutral-50/50 text-xs uppercase text-neutral-700 dark:border-neutral-800 dark:bg-black/50 dark:text-neutral-300">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Project Name</th>
                                    <th className="px-6 py-4 font-medium">Domain / Type</th>
                                    <th className="px-6 py-4 font-medium">Role</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                {projects.map((project) => (
                                    <tr key={project.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                                        <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white flex items-center gap-3 w-[250px]">
                                            <div className="flex h-8 w-8 items-center justify-center rounded bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 flex-shrink-0">
                                                <FolderHeart className="h-4 w-4" />
                                            </div>
                                            <span className="truncate">{project.title}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.role === "Developer" ? project.type : project.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap ${project.role === 'Developer'
                                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                                                : 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
                                                }`}>
                                                {project.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleDelete(project.id)} title="Delete" className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-[#FF0000] dark:hover:bg-neutral-800 dark:hover:text-[#FF0000]">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
