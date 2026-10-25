import { Check } from "lucide-react";
import { HeroQuickForm } from "./hero-quick-form";
import { HeroShowcase } from "./hero-showcase";

const PERKS = ["ফ্রি", "লগইন লাগবে না", "কয়েক সেকেন্ডেই তৈরি"] as const;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative -mt-[68px] overflow-hidden pt-[68px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_85%_35%,rgba(85,121,99,0.10),transparent_70%),radial-gradient(40%_40%_at_5%_10%,rgba(199,164,91,0.10),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(#183D32_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:pb-20 lg:pt-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-[#FBF3DF] px-3.5 py-1.5 text-sm font-medium text-gold-deep">
            <span aria-hidden="true">😊</span>
            বন্ধুত্বের স্বার্থে, মজার ছলে
            <span aria-hidden="true">😂</span>
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.12] tracking-normal text-forest text-balance sm:text-[3.4rem] lg:text-[3.9rem]"
          >
            আপনার বন্ধুটি কি{" "}
            <span className="relative inline-block text-sage">
              কালকে টাকা দেবে?
              <svg
                aria-hidden="true"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3.5 w-[62%] text-gold"
              >
                <path d="M3 9 C70 2 120 13 190 6 C230 2 270 7 297 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[1.08rem] leading-[1.8] text-muted sm:text-lg">
            যে বন্ধু সবসময় বলে <span className="font-semibold text-ink">“ভাই, কালকে দিয়ে দেব!”</span>—তার জন্য তৈরি
            করুন মজার <span className="font-semibold text-forest">ধারখোর সার্টিফিকেট</span>। নাম লিখুন, টাইটেল বাছুন,
            আর পাঠিয়ে দিন একদম পারফেক্ট সার্টিফিকেট।
          </p>

          <HeroQuickForm />

          <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-1.5">
                <span className="grid size-[18px] place-items-center rounded-full border border-sage/50 text-sage">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
