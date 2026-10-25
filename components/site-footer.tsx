import { Heart } from "lucide-react";
import { BrandMark } from "./brand-mark";

const LINKS = [
  { href: "#top", label: "হোম" },
  { href: "#generator", label: "জেনারেটর" },
  { href: "#how-it-works", label: "কীভাবে কাজ করে" },
  { href: "#faq", label: "প্রশ্নোত্তর" },
  { href: "#idea", label: "আইডিয়া দাও" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <a href="#top" className="inline-flex items-center gap-3 rounded-lg">
            <BrandMark className="size-11" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-xl font-bold text-cream">ধারখোর সার্টিফিকেট</span>
              <span className="text-sm text-cream/60">একটি মজার জেনারেটর</span>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
            শুধুমাত্র মজা ও বন্ধুত্বের জন্য। কোনো আসল লেনদেন যাচাই করা হয় না, কোনো তথ্যও সংরক্ষণ করা হয় না।
          </p>
        </div>

        <nav aria-label="ফুটার">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>৩০ দিনে ৩০ ওয়েবসাইট • Day ০১</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="size-3.5 fill-[#E9765B] text-[#E9765B]" aria-label="ভালোবাসা" /> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
