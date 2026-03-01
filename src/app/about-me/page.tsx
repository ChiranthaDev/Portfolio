"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import SplitOverlay from "../../components/SplitOverlay";
import Link from "next/link";
import ContactPopupTrigger from "../../components/portfolio/developer/contact/ContactPopupTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const serviceCards = [
  { title: "UI / UX Design", image: "/img/others/uxui.png" },
  { title: "Web Development", image: "/img/others/webb.png" },
  { title: "Graphic Design", image: "/img/others/graphic.webp" }
];

const experiences = [
  {
    company: "Cardiff Metropolitan University (United Kingdom)",
    period: "May 2024 - December 2025",
    role: "HND in Computing & Software Engineering",
    details: "Focused on core software engineering principles, web development, databases, and problem-solving with real-world projects."
  },
  {
    company: "C-CLARKE Institute",
    period: "Jan 2026 - Read..",
    role: "Advanced AI & Software Engineering",
    details: "Hands-on training in AI systems, modern software engineering, and applied machine learning with industry-focused projects."
  },
];

const portfolioFilters = ["Graphic Design", "Product Design", "Animation", "Glassmorphism", "Cards"];


export default function AboutMePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-white dark:bg-black px-6 py-8 text-[#1e2432] dark:text-neutral-200 transition-colors duration-300">
      <SplitOverlay />
      <div className="relative mx-auto w-full max-w-6xl bg-white dark:bg-black transition-colors duration-300">
        <Navbar />
        <main className="mx-auto max-w-[980px] px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
          <section className="relative mt-2 overflow-hidden rounded-[36px] bg-white dark:bg-neutral-900 px-4 pb-4 pt-2 sm:px-8 transition-colors duration-300">
            <div className="text-center">
              <span className="inline-block rounded-full border border-[#222]/20 dark:border-white/20 bg-white dark:bg-black px-5 py-1 text-xs">Hello!</span>
              <h1 className="mt-4 font-oswald text-4xl font-extrabold leading-[0.92] sm:text-6xl dark:text-white">
                I&apos;m <span className="text-[red]">Chiraa.</span>
                <br />
                Developer & Designer
              </h1>
            </div>

            <div className="relative mt-2 flex flex-col items-center">
              <div className="absolute bottom-0" />
              <Image
                src="/img/picj.png"
                alt="Designer portrait"
                width={320}
                height={390}
                className="relative z-10 h-auto w-[80px] sm:w-[230px]"
                priority
              />
              <div className="relative z-20 -mt-7 flex items-center gap-2 rounded-full bg-white/85 dark:bg-black/85 px-2 py-2 shadow-md backdrop-blur">
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[red] px-5 py-2 text-xs font-semibold text-white transition hover:bg-black dark:hover:bg-neutral-800">LinkedIn</Link>
                <Link href="https://github.com/Dev-Chiraa" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2 text-xs font-medium text-[#1f2430] dark:text-neutral-200 transition hover:text-black dark:hover:text-white">GitHub</Link>
              </div>
            </div>
          </section>

          <section className="mt-8 overflow-hidden rounded-[26px] bg-[radial-gradient(circle_at_20%_20%,#2f2f2f_0%,#101013_60%)] p-6 text-white">
            <h2 className="font-oswald text-4xl font-semibold leading-none">
              My <span className="text-[red]">Services</span>
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {serviceCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <h3 className="font-oswald text-lg">{card.title}</h3>
                  <div className="relative mt-4 overflow-hidden rounded-xl bg-white">
                    <div className="relative aspect-[4/3]">
                      <Image src={card.image} alt={card.title} fill className="object-cover" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-[26px] bg-transparent px-2">
            <h2 className="text-center font-oswald text-4xl font-semibold dark:text-white">
              My <span className="text-[red]">Education</span>
            </h2>

            <div ref={containerRef} className="mt-8 grid gap-6 relative">
              {/* Animated Center Line (Desktop Only) */}
              <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-[#a5aabc]/30 md:block">
                <motion.div
                  className="w-full bg-[red] origin-top"
                  style={{ scaleY: pathLength, height: '100%' }}
                />
              </div>

              {experiences.map((item, index) => (
                <motion.div
                  key={item.company}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr] relative z-10"
                >
                  <div className="md:text-right bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-sm border border-[#e9ebf1] dark:border-neutral-800 transition-colors duration-300">
                    <div className="text-2xl font-semibold dark:text-white">{item.company}</div>
                    <p className="text-xs text-[#6d7383]">{item.period}</p>
                  </div>

                  <div className="mx-auto hidden h-full min-h-[58px] w-10 items-center justify-center md:flex relative">
                    <motion.div
                      className="h-4 w-4 rounded-full bg-white dark:bg-black border-2 border-[red] z-20"
                      initial={{ backgroundColor: "rgb(255, 255, 255)" }}
                      whileInView={{ backgroundColor: "rgba(255, 0, 0, 1)" }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    />
                  </div>

                  <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-sm border border-[#e9ebf1] dark:border-neutral-800 transition-colors duration-300">
                    <div className="text-2xl font-semibold dark:text-white">{item.role}</div>
                    <p className="text-sm text-[#515a6f] dark:text-neutral-400">{item.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-6 rounded-[26px] border border-[#e9ebf1] dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:grid-cols-[0.9fr_1.1fr] md:items-center transition-colors duration-300">
            <div className="relative mx-auto w-full max-w-[280px]">
              <div className="absolute bottom-0 left-1/2 h-[170px] w-[210px] -translate-x-1/2 rounded-t-[120px]" />
              <Image
                src="/img/picj.png"
                alt="Hire me portrait"
                width={300}
                height={360}
                className="relative z-10 h-auto w-full"
              />
            </div>

            <div>
              <h2 className="font-oswald text-5xl font-semibold leading-none dark:text-white">
                Why <span className="text-[red]">Hire me?</span>
              </h2>
              <p className="mt-4 max-w-md text-semibold text-[#545e72] dark:text-neutral-400">
                <span className="text-semibold leading-[1.5]">I design and build clean, scalable, and high-performance digital products.</span>
                Combining UI/UX strategy with modern frontend development to deliver polished, user-focused experiences.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-3xl font-semibold dark:text-white">15+</div>
                  <div className="text-[#5c6478]">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold dark:text-white">10+</div>
                  <div className="text-[#5c6478]">Client Project</div>
                </div>
              </div>
              <ContactPopupTrigger label="Hire me" className="mt-6 rounded-full border border-[#1f2432] dark:border-white px-7 py-3 text-sm font-semibold transition hover:bg-[red] hover:text-white dark:hover:bg-white dark:hover:text-black" />
            </div>
          </section>

          <section className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <h2 className="font-oswald text-5xl font-semibold leading-tight dark:text-white">
                Lets have a look at<br /><span className="text-white dark:text-black">......</span>my <span className="text-[red]">Portfolio<br /></span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 px-6 py-8">
              <Link href="/developer" className="rounded-lg border border-neutral-900 bg-black dark:border-white dark:bg-white dark:text-black px-6 py-3 text-sm text-white shadow-sm transition hover:bg-neutral-800">You need a developer</Link>
              <Link href="/designer" className="rounded-lg border border-neutral-900 bg-black dark:border-white dark:bg-white dark:text-black px-6 py-3 text-sm text-white shadow-sm transition hover:bg-neutral-800">You need a designer</Link>
            </div>
          </section>

          <section className="mt-10 text-center overflow-hidden rounded-[26px] bg-[radial-gradient(circle_at_30%_10%,#2d2f34_0%,#0f1014_65%)] px-6 py-12 text-white">

            <h2 className="font-oswald text-5xl font-semibold">
              Have an Awsome Project
              <br />
              Idea? <span className="text-[red]">Let&apos;s Discuss</span>
            </h2>
            <div className="mx-auto mt-6 flex max-w-md items-center rounded-full border border-[#d4d8e3] bg-white p-1">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full rounded-full px-4 py-2 text-sm outline-none"
              />
              <ContactPopupTrigger label="Send" className="rounded-full bg-[red] px-5 py-2 text-sm font-semibold text-white transition hover:bg-black" />
            </div>
          </section>

          <section className="mt-10 rounded-full bg-[red] px-6 py-3 text-center text-sm font-medium text-white">
            * UI/UX Design  * Web Design  * App Design  * Graphic Design  * Social Media Branding & Marketing
          </section>


          <footer className="mt-10 rounded-[22px] bg-[#1a1b20] px-6 py-8 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-oswald text-5xl font-semibold">Lets Connect there</h2>
              <ContactPopupTrigger label="Hire me" className="rounded-full bg-[red] px-6 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black" />
            </div>

            <div className="mt-8 grid gap-6 border-t border-white/15 pt-6 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="flex items-center gap-2">
                  <Image src="/img/logow.png" alt="logo" width={32} height={32} className="h-12 w-auto" />
                </div>
                <p className="mt-3 max-w-md text-sm text-white/70">
                </p>
              </div>
              <div className="grid gap-2 text-sm text-white/80">
                <p></p>
                <p>Contact: +94 70 22 52 271</p>
                <p>Email: chiranthajanith96@gmail.com</p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
