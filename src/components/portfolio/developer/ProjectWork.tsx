"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CARD_WIDTH = 380;
const CARD_GAP = 20;
const STEP = CARD_WIDTH + CARD_GAP;

const projects = [
  { id: "1", title: "Project 01", thumbnail: "/img/project/1.png", coverImage: "/img/heroo.png" },
  { id: "2", title: "Project 02", thumbnail: "/img/project/2.png", coverImage: "/img/1b.jpg" },
  { id: "3", title: "Project 03", thumbnail: "/img/project/3.png", coverImage: "/img/2b.jpg" },
  { id: "4", title: "Project 04", thumbnail: "/img/project/4.png", coverImage: "/img/3b.jpg" },
  { id: "5", title: "Project 05", thumbnail: "/img/project/5.png", coverImage: "/img/4b.jpg" },
  { id: "6", title: "Project 06", thumbnail: "/img/project/6.png", coverImage: "/img/hero.png" },
  { id: "7", title: "Project 07", thumbnail: "/img/project/7.png", coverImage: "/img/qordex.png" }
];

export default function LatestProjectWorkSection() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

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
    const node = railRef.current;
    if (!node) return;

    node.scrollLeft = Math.round(CARD_WIDTH / 2 + CARD_GAP / 2);
    updateArrowState();

    const onScroll = () => updateArrowState();
    node.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      node.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 bg-white py-16">
      <div className="w-full">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[red]">
            Latest Projects
          </p>
          <h2 className="mt-3 font-oswald font-extrabold leading-[0.92] text-[clamp(52px,8vw,96px)] leading-[0.96] text-black">My Works</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-700">
            Witness the beauty of crafted digital products as we showcase clean interfaces,
            strong UX thinking, and performance-focused engineering.
          </p>
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            aria-label="Previous works"
            onClick={() => handleSlide("prev")}
            disabled={!canGoPrev}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 text-6xl leading-none text-white disabled:cursor-not-allowed disabled:opacity-30 md:left-8"
          >
            &larr;
          </button>

          <button
            type="button"
            aria-label="Next works"
            onClick={() => handleSlide("next")}
            disabled={!canGoNext}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 text-6xl leading-none text-white disabled:cursor-not-allowed disabled:opacity-30 md:right-8"
          >
            &rarr;
          </button>

          <div
            ref={railRef}
            className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max items-end gap-5 pb-2">
              {projects.map((project, index) => (
                <Link href={`/developer/work/${project.id}`} key={project.id}>
                  <article className="group relative h-[520px] w-[380px] shrink-0 overflow-hidden rounded-[38px] cursor-pointer">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="380px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/5" />

                    <div className="absolute bottom-7 left-7 right-7 text-white">
                      <h3 className="font-oswald text-4xl leading-[0.95]">{project.title}</h3>
                      <p className="mt-2 text-sm text-white/85">Latest project showcase</p>
                    </div>

                    {index === 2 && (
                      <>
                      </>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
