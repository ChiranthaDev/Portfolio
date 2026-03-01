"use client";

import { useState } from "react";
import ContactPopup from "./ContactPopup";

type ContactPopupTriggerProps = {
  label?: string;
  className?: string;
};

export default function ContactPopupTrigger({
  label = "Build a somthing together",
  className = "rounded-lg bg-neutral-900 px-6 py-3 text-sm text-white shadow transition hover:bg-neutral-800"
}: ContactPopupTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {label}
      </button>

      <ContactPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
