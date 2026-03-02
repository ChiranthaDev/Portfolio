"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

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

const CARD_WIDTH = 380;
const CARD_GAP = 20;
const STEP = CARD_WIDTH + CARD_GAP;

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "sample-1",
    title: "Chiraa Portfolio",
    type: "Full-Stack Web App",
    role: "Developer",
    year: "2024",
    description: "A comprehensive developer and designer portfolio built with modern web technologies.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    mainImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    link: "https://github.com",
    additionalImages: [],
  },
  {
    id: "sample-2",
    title: "E-Commerce Platform",
    type: "Next.js · Node.js · Stripe",
    role: "Developer",
    year: "2023",
    description: "A fully functional e-commerce platform with stripe integration.",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    mainImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    link: "https://github.com",
    additionalImages: [],
  },
  {
    id: "sample-3",
    title: "AI Chat Dashboard",
    type: "React · Python · OpenAI",
    role: "Developer",
    year: "2023",
    description: "An AI chat application offering insights and analytical dashboards.",
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    mainImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    link: "https://github.com",
    additionalImages: [],
  },
  {
    id: "sample-4",
    title: "Task Management App",
    type: "React · Firebase · Tailwind",
    role: "Developer",
    year: "2022",
    description: "A robust task management tool for agile teams built using Firebase for real-time synchronization.",
    coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    mainImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    link: "https://github.com",
    additionalImages: [],
  },
];

export default function LatestProjectWorkSection() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/projects`, { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      const developerProjects = data.filter((p: Project) => p.role === "Developer" || !p.role);
      // Fall back to sample projects if API returns nothing
      setProjects(developerProjects.length > 0 ? developerProjects : SAMPLE_PROJECTS);
    } catch (err) {
      console.error(err);
      // On error, show sample projects
      setProjects(SAMPLE_PROJECTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const updateArrowState = () => {
    const node = railRef.current;
    if (!node) return;

    const { scrollLeft, scrollWidth, clientWidth } = node;
    setCanGoPrev(scrollLeft > 2);
    setCanGoNext(scrollLeft + clientWidth < scrollWidth - 2);
  };

  const handleSlide = (direction: "prev" | "next") => {
    const node = railRef.current;
    if (!node) return;

    node.scrollBy({
      left: direction === "next" ? STEP : -STEP,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    if (isLoading || projects.length === 0) return;

    const node = railRef.current;
    if (!node) return;

    // Center starting point slightly
    node.scrollLeft = Math.round(CARD_WIDTH / 2 + CARD_GAP / 2);
    updateArrowState();

    const onScroll = () => updateArrowState();
    node.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      node.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isLoading, projects.length]);

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 bg-white py-16">
      <div className="w-full">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[red]">
            Latest Projects
          </p>
          <h2 className="mt-3 font-oswald font-extrabold leading-[0.92] text-[clamp(36px,8vw,96px)] leading-[0.96] text-black">My Works</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-700">
            Witness the beauty of crafted digital products as we showcase clean interfaces,
            strong UX thinking, and performance-focused engineering.
          </p>
        </div>

        <div className="relative mt-10 min-h-[520px]">
          {isLoading ? (
            <div className="flex h-[520px] w-full items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-neutral-300" />
            </div>
          ) : projects.length === 0 ? (
            <div className="flex h-[520px] w-full flex-col items-center justify-center text-neutral-400">
              <p>No valid engineering projects found.</p>
            </div>
          ) : (
            <>
              <button
                type="button"
                aria-label="Previous works"
                onClick={() => handleSlide("prev")}
                disabled={!canGoPrev}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 text-6xl leading-none text-black/50 hover:text-black disabled:cursor-not-allowed disabled:opacity-30 md:left-8"
              >
                &larr;
              </button>

              <button
                type="button"
                aria-label="Next works"
                onClick={() => handleSlide("next")}
                disabled={!canGoNext}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 text-6xl leading-none text-black/50 hover:text-black disabled:cursor-not-allowed disabled:opacity-30 md:right-8"
              >
                &rarr;
              </button>

              <div
                ref={railRef}
                className="overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex w-max items-end gap-5 pb-2">
                  {projects.map((project, index) => (
                    <Link href={`/developer/work/${project.id}`} key={project.id}>
                      <article className="group relative h-[520px] w-[85vw] sm:w-[380px] shrink-0 overflow-hidden rounded-[38px] cursor-pointer bg-neutral-100">
                        {project.coverImage && (
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                            sizes="380px"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="absolute bottom-7 left-7 right-7 text-white">
                          <h3 className="font-oswald text-4xl leading-[0.95]">{project.title}</h3>
                          <p className="mt-2 text-sm text-white/85">{project.type}</p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
