"use client";

import { Languages, Share2, Smartphone, Sparkles } from "lucide-react";
import { getAwardTitle, getTheme, serialFor } from "@/lib/certificate-templates";
import { useTodayLabel } from "@/lib/use-today-label";
import { ScaledCertificate } from "./scaled-certificate";

const FEATURES = [
  { icon: Languages, title: "বাংলায়, বাংলার মজা", body: "আমাদের নিজেদের ভাষা আর আড্ডার রসিকতা" },
  { icon: Sparkles, title: "প্রিমিয়াম ডিজাইন", body: "সোনালি কারুকাজ আর তিনটা সুন্দর থিম" },
  { icon: Share2, title: "সহজে শেয়ার", body: "Facebook, Messenger, WhatsApp—যেখানে খুশি" },
  { icon: Smartphone, title: "মোবাইল ও ডেস্কটপ", body: "দুই জায়গাতেই একদম পারফেক্ট" },
] as const;

const SAMPLE = "তানভীর";

export function WhyFun() {
  const today = useTodayLabel();
  const title = getAwardTitle("bakiraj");

  return (
    <section aria-labelledby="why-title" className="border-y border-line/70 bg-[#F1EFE8]/60">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.45fr_0.55fr]">
        <div>
          <h2 id="why-title" className="font-display text-[2rem] font-bold leading-tight text-forest sm:text-[2.5rem]">
            কেন এটা এত মজার?
          </h2>
          <p className="mt-2 text-muted">একটা ছোট সার্টিফিকেট, অনেক বড় হাসি!</p>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-line">
            {FEATURES.map((f) => (
              <li key={f.title} className="sm:px-5 sm:first:pl-0">
                <span className="grid size-12 place-items-center rounded-2xl bg-surface text-forest shadow-[var(--shadow-card)] ring-1 ring-line">
                  <f.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold leading-snug text-ink">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden="true" className="relative mx-auto w-full max-w-[250px]">
          <p className="absolute -left-24 -top-6 hidden -rotate-[10deg] font-serif text-lg italic leading-tight text-sage lg:block">
            Friendship
            <br />
            Never Ends
            <svg viewBox="0 0 60 40" className="ml-10 mt-1 w-12 text-sage" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 4 C20 6 40 14 52 32" />
              <path d="M44 30 l8 3 1 -8" />
            </svg>
          </p>
          <div className="relative rotate-[5deg] bg-white p-3 pb-10 shadow-[var(--shadow-lift)] transition-transform duration-500 hover:rotate-[2deg] motion-reduce:transition-none">
            <ScaledCertificate
              view={{
                name: SAMPLE,
                isPlaceholder: false,
                title: title.label,
                tagline: title.tagline,
                issuer: "বন্ধুমহল",
                dateLabel: today,
                serial: serialFor(SAMPLE),
                theme: getTheme("midnight"),
              }}
            />
            <p className="absolute bottom-3 left-0 right-0 text-center font-script text-base text-forest">মিডনাইট থিম ✨</p>
          </div>
        </div>
      </div>
    </section>
  );
}
