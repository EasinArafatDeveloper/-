"use client";

import { useEffect, useState } from "react";
import { CirclePlay } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";

const NAV = [
  { id: "top", label: "হোম" },
  { id: "generator", label: "জেনারেটর" },
  { id: "how-it-works", label: "কীভাবে কাজ করে" },
  { id: "faq", label: "প্রশ্নোত্তর" },
] as const;

export function SiteHeader() {
  const [active, setActive] = useState<string>("top");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-line/80 bg-canvas/85 shadow-[0_8px_24px_-20px_rgba(24,61,50,0.45)] backdrop-blur-md"
          : "border-b border-transparent bg-canvas/0",
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-3 rounded-lg" aria-label="ধারখোর সার্টিফিকেট — শুরুতে যাও">
          <BrandMark className="size-10 shrink-0 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[1.2rem] font-bold text-forest">ধারখোর সার্টিফিকেট</span>
            <span className="text-xs text-muted">একটি মজার জেনারেটর</span>
          </span>
        </a>

        <nav aria-label="প্রধান" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative rounded-lg px-3 py-2 text-[0.95rem] transition-colors",
                      isActive ? "font-semibold text-forest" : "text-ink/75 hover:text-forest",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-forest transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href="#challenge"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-cream shadow-[0_8px_20px_-12px_rgba(24,61,50,0.9)] transition-colors hover:bg-forest-hover"
        >
          <CirclePlay className="size-4 text-gold" aria-hidden="true" />
          ৩০ দিনে ৩০টা
        </a>
      </div>
    </header>
  );
}
