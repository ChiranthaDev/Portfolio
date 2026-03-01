"use client";

import Navbar from "../../components/Navbar";

export default function QordexPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="flex h-screen items-center justify-center">
                <h1 className="font-oswald text-[clamp(40px,10vw,120px)] font-bold tracking-tighter text-neutral-900">
                    Soon !
                </h1>
            </main>
        </div>
    );
}
