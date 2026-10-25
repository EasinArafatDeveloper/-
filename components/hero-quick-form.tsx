"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, Sparkles, UserRound } from "lucide-react";
import { AWARD_TITLES, type AwardTitleId } from "@/lib/certificate-templates";
import { PREFILL_EVENT, type PrefillDetail } from "@/lib/prefill";
import { LIMITS } from "@/lib/validation";
import { cleanText, cn } from "@/lib/utils";

const fieldBase =
  "h-[54px] w-full rounded-2xl border bg-surface text-[1rem] text-ink shadow-[0_1px_2px_rgba(24,61,50,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-sage/45 focus:border-forest focus:outline-none focus:ring-4 focus:ring-forest/10";

export function HeroQuickForm() {
  const [name, setName] = useState("");
  const [titleId, setTitleId] = useState<AwardTitleId>("lifetime-kalke");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = cleanText(name);
    if (!/[\p{L}\p{N}]/u.test(clean)) {
      setError("বন্ধুর নামটা লিখে ফেলো—নাম ছাড়া সার্টিফিকেট হয় না!");
      document.getElementById("hero-name")?.focus();
      return;
    }
    setError(null);
    window.dispatchEvent(
      new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail: { name: clean, titleId } }),
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-[560px]" aria-label="দ্রুত সার্টিফিকেট বানাও">
      <div className="grid gap-3 sm:grid-cols-[1.25fr_1fr]">
        <div>
          <label htmlFor="hero-name" className="sr-only">
            বন্ধুর নাম
          </label>
          <div className="relative">
            <UserRound
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-sage"
              aria-hidden="true"
            />
            <input
              id="hero-name"
              type="text"
              autoComplete="off"
              enterKeyHint="go"
              maxLength={LIMITS.name}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="বন্ধুর নাম লিখুন (যেমন: রাফি)"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "hero-name-error" : undefined}
              className={cn(fieldBase, "pl-12 pr-4", error ? "border-danger" : "border-line")}
            />
          </div>
        </div>
        <div className="relative">
          <label htmlFor="hero-title" className="sr-only">
            ফানি টাইটেল
          </label>
          <select
            id="hero-title"
            value={titleId}
            onChange={(e) => setTitleId(e.target.value as AwardTitleId)}
            className={cn(fieldBase, "cursor-pointer appearance-none border-line pl-4 pr-11")}
          >
            {AWARD_TITLES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
        </div>
      </div>

      {error && (
        <p id="hero-name-error" role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="group mt-3 inline-flex h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl bg-forest text-[1.08rem] font-semibold text-cream shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_16px_32px_-16px_rgba(24,61,50,0.85)] transition-[background-color,transform] duration-200 hover:bg-forest-hover active:translate-y-px"
      >
        <Sparkles className="size-5 text-gold" aria-hidden="true" />
        সার্টিফিকেট বানাই
        <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </form>
  );
}
