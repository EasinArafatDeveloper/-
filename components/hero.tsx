import { HeroCta } from "./hero-cta";
import { HeroIllustration } from "./hero-illustration";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(#183D32_0.8px,transparent_0.8px)] [background-size:22px_22px] opacity-[0.07] [mask-image:radial-gradient(70%_70%_at_70%_40%,black,transparent)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-16 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-sage shadow-[0_1px_2px_rgba(32,37,31,0.04)]">
            বন্ধুত্বের স্বার্থে, মজার ছলে 😂
          </p>
          <h1
            id="hero-title"
            className="mt-5 font-serif text-[2.4rem] leading-[1.22] text-forest text-balance sm:text-[3.1rem] lg:text-[3.55rem]"
          >
            আপনার বন্ধুটি কি{" "}
            <span className="relative inline-block whitespace-nowrap">
              কালকে
              <svg
                aria-hidden="true"
                viewBox="0 0 120 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-3 w-full text-gold"
              >
                <path d="M2 8 C30 2 50 11 78 5 C94 2 108 6 118 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>{" "}
            টাকা দেবে?
          </h1>
          <p className="mt-5 max-w-xl text-[1.08rem] leading-[1.8] text-muted sm:text-lg">
            যে বন্ধু সবসময় বলে “ভাই, কালকে দিয়ে দেব!”—তার জন্য বানিয়ে ফেলো একটা রাজকীয়{" "}
            <strong className="font-semibold text-ink">ধারখোর সার্টিফিকেট</strong>। নাম লেখো, টাইটেল বাছো, ছবি
            ডাউনলোড করে পাঠিয়ে দাও—বাকিটা বন্ধুর রিঅ্যাকশন।
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <HeroCta />
            <p className="text-sm text-muted">ফ্রি • লগইন লাগবে না • কয়েক সেকেন্ডেই তৈরি</p>
          </div>
        </div>
        <HeroIllustration />
      </div>
    </section>
  );
}
