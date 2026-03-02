"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import SplitOverlay from "../components/SplitOverlay";

const overlayDelay = 1;
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: overlayDelay + 0.1 + i * 0.08,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export default function Home() {
  const router = useRouter();
  const [hoveredButton, setHoveredButton] = useState<"developer" | "designer" | null>(
    null
  );
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setEntered(true), (overlayDelay + 0.8) * 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="h-screen overflow-hidden left-0 right-0 bg-white dark:bg-black px-6 pt-8 pb-0 transition-colors duration-300">
      <SplitOverlay />
      <motion.main
        initial="hidden"
        animate="visible"
        className="relative mx-auto h-full w-full max-w-6xl bg-white dark:bg-black transition-colors duration-300"
      >

        <Navbar />
        <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-12 lg:pt-14 pb-0">


          <div className="mt-10 lg:mt-12 text-center">
            <motion.div
              variants={fadeUp}
              custom={1}
              className="inline-flex items-center gap-3 text-2xl text-neutral-600 dark:text-neutral-400"
            >

              <span>👋 my name is Chiraa and I am a freelancer</span>
            </motion.div>

            <motion.div
              className="mt-6 font-oswald"
              initial="hidden"
              animate={entered ? "base" : "show"}
              whileHover="hover"
              transition={{ delay: overlayDelay }}
            >
              <motion.h1
                variants={{
                  hidden: { x: 80, opacity: 0 },
                  show: {
                    x: 0,
                    opacity: 1,
                    color: "#111111",
                    WebkitTextStroke: "0px transparent",
                    transition: { duration: 0.7, ease: "easeOut", delay: overlayDelay }
                  },
                  base: {
                    x: 0,
                    opacity: 1,
                    color: "#111111",
                    WebkitTextStroke: "0px transparent",
                    transition: { duration: 0.2, ease: "easeOut" }
                  },
                  hover: {
                    color: "transparent",
                    WebkitTextStroke: "2px #b5b5b5",
                    transition: { duration: 0 }
                  }
                }}
                className="text-[clamp(48px,12vw,180px)] font-extrabold leading-[0.92] dark:text-white"
              >
                Developer
              </motion.h1>

              <motion.h2
                variants={{
                  hidden: { x: -80, opacity: 0 },
                  show: {
                    x: 0,
                    opacity: 1,
                    color: "transparent",
                    WebkitTextStroke: "2px #b5b5b5",
                    transition: { duration: 0.7, ease: "easeOut", delay: overlayDelay + 0.05 }
                  },
                  base: {
                    x: 0,
                    opacity: 1,
                    color: "transparent",
                    WebkitTextStroke: "2px #b5b5b5",
                    transition: { duration: 0.2, ease: "easeOut" }
                  },
                  hover: {
                    color: "#111111",
                    WebkitTextStroke: "0px transparent",
                    transition: { duration: 0 }
                  }
                }}
                className="relative z-0 whitespace-nowrap text-[clamp(28px,8vw,120px)] font-extrabold leading-[0.98]"
              >
                &amp; Graphic Designer
              </motion.h2>
            </motion.div>

          </div>
        </div>



        <motion.div
          variants={fadeUp}
          custom={4}
          className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none"
        >
          <div className="relative z-10 w-[min(520px,72vw)]">
            <Image
              src="/img/hero.png"
              alt="Portrait"
              width={600}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={4}
          className="absolute inset-x-0 bottom-40 md:bottom-48 flex flex-col md:flex-row items-center justify-between px-4 text-sm text-neutral-500 dark:text-neutral-400 gap-4 md:gap-0"
        >
          <span className="text-center md:text-left"><span className="text-white hidden md:inline">.....................................</span>based in Colombo, Sri Lanka.</span>
          <div className="flex items-center justify-center gap-4 md:gap-6 text-xs uppercase tracking-[0.2em] text-neutral-400 flex-wrap">
            <div className="flex items-center gap-2">
              <Image
                src="/img/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/img/qordex.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <span className="text-white">Sri Lanka.</span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={5}
          className="absolute inset-x-0 bottom-8 flex justify-center z-20"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              onHoverStart={() => setHoveredButton("developer")}
              onHoverEnd={() => setHoveredButton(null)}
              onClick={() => router.push("/developer")}
              animate={{
                scale:
                  hoveredButton === "developer"
                    ? 1.06
                    : hoveredButton
                      ? 0.94
                      : 1
              }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="rounded-lg border border-neutral-900 bg-black dark:border-white dark:bg-white dark:text-black px-6 py-3 text-sm text-white shadow-sm"
            >
              You need a developer
            </motion.button>
            <motion.button
              onHoverStart={() => setHoveredButton("designer")}
              onHoverEnd={() => setHoveredButton(null)}
              onClick={() => router.push("/designer")}
              animate={{
                scale:
                  hoveredButton === "designer"
                    ? 1.06
                    : hoveredButton
                      ? 0.94
                      : 1
              }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="rounded-lg border border-neutral-900 bg-white dark:border-white dark:bg-black dark:text-white px-6 py-3 text-sm text-neutral-900"
            >
              You need a designer
            </motion.button>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}
