import { Download, ListChecks, PenLine } from "lucide-react";

const STEPS = [
  { icon: PenLine, title: "বন্ধুর নাম লেখো", body: "যে বন্ধুর ‘কালকে’ আর আসে না, তার নামটা লিখে ফেলো।" },
  { icon: ListChecks, title: "ফানি টাইটেল বেছে নাও", body: "ছয়টা মজার টাইটেল আর তিনটা থিম—যেটা মানায়, সেটাই।" },
  { icon: Download, title: "সার্টিফিকেট ডাউনলোড করে শেয়ার করো", body: "হাই-কোয়ালিটি PNG নামিয়ে মেসেঞ্জার বা গ্রুপে পাঠিয়ে দাও।" },
] as const;

const BN = ["১", "২", "৩"];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-6">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 id="how-title" className="font-serif text-3xl leading-tight text-forest sm:text-[2.4rem]">
          কীভাবে কাজ করে?
        </h2>
        <p className="mt-3 max-w-xl text-muted">তিন ধাপ, কয়েক সেকেন্ড। কোনো সাইন-আপ নেই।</p>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-forest/[0.07] text-forest">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-serif text-4xl leading-none text-gold/70" aria-hidden="true">
                  {BN[i]}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-ink">
                <span className="sr-only">ধাপ {BN[i]}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
