import "./globals.css";
import { Poppins, Oswald } from "next/font/google";
import type { ReactNode } from "react";
import CustomCursor from "../components/CustomCursor";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap"
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-oswald"
});

export const metadata = {
  title: "Chiraa's Portfolio",
  description: "Hero page inspired layout"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${oswald.variable} cursor-none`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
