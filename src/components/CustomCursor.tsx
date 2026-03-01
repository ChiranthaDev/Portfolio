"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseenter", onMouseEnter);
            document.addEventListener("mouseleave", onMouseLeave);
            document.addEventListener("mousedown", onMouseDown);
            document.addEventListener("mouseup", onMouseUp);
        };

        const removeEventListeners = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const onMouseLeave = () => {
            setHidden(true);
        };

        const onMouseEnter = () => {
            setHidden(false);
        };

        const onMouseDown = () => {
            setClicked(true);
        };

        const onMouseUp = () => {
            setClicked(false);
        };

        const handleLinkHoverEvents = () => {
            document.querySelectorAll('a, button, input').forEach(el => {
                el.addEventListener('mouseenter', () => setLinkHovered(true));
                el.addEventListener('mouseleave', () => setLinkHovered(false));
            });
        };

        // Use MutationObserver to catch dynamically added links (React routing)
        const observer = new MutationObserver(() => {
            handleLinkHoverEvents();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        addEventListeners();
        handleLinkHoverEvents();

        // Hide default cursor
        document.body.style.cursor = "none";

        return () => {
            removeEventListeners();
            observer.disconnect();
            document.body.style.cursor = "auto";
        };
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Return null on server or mobile devices
    if (!isMounted || (typeof window !== "undefined" && window.innerWidth < 768)) return null;

    return (
        <>
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-400 bg-transparent mix-blend-difference"
                animate={{
                    x: position.x,
                    y: position.y,
                    scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
                    opacity: hidden ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.5,
                }}
            />
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[10000] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF0000]"
                animate={{
                    x: position.x,
                    y: position.y,
                    opacity: hidden ? 0 : linkHovered ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 800,
                    damping: 30,
                    mass: 0.1,
                }}
            />
        </>
    );
}
