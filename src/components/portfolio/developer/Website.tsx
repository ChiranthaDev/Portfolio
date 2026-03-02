import Image from "next/image";

export default function DeveloperWebsiteSection() {
  return (

    <section className="bg-white px-5 md:px-10 py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="space-y-6">
          <div>
            <h2 className="font-oswald text-[clamp(28px,4vw,46px)] font-extrabold leading-[0.92] text-neutral-900">
              <span className="relative inline-block">
                You need a website.
                <span className="absolute left-0 top-1/2 h-[4px] w-full -translate-y-1/2 bg-amber-400 font-extrabold leading-[0.92]" />
              </span>
              <br />
              You need a high-performing website.
            </h2>
          </div>

          <p className="max-w-2xl text-1xl leading-[1.35] text-neutral-700">
            It is not just about having a website. It is about having a powerful
            sales tool that drives results.
          </p>

          <p className="max-w-2xl text-1xl leading-[1.45] text-neutral-800">
            Web designer expert, I create high-converting, custom websites
            with a strategic approach to <span className="font-semibold">boost your online visibility</span> and generate
            more sales.
          </p>
        </div>

        <div className="relative">
          <div className="bg-white">
            <div className="relative h-[400px] w-full md:h-[460px] lg:h-[680px]">
              <Image
                src="/img/website.png"
                alt="Website showcase"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-black/5 blur-2xl" />
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-black/5 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
