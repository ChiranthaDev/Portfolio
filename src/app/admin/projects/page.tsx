"use client";

import { FolderHeart, Plus, Search, MoreHorizontal, Settings2, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

const projects = [
    { id: 1, title: "Qordex Platform Re-Design", type: "UI/UX Design", role: "Designer", status: "Completed", date: "Jan 15, 2026" },
    { id: 2, title: "FinTech Dashboard", type: "Web App", role: "Developer", status: "In Progress", date: "Feb 20, 2026" },
    { id: 3, title: "Brand Identity - Neo", type: "Graphic Design", role: "Designer", status: "Completed", date: "Dec 10, 2025" },
    { id: 4, title: "E-Commerce Mobile App", type: "Mobile App", role: "Developer", status: "Planning", date: "Mar 01, 2026" },
];

export default function ProjectsAdminPage() {
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
                    <button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800">
                        <Settings2 className="h-4 w-4" />
                        Filters
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
                        <thead className="border-b border-neutral-200 bg-neutral-50/50 text-xs uppercase text-neutral-700 dark:border-neutral-800 dark:bg-black/50 dark:text-neutral-300">
                            <tr>
                                <th className="px-6 py-4 font-medium">Project Name</th>
                                <th className="px-6 py-4 font-medium">Type</th>
                                <th className="px-6 py-4 font-medium">Portfolio Role</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {projects.map((project) => (
                                <tr key={project.id} className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                            <FolderHeart className="h-4 w-4" />
                                        </div>
                                        {project.title}
                                    </td>
                                    <td className="px-6 py-4">{project.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${project.role === 'Developer'
                                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                                            : 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
                                            }`}>
                                            {project.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${project.status === 'Completed'
                                            ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400'
                                            : project.status === 'In Progress'
                                                ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400'
                                                : 'bg-neutral-100 text-neutral-600 ring-1 ring-inset ring-neutral-500/20 dark:bg-neutral-800 dark:text-neutral-400'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button title="Edit" className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-blue-600 dark:hover:bg-neutral-800 dark:hover:text-blue-400">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button title="Delete" className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-[#FF0000] dark:hover:bg-neutral-800 dark:hover:text-[#FF0000]">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
