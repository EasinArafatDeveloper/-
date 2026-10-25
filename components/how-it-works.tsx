import { ArrowRight, Download, Star, UserRound } from "lucide-react";

const STEPS = [
  { icon: UserRound, title: "বন্ধুর নাম লিখুন", body: "যার জন্য সার্টিফিকেট বানাবেন, তার নামটা লিখে দিন।" },
  { icon: Star, title: "ফানি টাইটেল বেছে নিন", body: "মজার টাইটেলগুলো থেকে বাছুন—অথবা নিজের মতো লিখে ফেলুন।" },
  { icon: Download, title: "ডাউনলোড ও শেয়ার করুন", body: "হাই-কোয়ালিটি PNG নামিয়ে মেসেঞ্জার বা গ্রুপে পাঠিয়ে দিন।" },
] as const;

const BN = ["১", "২", "৩"];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 id="how-title" className="font-display text-[2rem] font-bold leading-tight text-forest sm:text-[2.5rem]">
          কীভাবে কাজ করে?
        </h2>
        <p className="mt-2 text-muted">মাত্র ৩টি ধাপে তৈরি করুন আপনার ফানি সার্টিফিকেট</p>

        <ol className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="contents">
              <div className="group relative rounded-[22px] border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] motion-reduce:hover:translate-y-0">
                <div className="flex items-start gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-forest font-display text-sm font-bold text-cream">
                    <span className="sr-only">ধাপ </span>
                    {BN[i]}
                  </span>
                  <span className="grid size-14 place-items-center rounded-full bg-mint text-forest ring-1 ring-sage/15 transition-transform duration-300 group-hover:scale-105">
                    <step.icon className="size-6" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.2rem] font-bold leading-snug text-ink">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.body}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="hidden items-center text-sage/70 lg:flex">
                  <ArrowRight className="size-6" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
