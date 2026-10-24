"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { PartyPopper, PenLine } from "lucide-react";
import {
  CUSTOM_TITLE_ID,
  CUSTOM_TITLE_PLACEHOLDER,
  CUSTOM_TITLE_TAGLINE,
  DEFAULT_ISSUER,
  NAME_PLACEHOLDER,
  getAwardTitle,
  getTheme,
  serialFor,
  type AwardTitleId,
  type CertificateView,
} from "@/lib/certificate-templates";
import { DEFAULT_VALUES, validateCertificate, type CertificateFormValues } from "@/lib/validation";
import { useTodayLabel } from "@/lib/use-today-label";
import { cleanText } from "@/lib/utils";
import { CertificateActions } from "./certificate-actions";
import { CertificateForm } from "./certificate-form";
import { CertificatePreview } from "./certificate-preview";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CertificateStudio() {
  const [values, setValues] = useState<CertificateFormValues>(DEFAULT_VALUES);
  const [attempted, setAttempted] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [revealKey, setRevealKey] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const previewTopRef = useRef<HTMLDivElement>(null);

  const today = useTodayLabel();
  const validation = useMemo(() => validateCertificate(values), [values]);
  const errors = attempted && !validation.success ? validation.errors : {};

  const view: CertificateView = useMemo(() => {
    const name = cleanText(values.name);
    const isCustom = values.titleId === CUSTOM_TITLE_ID;
    const preset = isCustom ? null : getAwardTitle(values.titleId as AwardTitleId);
    const titleLabel = preset
      ? preset.label
      : cleanText(values.customTitle) || CUSTOM_TITLE_PLACEHOLDER;
    return {
      name: name || NAME_PLACEHOLDER,
      isPlaceholder: !name,
      title: titleLabel,
      tagline: cleanText(values.subtitle) || (preset ? preset.tagline : CUSTOM_TITLE_TAGLINE),
      issuer: cleanText(values.issuer) || DEFAULT_ISSUER,
      dateLabel: today,
      serial: serialFor(name || NAME_PLACEHOLDER),
      theme: getTheme(values.themeId),
    };
  }, [values, today]);

  const exportKey = useMemo(
    () =>
      JSON.stringify([view.name, view.title, view.tagline, view.issuer, view.dateLabel, view.theme.id]),
    [view],
  );

  const handleChange = useCallback(
    <K extends keyof CertificateFormValues>(key: K, value: CertificateFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleSubmit = () => {
    setAttempted(true);
    if (!validation.success) {
      if (validation.errors.name) nameInputRef.current?.focus();
      else if (validation.errors.customTitle) document.getElementById("custom-title")?.focus();
      else if (validation.errors.subtitle) document.getElementById("subtitle")?.focus();
      else if (validation.errors.issuer) document.getElementById("issuer")?.focus();
      setAnnouncement("");
      return;
    }
    setGenerated(true);
    setRevealKey((k) => k + 1);
    setAnnouncement(`${validation.data.name}-এর সার্টিফিকেট তৈরি হয়েছে! এখন ডাউনলোড বা শেয়ার করতে পারো।`);

    // On small screens the preview sits below the form — bring it into view.
    requestAnimationFrame(() => {
      const el = previewTopRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top > window.innerHeight * 0.5 || top < 0) {
        el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      }
    });
  };

  const handleReset = () => {
    setValues(DEFAULT_VALUES);
    setAttempted(false);
    setGenerated(false);
    setAnnouncement("ফর্ম খালি করা হয়েছে। নতুন বন্ধুর নাম লেখো।");
    formTopRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    nameInputRef.current?.focus({ preventScroll: true });
  };

  const getNode = useCallback(() => cardRef.current, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        {/* Form */}
        <div ref={formTopRef} className="scroll-mt-6 rounded-[22px] border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(32,37,31,0.04)] sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-forest/[0.07] text-forest">
              <PenLine className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold leading-tight text-ink">সার্টিফিকেট সাজাও</h2>
              <p className="text-sm text-muted">যা লিখবে, পাশের প্রিভিউতে সাথে সাথে দেখাবে</p>
            </div>
          </div>
          <CertificateForm
            values={values}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            nameInputRef={nameInputRef}
          />
        </div>

        {/* Preview */}
        <div ref={previewTopRef} className="scroll-mt-6 lg:sticky lg:top-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-forest">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage/50 motion-reduce:hidden" />
                <span className="relative inline-flex size-2.5 rounded-full bg-sage" />
              </span>
              {generated ? "তোমার সার্টিফিকেট তৈরি!" : "লাইভ প্রিভিউ"}
            </p>
            <p className="text-xs text-muted">১০৮০×১৩৫০ PNG</p>
          </div>

          <div className="mx-auto max-w-[480px] lg:max-w-none">
            <CertificatePreview view={view} cardRef={cardRef} revealKey={revealKey} />
          </div>

          <div className="mx-auto mt-5 max-w-[480px] lg:max-w-none">
            <AnimatePresence mode="wait" initial={false}>
              {generated ? (
                <motion.div
                  key="actions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CertificateActions
                    getNode={getNode}
                    exportKey={exportKey}
                    themeId={view.theme.id}
                    recipientName={view.isPlaceholder ? "" : view.name}
                    enabled={validation.success}
                    onReset={handleReset}
                  />
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2 rounded-xl border border-dashed border-line bg-surface/60 px-4 py-3 text-sm leading-relaxed text-muted"
                >
                  <PartyPopper className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
                  নাম লিখে “সার্টিফিকেট তৈরি করুন” চাপলেই ডাউনলোড আর শেয়ারের অপশন চলে আসবে।
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </MotionConfig>
  );
}
