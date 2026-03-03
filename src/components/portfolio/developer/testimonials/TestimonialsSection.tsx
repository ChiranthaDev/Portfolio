"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import TestimonialContent from "./TestimonialContent";
import { testimonials } from "./testimonialsData";

function getWrappedOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex;
  const half = Math.floor(length / 2);

  if (offset > half) offset -= length;
  if (offset < -half) offset += length;

  return offset;
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  const orderedOffsets = useMemo(
    () => testimonials.map((_, index) => getWrappedOffset(index, activeIndex, testimonials.length)),
    [activeIndex]
  );

  const showPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="bg-[white] px-2 py-10 sm:px-4 lg:py-16 relative z-20">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="order-last lg:order-none relative mx-auto h-[75vw] w-[75vw] sm:h-[85mm] sm:w-[85mm]">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              offset={orderedOffsets[index]}
            />
          ))}

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={showPrev}
            className="absolute left-0 top-1/2 z-40 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/20 bg-white text-black shadow-[0_10px_26px_-18px_rgba(0,0,0,0.7)] transition hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={showNext}
            className="absolute right-0 top-1/2 z-40 grid h-12 w-12 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/20 bg-white text-black shadow-[0_10px_26px_-18px_rgba(0,0,0,0.7)] transition hover:scale-105"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <TestimonialContent
          heading={activeTestimonial.heading}
          description={activeTestimonial.description}
          emphasis={activeTestimonial.emphasis}
        />
      </div>
    </section>
  );
}
