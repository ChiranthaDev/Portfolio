"use client";

import { FolderHeart, ArrowLeft, Save, Image as ImageIcon, Link as LinkIcon, Loader2, Code, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
    const router = useRouter();

    // Tab State
    const [activeTab, setActiveTab] = useState<"Developer" | "Designer">("Developer");

    // Developer States
    const [devTitle, setDevTitle] = useState("");
    const [type, setType] = useState("");
    const [year, setYear] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [devCoverFile, setDevCoverFile] = useState<File | null>(null);
    const [mainImageFile, setMainImageFile] = useState<File | null>(null);
    const [additionalFiles, setAdditionalFiles] = useState<(File | null)[]>([null, null, null]);
    const devCoverInputRef = useRef<HTMLInputElement>(null);

    // Designer States
    const [designerTitle, setDesignerTitle] = useState("");
    const [category, setCategory] = useState("");
    const [designerCoverFile, setDesignerCoverFile] = useState<File | null>(null);
    const designerCoverInputRef = useRef<HTMLInputElement>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Refs for hidden file inputs
    const mainImageRef = useRef<HTMLInputElement>(null);
    const additionalInputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
        const res = await fetch(`${baseUrl}/api/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        return data.url;
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (activeTab === "Developer") {
            if (!devTitle || !type || !year || !description) return alert("Please fill title, type, year, and description");
        } else {
            if (!designerTitle || !category) return alert("Please fill item name and category");
        }

        setIsSubmitting(true);
        try {
            let coverImageUrl = "";
            let mainImageUrl = "";
            let additionalUrls: string[] = [];

            // 1. Upload Cover/Square Image if exists
            if (activeTab === "Developer" && devCoverFile) {
                coverImageUrl = await uploadImage(devCoverFile);
            } else if (activeTab === "Designer" && designerCoverFile) {
                coverImageUrl = await uploadImage(designerCoverFile);
            }

            // 2. Upload Main Image (Developer)
            if (activeTab === "Developer" && mainImageFile) {
                mainImageUrl = await uploadImage(mainImageFile);
            }

            // 3. Upload Additional Images (Developer)
            if (activeTab === "Developer") {
                for (const file of additionalFiles) {
                    if (file) {
                        const url = await uploadImage(file);
                        additionalUrls.push(url);
                    }
                }
            }

            // 4. Save Project Data
            const projectData = {
                title: activeTab === "Developer" ? devTitle : designerTitle,
                role: activeTab === "Developer" ? "Developer" : "Designer",
                type: activeTab === "Developer" ? type : "",
                year: activeTab === "Developer" ? year : "",
                description: activeTab === "Developer" ? description : "",
                link: activeTab === "Developer" ? link : "",
                category: activeTab === "Designer" ? category : "",
                coverImage: coverImageUrl,
                mainImage: mainImageUrl,
                additionalImages: additionalUrls,
            };

            const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
            const res = await fetch(`${baseUrl}/api/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.details || errData.error || "Failed to save project");
            }

            router.refresh(); // Force page refresh
            router.push('/admin/projects');
        } catch (err: any) {
            console.error(err);
            alert("An error occurred while saving: " + (err.message || String(err)));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: "devCover" | "designerCover" | "main" | number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (target === "devCover") {
            setDevCoverFile(file);
        } else if (target === "designerCover") {
            setDesignerCoverFile(file);
        } else if (target === "main") {
            setMainImageFile(file);
        } else if (typeof target === "number") {
            const newFiles = [...additionalFiles];
            newFiles[target] = file;
            setAdditionalFiles(newFiles);
        }
    };

    return (
        <div className="space-y-8 fade-in max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Projects
                    </Link>
                    <h1 className="font-oswald text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                        Create New Project
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/projects" className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800">
                        Cancel
                    </Link>
                    <button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-xl bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:bg-black dark:hover:bg-neutral-800 disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isSubmitting ? 'Saving...' : 'Save Project'}
                    </button>
                </div>
            </div>

            {/* Tab Selector */}
            <div className="flex p-1 space-x-2 bg-neutral-100 dark:bg-neutral-800/50 rounded-2xl">
                <button
                    onClick={() => setActiveTab("Developer")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "Developer" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
                >
                    <Code className="w-4 h-4" />
                    Developer Project
                </button>
                <button
                    onClick={() => setActiveTab("Designer")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === "Designer" ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
                >
                    <LayoutTemplate className="w-4 h-4" />
                    Designer Showcase
                </button>
            </div>

            {/* Form Section */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-[#111] overflow-hidden">
                <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">

                    {/* ----------------- DEVELOPER TAB ----------------- */}
                    {activeTab === "Developer" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-900 dark:text-white">Project Title</label>
                                    <input
                                        type="text"
                                        value={devTitle}
                                        onChange={(e) => setDevTitle(e.target.value)}
                                        placeholder="e.g. Enterprise CRM System"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-900 dark:text-white">Project Type</label>
                                    <input
                                        type="text"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        placeholder="e.g. Web App, Mobile App"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-900 dark:text-white">Year</label>
                                    <input
                                        type="text"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        placeholder="e.g. 2026"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-900 dark:text-white">Live Site URL (Optional)</label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <LinkIcon className="h-4 w-4 text-neutral-400" />
                                        </div>
                                        <input
                                            type="url"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            placeholder="https://..."
                                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-900 dark:text-white">Project Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Provide a detailed description of the project, architecture, and goals..."
                                    rows={4}
                                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                    required
                                />
                            </div>

                            {/* Cover Image Upload (Developer) */}
                            <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-900 dark:text-white flex justify-between">
                                        Cover Image (My Work Section)
                                        <span className="text-xs font-normal text-neutral-500">Target size: 520x380px</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={devCoverInputRef}
                                        onChange={(e) => handleFileChange(e, "devCover")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => devCoverInputRef.current?.click()}
                                        className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-10 text-sm font-medium text-neutral-500 transition-colors hover:border-[#FF0000] hover:bg-red-50 hover:text-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-[#FF0000] dark:hover:bg-red-500/10"
                                    >
                                        {devCoverFile ? (
                                            <span className="text-[#FF0000] font-semibold">{devCoverFile.name} (Ready)</span>
                                        ) : (
                                            <>
                                                <ImageIcon className="h-8 w-8 text-neutral-400" />
                                                <span>Click to upload cover image</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Main Image Upload */}
                                <div className="space-y-2 pt-4">
                                    <label className="text-sm font-semibold text-neutral-900 dark:text-white flex justify-between">
                                        Main Image (Project Detail Hero)
                                        <span className="text-xs font-normal text-neutral-500">Target aspect ratio: 16:9</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={mainImageRef}
                                        onChange={(e) => handleFileChange(e, "main")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => mainImageRef.current?.click()}
                                        className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-10 text-sm font-medium text-neutral-500 transition-colors hover:border-[#FF0000] hover:bg-red-50 hover:text-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-[#FF0000] dark:hover:bg-red-500/10"
                                    >
                                        {mainImageFile ? (
                                            <span className="text-[#FF0000] font-semibold">{mainImageFile.name} (Ready)</span>
                                        ) : (
                                            <>
                                                <ImageIcon className="h-8 w-8 text-neutral-400" />
                                                <span>Click to upload main hero image</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Additional Images */}
                                <div className="space-y-2 pt-4">
                                    <label className="text-sm font-semibold text-neutral-900 dark:text-white flex justify-between">
                                        Additional Images
                                        <span className="text-xs font-normal text-neutral-500">Target aspect ratio: ~ 3.5:2</span>
                                    </label>
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        {[0, 1, 2].map((num) => (
                                            <div key={num} className="w-full">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    ref={additionalInputRefs[num]}
                                                    onChange={(e) => handleFileChange(e, num)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => additionalInputRefs[num].current?.click()}
                                                    className="flex w-full flex-col items-center p-4 justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-8 text-sm font-medium text-neutral-500 transition-colors hover:border-[#FF0000] hover:bg-red-50 hover:text-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-[#FF0000] dark:hover:bg-red-500/10"
                                                >
                                                    {additionalFiles[num] ? (
                                                        <span className="text-[#FF0000] text-xs truncate max-w-[100px]">{additionalFiles[num]?.name}</span>
                                                    ) : (
                                                        <>
                                                            <ImageIcon className="h-6 w-6 text-neutral-400" />
                                                            <span>Gallery Image {num + 1}</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* ----------------- DESIGNER TAB ----------------- */}
                    {activeTab === "Designer" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-900 dark:text-white">Item Name</label>
                                    <input
                                        type="text"
                                        value={designerTitle}
                                        onChange={(e) => setDesignerTitle(e.target.value)}
                                        placeholder="e.g. Minimalist UI Kit"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-900 dark:text-white">Category</label>
                                    <input
                                        type="text"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder="e.g. Graphic Design, Branding"
                                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 focus:border-[#FF0000] focus:outline-none focus:ring-1 focus:ring-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-white dark:focus:border-[#FF0000]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-900 dark:text-white flex justify-between">
                                        Square Card Image
                                        <span className="text-xs font-normal text-neutral-500">Target aspect ratio: 1:1</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={designerCoverInputRef}
                                        onChange={(e) => handleFileChange(e, "designerCover")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => designerCoverInputRef.current?.click()}
                                        className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-16 text-sm font-medium text-neutral-500 transition-colors hover:border-[#FF0000] hover:bg-red-50 hover:text-[#FF0000] dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-[#FF0000] dark:hover:bg-red-500/10"
                                    >
                                        {designerCoverFile ? (
                                            <span className="text-[#FF0000] font-semibold">{designerCoverFile.name} (Ready)</span>
                                        ) : (
                                            <>
                                                <ImageIcon className="h-10 w-10 text-neutral-400" />
                                                <span>Click to upload square showcase image</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}
