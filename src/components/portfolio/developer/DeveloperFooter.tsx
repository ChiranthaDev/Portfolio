"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const exploreLinks = ["ABOUT US", "QORDEX", "BLOG"];
const followLinks = ["GITHUB", "LINKEDIN", "FACEBOOK"];

export default function DeveloperFooter() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[white] px-4 pb-8 pt-10 text-[#f3b0c8] sm:px-8 sm:pt-12 lg:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="font-oswald text-center text-[clamp(54px,9vw,170px)] uppercase leading-[0.95] tracking-[0.02em] text-black">
          LET&apos;S{" "}
          <span className="relative inline-block font-['Brush_Script_MT','Segoe_Script','Lucida_Handwriting',cursive] normal-case tracking-normal text-[red]">
            Do
            <span className="pointer-events-none absolute -bottom-2 left-0 h-[3px] w-full rotate-[-7deg] bg-[red]" />
          </span>{" "}
          WORK!
        </h2>

        <div className="relative mt-8 h-[250px] overflow-hidden rounded-[22px] bg-[black] sm:h-[320px] lg:h-[360px]">
          <Image
            src="/img/herooo.png"
            alt="Team at work"
            fill
            sizes="100vw"
            className="object-contain object-bottom"
          />
        </div>
        

        <div className="mt-8 grid gap-8 text-left text-[#f7ccda] sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-oswald text-2xl uppercase leading-none text-[black]">Explore</p>
            <div className="mt-4 space-y-2 font-['Poppins',sans-serif] text-[10px] leading-[1.2]">
              {exploreLinks.map((item) => (
                <Link key={item} href="#" className="block transition text-black hover:text-red-600">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-oswald text-2xl uppercase leading-none text-[black]">Follow</p>
            <div className="mt-4 space-y-2 font-['Poppins',sans-serif] text-[10px] leading-[1.2]">
              {followLinks.map((item) => (
                <Link key={item} href="#" className="block transition text-black hover:text-red-600">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-oswald text-2xl uppercase leading-none text-[black]">Contact</p>
            <Link
              href="mailto:hello@chiraastudio.com"
              className="mt-4 block font-['Poppins',sans-serif] text-[10px] leading-[1.2] transition text-black hover:text-red-600"
            >
              chiranthajanith96@.com<br/>
              +94 70 22 52 271
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-[black] pt-5 text-center font-['Poppins',sans-serif] text-[15px] text-[black] sm:flex-row sm:justify-between sm:text-left">
          <p>All Rights Reserved Chiraa. 2026</p>
          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-black/70 bg-white px-2 py-1.5 pr-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-white transition group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
