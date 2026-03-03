import Link from "next/link";
import Image from "next/image";
import ContactPopupTrigger from "./contact/ContactPopupTrigger";

export default function MeetingCtaSection() {
  return (
    <section className="relative left-1/2 mt-32 isolate w-screen -translate-x-1/2 overflow-hidden sm:mt-40 lg:mt-48">
      <div className="relative min-h-[72vh] w-full">
        <Image
          src="/img/3b.jpg"
          alt="Workspace consultation section background"
          fill
          priority={false}
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.46)_35%,rgba(0,0,0,0.52)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_45%,rgba(255,255,255,0.1),transparent_58%)]" />

        <div className="relative flex min-h-[72vh] w-full items-center justify-center px-4 py-20 sm:px-6">
          <div className="max-w-3xl text-center text-white">
            <h2 className="font-oswald text-[clamp(54px,8vw,98px)] font-bold italic leading-[0.92] tracking-[-0.015em] [-webkit-text-stroke:0.2px_rgba(255,255,255,0.35)] [transform:rotate(-1.5deg)]">
              Let&apos;s meet!
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[clamp(15px,1.8vw,32px)] leading-[1.1] text-white/90">
              Book a free 15-minute session where we will discuss your project,
              your issues and how to solve them.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <ContactPopupTrigger
                label="Book a free consultation"
                className="rounded-[8px] border border-black bg-white px-4 py-2 text-lg font-sm text-black transition hover:-translate-y-0.5 hover:bg-[#f6f6f6]"
              />
              <ContactPopupTrigger
                label="Start a project"
                className="rounded-[8px] border border-white/80 bg-white/10 px-4 py-2 text-lg font-sm text-white backdrop-blur-[1px] transition hover:-translate-y-0.5 hover:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
