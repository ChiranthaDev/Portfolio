"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const stackProjects = [
  { title: "Portfolio Website", image: "/img/web.png" },
  { title: "E-Commerce Platform", image: "/img/2b.jpg" },
  { title: "AI Chat Dashboard", image: "/img/web.png" },
  { title: "Task Manager App", image: "/img/2b.jpg" },
  { title: "SaaS Landing Page", image: "/img/web.png" },
  { title: "Admin Dashboard", image: "/img/2b.jpg" },
  { title: "Mobile App UI", image: "/img/web.png" }
];

export default function WebDesignSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const current = Math.min(Math.max(-rect.top, 0), totalScrollable);
      setProgress(current / totalScrollable);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const activePosition = progress * (stackProjects.length - 1);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-4 sm:px-6"
      style={{ height: `${stackProjects.length * 50}vh` }}
    >
      <div className="sticky top-16 mx-auto grid h-screen w-full max-w-6xl items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl bg-[white] p-8 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[red]">
            Web Design
          </p>
          <h2 className="mt-4 font-oswald text-[clamp(46px,2.5vw,56px)] font-bold leading-[1.08] text-[#16181d]">
            Custom websites, high-performing results and easy-to-manage backoffice
          </h2>
          <p className="mt-6 text-[clamp(15px,1.05vw,24px)] leading-[1.6] text-[#292d33]">
            No template! As a Web developer expert, I create custom websites made to
            enhance your brand experience and your productivity. Easy to access,
            SEO driven and maintenance-free :
            <span className="font-semibold text-[#171a20]">
              {" "}I design and build digital experiences that turn ambition into reality.
            </span>
          </p>
        </div>

        <div className="relative mx-auto h-[105mm] w-[105mm]">
          {stackProjects.map((project, index) => {
            const distance = index - activePosition;
            const absDistance = Math.abs(distance);
            const isVisible = absDistance < 3;
            const translateY = distance * 56;
            const scale = Math.max(0.84, 1 - absDistance * 0.08);

            return (
              <article
                key={project.image}
                className="absolute inset-0 overflow-hidden rounded-[34px] border border-neutral-200 shadow-[0_18px_45px_-25px_rgba(0,0,0,0.35)] transition-transform"
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity: isVisible ? 1 : 0,
                  zIndex: stackProjects.length - index,
                  pointerEvents: index === Math.round(activePosition) ? "auto" : "none"
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/5" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="mt-2 text-sm text-white/85">Scroll to view next project</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
