"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type ContactPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ContactMethod = "whatsapp" | "email";

const contactMethods: Record<ContactMethod, { label: string; href: string; detail: string }> = {
  whatsapp: {
    label: "WhatsApp",
    href: "https://wa.me/94702252271",
    detail: "+94 70 22 52 271"
  },
  email: {
    label: "Email",
    href: "mailto:chiranthajanith96@gmail.com",
    detail: "hello@chiraastudio.com"
  }
};

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod>("whatsapp");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const selectedLink = useMemo(
    () => contactMethods[selectedMethod],
    [selectedMethod]
  );

  if (!isOpen || !mounted) return null;

  const modal = (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/45 p-4">
      <div
        className="w-full max-w-md rounded-2xl border-2 border-black bg-white p-6 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.55)] sm:p-7"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-popup-title"
      >
        <div className="flex items-start justify-between gap-4">
          <h3
            id="contact-popup-title"
            className="font-oswald text-[clamp(34px,4.2vw,52px)] leading-[0.95] text-black"
          >
            Contact Me
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close popup"
            className="grid h-9 w-9 place-items-center rounded-full border border-black/20 text-black transition hover:bg-black hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-sm text-left text-neutral-700">Choose one option to continue:</p>

        <div className="mt-5 space-y-3">
          {(Object.keys(contactMethods) as ContactMethod[]).map((method) => {
            const methodData = contactMethods[method];
            const isSelected = selectedMethod === method;

            return (
              <button
                key={method}
                type="button"
                onClick={() => setSelectedMethod(method)}
                className={`flex w-full flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl border px-4 py-3 text-left transition gap-1 sm:gap-0 ${isSelected
                    ? "border-black bg-neutral-100 shadow-[0_8px_18px_-12px_rgba(0,0,0,0.4)]"
                    : "border-neutral-300 bg-white hover:border-black/60"
                  }`}
              >
                <span className="text-base font-semibold text-black">{methodData.label}</span>
                <span className="text-sm text-neutral-600">{methodData.detail}</span>
              </button>
            );
          })}
        </div>

        <a
          href={selectedLink.href}
          target={selectedMethod === "whatsapp" ? "_blank" : undefined}
          rel={selectedMethod === "whatsapp" ? "noreferrer" : undefined}
          className="mt-6 block w-full rounded-lg bg-black px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.09em] text-white transition hover:bg-neutral-800"
        >
          Continue with {selectedLink.label}
        </a>

        <div className="mt-7 flex justify-center">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={70}
            height={70}
            className="h-14 w-auto"
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
