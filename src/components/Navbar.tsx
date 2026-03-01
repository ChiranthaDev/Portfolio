import Image from 'next/image';
import Link from 'next/link';
import ContactPopupTrigger from './portfolio/developer/contact/ContactPopupTrigger';

export default function Navbar({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute left-0 right-0 top-0 z-30 flex justify-center px-3 pt-3 sm:px-4 lg:px-6 ${className}`}>
      <nav className="flex w-full max-w-6xl items-center justify-between bg-white text-neutral-700">
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Go to home">
            <Image src="/img/logo.png" alt="Logo" width={32} height={32} className="h-12 w-auto" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm text-neutral-700 ml-auto mr-6">
          <Link href="/about-me" className="hover:text-neutral-900 transition">About Me</Link>
          <Link href="/qordex" className="hover:text-neutral-900 transition">Qordex</Link>
          <Link href="/blog" className="hover:text-neutral-900 transition">Blogs</Link>
        </div>
        <ContactPopupTrigger
          label="chiraa.me"
          className="rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 sm:px-5"
        />
      </nav>
    </div>
  );
}
