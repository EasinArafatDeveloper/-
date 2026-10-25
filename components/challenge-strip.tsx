import { ArrowRight, Gift } from "lucide-react";

const DAY = 1;
const TOTAL = 30;

export function ChallengeStrip() {
  const percent = Math.round((DAY / TOTAL) * 100);
  return (
    <section id="challenge" aria-labelledby="challenge-title" className="scroll-mt-24 px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-6 rounded-[24px] border border-sage/20 bg-[linear-gradient(100deg,#EEF3EC_0%,#F6F8F2_55%,#EEF3EC_100%)] p-5 shadow-[var(--shadow-card)] sm:p-6 lg:grid-cols-[1.3fr_1fr_auto] lg:gap-8 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-sage/15 text-forest ring-1 ring-sage/25">
            <Gift className="size-7" aria-hidden="true" />
          </span>
          <div>
            <h2 id="challenge-title" className="font-display text-xl font-bold leading-tight text-forest">
              আজকের বিশেষ চ্যালেঞ্জ
            </h2>
            <p className="mt-0.5 text-sm text-muted">৩০ দিনে ৩০টা ওয়েবসাইট—প্রতিদিন নতুন সাইট, নতুন মজা!</p>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="font-semibold text-forest">Day ০১ / ৩০</span>
            <span className="text-muted">ধারখোর সার্টিফিকেট</span>
          </div>
          <div
            role="progressbar"
            aria-label="চ্যালেঞ্জের অগ্রগতি"
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-valuenow={DAY}
            aria-valuetext={`${TOTAL} দিনের মধ্যে ${DAY} দিন`}
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-white ring-1 ring-sage/20"
          >
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#557963,#183D32)]"
              style={{ width: `${Math.max(percent, 6)}%` }}
            />
          </div>
        </div>

        <a
          href="#idea"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-forest px-5 text-[0.95rem] font-semibold text-cream transition-colors hover:bg-forest-hover"
        >
          পরের দিনের আইডিয়া দাও
          <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
