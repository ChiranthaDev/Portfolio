import Image from "next/image";
import type { Testimonial } from "./testimonialsData";

type TestimonialCardProps = {
  testimonial: Testimonial;
  offset: number;
};

const cardTransforms: Record<number, string> = {
  [-1]: "translateX(-92px) rotate(-7deg) scale(0.9)",
  [0]: "translateX(0px) rotate(0deg) scale(1)",
  [1]: "translateX(92px) rotate(7deg) scale(0.9)"
};

const cardOpacity: Record<number, number> = {
  [-1]: 0.52,
  [0]: 1,
  [1]: 0.52
};

const cardZIndex: Record<number, number> = {
  [-1]: 10,
  [0]: 30,
  [1]: 20
};

export default function TestimonialCard({ testimonial, offset }: TestimonialCardProps) {
  const clampedOffset = Math.max(-1, Math.min(1, offset)) as -1 | 0 | 1;
  const isVisible = Math.abs(offset) <= 1;

  return (
    <article
      aria-hidden={!isVisible}
      className="absolute inset-0 overflow-hidden rounded-[16px] shadow-[0_28px_45px_-28px_rgba(0,0,0,0.45)] transition-all duration-500"
      style={{
        transform: cardTransforms[clampedOffset],
        opacity: isVisible ? cardOpacity[clampedOffset] : 0,
        zIndex: cardZIndex[clampedOffset],
        pointerEvents: offset === 0 ? "auto" : "none"
      }}
    >
      <Image
        src={testimonial.image}
        alt={testimonial.author}
        fill
        sizes="(min-width: 1024px) 42vw, 92vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/5" />

      <div className="absolute bottom-7 left-7 right-7 text-white">
        <p className="text-[clamp(15px,1.05vw,24px)] leading-[1.2]">{testimonial.quote}</p>
        <p className="mt-4 text-[clamp(10px,0.8vw,18px)] font-semibold leading-tight">{testimonial.author}
          <span className="text-[clamp(10px,0.8vw,18px)] leading-[0.5] font-normal text-white/85"> - {testimonial.role}</span>
        </p>
      </div>
    </article>
  );
}
