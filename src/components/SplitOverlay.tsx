"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SplitOverlay() {
  return (
    <motion.div
      initial="visible"
      animate="hidden"
      className="pointer-events-none fixed inset-0 z-50"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-900"
        style={{ clipPath: "polygon(0 0, 62% 0, 48% 100%, 0 100%)" }}
        initial={{ x: 0 }}
        animate={{ x: "-120%" }}
        transition={{ duration: 1.3, delay: 0.8, ease: [0.77, 0, 0.175, 1] }}
      />
      <motion.div
        className="absolute inset-0 bg-neutral-900"
        style={{ clipPath: "polygon(62% 0, 100% 0, 100% 100%, 48% 100%)" }}
        initial={{ x: 0 }}
        animate={{ x: "120%" }}
        transition={{ duration: 1.3, delay: 0.8, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="absolute bottom-12 right-8 sm:bottom-16 sm:right-20">
          <Image
            src="/img/logow.png"
            alt="Overlay logo"
            width={96}
            height={96}
            className="h-20 sm:h-24 md:h-32 w-auto"
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
