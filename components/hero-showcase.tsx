"use client";

import Image from "next/image";
import { getAwardTitle, getTheme, serialFor, type CertificateView } from "@/lib/certificate-templates";
import { useTodayLabel } from "@/lib/use-today-label";
import { ScaledCertificate } from "./scaled-certificate";

const SAMPLE_NAME = "রাফি ইসলাম";

/** Hero art: the lounging "kalke dibo" friend in front of a real, tilted certificate. */
export function HeroShowcase() {
  const today = useTodayLabel();
  const title = getAwardTitle("lifetime-kalke");
  const view: CertificateView = {
    name: SAMPLE_NAME,
    isPlaceholder: false,
    title: title.label,
    tagline: title.tagline,
    issuer: "বন্ধুমহল",
    dateLabel: today,
    serial: serialFor(SAMPLE_NAME),
    theme: getTheme("classic"),
  };

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[10/9] w-full max-w-[540px] select-none lg:ml-auto lg:mr-0"
    >
      {/* soft background shapes */}
      <div className="absolute right-[-6%] top-[4%] size-[72%] rounded-full bg-mint" />
      <div className="absolute bottom-[6%] left-[8%] h-[10%] w-[52%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(24,61,50,0.14),transparent)]" />

      {/* certificate */}
      <div className="absolute right-[1%] top-[3%] w-[60%] rotate-[5deg] rounded-[4px] bg-white p-[5px] shadow-[var(--shadow-lift)] transition-transform duration-500 hover:rotate-[3deg] motion-reduce:transition-none">
        <ScaledCertificate view={view} className="rounded-[2px]" />
      </div>

      {/* the friend */}
      <Image
        src="/hero-guy.webp"
        alt=""
        width={960}
        height={914}
        priority
        sizes="(min-width: 1024px) 320px, 58vw"
        className="absolute bottom-[2%] left-[-3%] z-10 w-[62%] drop-shadow-[0_18px_22px_rgba(24,61,50,0.18)]"
      />

      {/* speech bubble */}
      <div className="absolute left-[1%] top-[17%] z-20 animate-float motion-reduce:animate-none">
        <div className="relative -rotate-[8deg] rounded-[50%] border-[2.5px] border-forest bg-surface px-5 py-3 shadow-[var(--shadow-card)] sm:px-6 sm:py-3.5">
          <span className="whitespace-nowrap font-display text-[1.1rem] font-bold leading-none text-forest sm:text-[1.3rem]">
            কালকে দিমু!
          </span>
          <svg viewBox="0 0 30 24" className="absolute -bottom-[17px] right-[22%] w-6 -scale-x-100" aria-hidden="true">
            <path d="M2 0 C6 10 4 18 0 24 C10 18 18 10 22 0" fill="#fff" stroke="#183D32" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="3" y="0" width="17" height="3" fill="#fff" />
          </svg>
        </div>
      </div>

      {/* sticky note */}
      <div className="absolute bottom-[4%] right-[-1%] z-20 rotate-[-7deg] bg-note px-4 py-3 shadow-[0_14px_26px_-16px_rgba(60,50,10,0.7)] sm:px-5 sm:py-3.5">
        <span className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-[3deg] bg-white/60" />
        <p className="font-script text-[1rem] leading-snug text-forest sm:text-[1.15rem]">
          ডাউনলোড করে
          <br />
          বন্ধুকে পাঠাও
        </p>
      </div>
    </div>
  );
}
