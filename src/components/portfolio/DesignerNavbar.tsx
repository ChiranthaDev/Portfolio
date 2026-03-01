import Image from "next/image";
import Link from "next/link";

export default function DesignerNavbar() {
  return (
    <nav className="flex items-center justify-between px-6 pt-4 text-sm text-neutral-600">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Go to home">
          <Image
            src="/img/logo.png"
            alt="Chiraa logo"
            width={120}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-10">
        <button className="hover:text-neutral-900 transition">Design</button>
        <button className="hover:text-neutral-900 transition">Projects</button>
        <button className="hover:text-neutral-900 transition">About</button>
        <button className="hover:text-neutral-900 transition">Contact</button>
        <button className="rounded-lg bg-neutral-900 px-5 py-2 text-white hover:bg-neutral-800 transition">
          hello@bazil.fr
        </button>
      </div>
    </nav>
  );
}
