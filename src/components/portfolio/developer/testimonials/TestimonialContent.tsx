type TestimonialContentProps = {
  heading: string;
  description: string;
  emphasis: string;
};

export default function TestimonialContent({
  heading,
  description,
  emphasis
}: TestimonialContentProps) {
  return (
    <div className="max-w-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.55em] text-[red]">
        Testimonials
      </p>

      <h2 className="mt-5 font-oswald text-[clamp(42px,4vw,72px)] font-bold leading-[0.95] text-[#181a1f]">
        {heading}
      </h2>

      <p className="mt-5 text-[clamp(15px,1.05vw,24px)] leading-[1.6] text-[#31353d]">
        {description} <span className="font-semibold text-[#1b1e24]">{emphasis}</span>
      </p>
    </div>
  );
}
