"use client";

import Image from "next/image";
import SplitOverlay from "../../components/SplitOverlay";
import Navbar from "../../components/Navbar";
import CircularGallery from "../../components/portfolio/developer/Gallery";
import DeveloperWebsiteSection from "../../components/portfolio/developer/Website";
import LatestProjectWorkSection from "../../components/portfolio/developer/ProjectWork";
import WebDesignSection from "../../components/portfolio/developer/WebDesign";
import TestimonialsSection from "../../components/portfolio/developer/testimonials/TestimonialsSection";
import MeetingCtaSection from "../../components/portfolio/developer/MeetingCta";
import DeveloperFooter from "../../components/portfolio/developer/DeveloperFooter";
import ContactPopupTrigger from "../../components/portfolio/developer/contact/ContactPopupTrigger";
import { useEffect, useRef, useState } from "react";

export default function DeveloperPage() {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= 8) {
        setShowNavbar(true);
      } else if (currentY > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 pt-8 pb-0">
      <SplitOverlay />
      <div className="relative w-full bg-white">
        <Navbar
          className={`z-40 transform transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-24"
            }`}
        />

        <main className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
          <div className="text-[11px] uppercase tracking-[0.35em] text-red-600">
            * Frontend Developer * Backend Developer * AI Learner
          </div>

          <h1 className="mt-6 font-oswald text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.92] text-neutral-900">
            Building scalable software<br /> &amp; clean digital experiences.
          </h1>

          <div className="mt-8 flex items-center gap-4">
            <ContactPopupTrigger />
          </div>

          <div className="mt-16">
            <Image
              src="/img/logo.png"
              alt="Overlay logo"
              width={76}
              height={76}
              className="h-24 w-auto"
              priority
            />
          </div>

          <div className="mt-10 text-xs uppercase tracking-[0.35em] text-neutral-400">
            * React  Next.js * Node * Python * AI * Cloud
          </div>
        </main>

        <section className="relative left-1/2 w-screen -translate-x-1/2 pb-16">
          <div className="relative h-[600px]">
            <CircularGallery
              items={[]}
              bend={1}
              textColor="#ffffff"
              borderRadius={0.08}
              scrollSpeed={2}
              scrollEase={0.05}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-0 bg-white" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-0 bg-white" />
          </div>
        </section>

        <DeveloperWebsiteSection />
        <LatestProjectWorkSection />
        <WebDesignSection />
        <TestimonialsSection />
        <MeetingCtaSection />
        <DeveloperFooter />
      </div>
    </div>
  );
}
