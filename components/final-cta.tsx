"use client";

import { useState } from "react";
import { ArrowUpRight, ClipboardCopy, Lightbulb } from "lucide-react";
import { copyText } from "@/lib/download-certificate";
import { siteConfig } from "@/lib/site-config";
import { charCount, cleanText, toBengaliDigits } from "@/lib/utils";
import { Button, buttonClasses } from "./ui/button";

const MAX = 200;

export function FinalCta() {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleCopy() {
    const clean = cleanText(idea);
    if (!clean) {
      setStatus({ ok: false, text: "আগে আইডিয়াটা একটু লিখে ফেলো!" });
      return;
    }
    try {
      await copyText(`৩০ দিনে ৩০ ওয়েবসাইট — পরের আইডিয়া: ${clean}`);
      setStatus({ ok: true, text: "কপি হয়েছে! এখন পোস্টের কমেন্টে পেস্ট করে দাও 🙌" });
    } catch {
      setStatus({ ok: false, text: "কপি করা গেল না। লেখাটা সিলেক্ট করে নিজে কপি করে নাও।" });
    }
  }

  return (
    <section aria-labelledby="cta-title" className="px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-forest px-6 py-12 text-[#F4EEDD] sm:px-12 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full border border-gold/25"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-12 size-56 rounded-full border border-dashed border-gold/20"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1 text-sm text-gold">
              <Lightbulb className="size-4" aria-hidden="true" />
              ৩০ দিনে ৩০ ওয়েবসাইট • Day ০১
            </p>
            <h2 id="cta-title" className="mt-4 font-serif text-3xl leading-snug text-[#FBF7EC] sm:text-[2.5rem]">
              কালকের ওয়েবসাইট কী নিয়ে হবে?
            </h2>
            <p className="mt-3 max-w-lg leading-relaxed text-[#F4EEDD]/75">
              টাকা ফেরত না দিলেও চলবে, কিন্তু একটা মজার আইডিয়া দিতেই হবে! তোমার আইডিয়াটা হয়তো হবে পরের দিনের
              ওয়েবসাইট।
            </p>
          </div>

          {siteConfig.ideaUrl ? (
            <a
              href={siteConfig.ideaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("gold", "lg") + " justify-self-start"}
            >
              আইডিয়া জানাও
              <ArrowUpRight className="size-4.5" aria-hidden="true" />
            </a>
          ) : (
            <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
              <label htmlFor="idea" className="flex items-center justify-between text-sm font-medium text-[#FBF7EC]">
                তোমার আইডিয়া
                <span className="text-xs text-[#F4EEDD]/60" aria-hidden="true">
                  {toBengaliDigits(charCount(idea))}/{toBengaliDigits(MAX)}
                </span>
              </label>
              <textarea
                id="idea"
                rows={3}
                maxLength={MAX}
                value={idea}
                onChange={(e) => {
                  setIdea(e.target.value);
                  setStatus(null);
                }}
                placeholder="যেমন: মেসের বাজারের হিসাব রাখার ফানি অ্যাপ..."
                className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-[#10291F] px-4 py-3 text-[#FBF7EC] placeholder:text-[#F4EEDD]/40 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/15"
              />
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="gold" onClick={handleCopy}>
                  <ClipboardCopy className="size-4" aria-hidden="true" />
                  আইডিয়া কপি করো
                </Button>
                <p
                  role="status"
                  aria-live="polite"
                  className={status?.ok === false ? "text-sm text-[#F2B8A8]" : "text-sm text-[#F4EEDD]/75"}
                >
                  {status?.text ?? "কপি করে পোস্টের কমেন্টে দিয়ে দাও।"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
