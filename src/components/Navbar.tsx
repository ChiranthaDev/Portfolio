"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ContactPopupTrigger from './portfolio/developer/contact/ContactPopupTrigger';

export default function Navbar({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`absolute left-0 right-0 top-0 z-30 flex justify-center px-3 pt-3 sm:px-4 lg:px-6 ${className}`}>
      <nav className="flex w-full max-w-6xl items-center justify-between bg-white text-neutral-700 relative rounded-lg py-2">
        <div className="flex items-center gap-2 px-2">
          <Link href="/" aria-label="Go to home">
            <Image src="/img/logo.png" alt="Logo" width={32} height={32} className="h-12 w-auto" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm text-neutral-700 ml-auto mr-6">
          <Link href="/about-me" className="hover:text-neutral-900 transition">About Me</Link>
          <Link href="/qordex" className="hover:text-neutral-900 transition">Qordex</Link>
          <Link href="/blog" className="hover:text-neutral-900 transition">Blogs</Link>
        </div>

        <div className="flex items-center gap-4 px-2">
          <ContactPopupTrigger
            label="chiraa.me"
            className="hidden sm:block rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 sm:px-5"
          />

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-neutral-900 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[100%] left-0 right-0 mt-2 bg-white shadow-lg rounded-xl flex flex-col items-center gap-4 py-6 z-40 lg:hidden px-4">
          <Link href="/about-me" className="text-lg font-medium hover:text-neutral-900 transition" onClick={() => setIsOpen(false)}>About Me</Link>
          <Link href="/qordex" className="text-lg font-medium hover:text-neutral-900 transition" onClick={() => setIsOpen(false)}>Qordex</Link>
          <Link href="/blog" className="text-lg font-medium hover:text-neutral-900 transition" onClick={() => setIsOpen(false)}>Blogs</Link>
          <ContactPopupTrigger
            label="chiraa.me"
            className="mt-2 w-full text-center flex justify-center rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-3 text-base font-semibold text-white transition hover:bg-neutral-800"
          />
        </div>
      )}
    </div>
  );
}
