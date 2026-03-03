"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SplitOverlay from "../../components/SplitOverlay";
import Navbar from "../../components/Navbar";
import { Loader2 } from "lucide-react";

interface DesignerProject {
  id: string;
  title: string;
  category: string;
  coverImage: string;
}

export default function DesignerPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<DesignerProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDesignerProjects = async () => {
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/projects`, { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();

      // Filter for UI/UX Designer role
      const designerProjects = data
        .filter((p: any) => p.role === "UI/UX Designer" || p.role === "Designer")
        .reverse();
      setProjects(designerProjects);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignerProjects();
  }, []);

  // Dynamically extract unique categories from the loaded projects
  const dynamicCategories = ["All", ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

  const filteredItems = activeCategory === "All"
    ? projects
    : projects.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <SplitOverlay />
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-32 pt-24 md:pt-32 min-h-screen">
        {/* Hero Section */}
        <section className="mb-20 space-y-8 text-center md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 backdrop-blur-md"
          >
            Creative Design
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-oswald mx-auto max-w-4xl text-[clamp(40px,7vw,80px)] font-bold leading-[1.05] tracking-tight text-neutral-900"
          >
            Crafting visual identities with purpose and precision.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg text-neutral-600 md:text-xl"
          >
            Blending aesthetics and strategy to create stunning logos, captivating flyers, and striking patterns that elevate your brand.
          </motion.p>
        </section>

        {/* Filter Navigation */}
        {!isLoading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-2 md:mb-16 md:gap-4"
          >
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as string)}
                className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 md:text-base ${activeCategory === cat
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-900"
                  }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 z-0 rounded-full bg-neutral-900"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{cat as string}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="flex w-full items-center justify-center h-48">
            <Loader2 className="h-10 w-10 animate-spin text-[#FF0000]" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center h-48 text-neutral-400">
            <p>No designer projects available. Upload some via the Admin Panel!</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="group relative overflow-hidden rounded-3xl bg-neutral-100 aspect-square"
                >
                  {/* Image Wrapper */}
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    {item.coverImage && (
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                      />
                    )}

                    {/* Subtle Dark Overlay */}
                    <div className="absolute inset-0 bg-neutral-900/10 transition-opacity duration-300 group-hover:bg-neutral-900/60" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <div className="translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      {item.category && (
                        <div className="mb-2 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md">
                          {item.category}
                        </div>
                      )}
                      <h3 className="font-oswald text-2xl font-semibold text-white md:text-3xl">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}
