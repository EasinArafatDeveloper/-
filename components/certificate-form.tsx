"use client";

import type { FormEvent, Ref } from "react";
import { Check, PenLine, Sparkles } from "lucide-react";
import {
  AWARD_TITLES,
  CUSTOM_TITLE_ID,
  CUSTOM_TITLE_TAGLINE,
  DEFAULT_ISSUER,
  THEMES,
  getAwardTitle,
  type AwardTitleId,
  type ThemeId,
} from "@/lib/certificate-templates";
import { LIMITS, type CertificateFormValues, type FieldErrors } from "@/lib/validation";
import { charCount, cn, toBengaliDigits } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {
  values: CertificateFormValues;
  errors: FieldErrors;
  onChange: <K extends keyof CertificateFormValues>(key: K, value: CertificateFormValues[K]) => void;
  onSubmit: () => void;
  nameInputRef: Ref<HTMLInputElement>;
};

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-4 text-[1.02rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 hover:border-sage/40 focus:border-forest focus:outline-none focus:ring-4 focus:ring-forest/10";

function Counter({ value, max }: { value: string; max: number }) {
  const count = charCount(value);
  return (
    <span
      className={cn("text-xs tabular-nums", count >= max ? "text-danger" : "text-muted")}
      aria-hidden="true"
    >
      {toBengaliDigits(count)}/{toBengaliDigits(max)}
    </span>
  );
}

function FieldLabel({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline gap-2 text-[0.95rem] font-semibold text-ink">
      {children}
      {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
    </label>
  );
}

export function CertificateForm({ values, errors, onChange, onSubmit, nameInputRef }: Props) {
  const isCustom = values.titleId === CUSTOM_TITLE_ID;
  const taglinePlaceholder = isCustom
    ? CUSTOM_TITLE_TAGLINE
    : getAwardTitle(values.titleId as AwardTitleId).tagline;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-7" aria-label="সার্টিফিকেট কাস্টমাইজ করো">
      {/* Name */}
      <div className="space-y-2">
        <div className="flex items-end justify-between gap-3">
          <FieldLabel htmlFor="friend-name">
            বন্ধুর নাম <span className="text-danger" aria-hidden="true">*</span>
          </FieldLabel>
          <Counter value={values.name} max={LIMITS.name} />
        </div>
        <input
          ref={nameInputRef}
          id="friend-name"
          name="friend-name"
          type="text"
          autoComplete="off"
          enterKeyHint="done"
          required
          maxLength={LIMITS.name}
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="যেমন: রাকিব হাসান"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "friend-name-error" : undefined}
          className={cn(
            inputClass,
            "h-13",
            errors.name && "border-danger focus:border-danger focus:ring-danger/10",
          )}
        />
        {errors.name && (
          <p id="friend-name-error" role="alert" className="text-sm text-danger">
            {errors.name}
          </p>
        )}
      </div>

      {/* Title */}
      <fieldset className="space-y-3">
        <legend className="text-[0.95rem] font-semibold text-ink">ফানি টাইটেল বেছে নাও</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {AWARD_TITLES.map((title) => {
            const checked = values.titleId === title.id;
            return (
              <label
                key={title.id}
                className={cn(
                  "group relative flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-[0.95rem] leading-snug transition-[border-color,background-color,box-shadow] duration-200",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-forest",
                  checked
                    ? "border-forest bg-forest/[0.045] text-forest shadow-[0_0_0_1px_var(--color-forest)_inset]"
                    : "border-line bg-surface text-ink hover:border-sage/45",
                )}
              >
                <input
                  type="radio"
                  name="award-title"
                  value={title.id}
                  checked={checked}
                  onChange={() => onChange("titleId", title.id as AwardTitleId)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                    checked ? "border-forest bg-forest text-white" : "border-line bg-surface",
                  )}
                  aria-hidden="true"
                >
                  {checked && <Check className="size-3" strokeWidth={3} />}
                </span>
                <span className={cn(checked && "font-semibold")}>{title.label}</span>
              </label>
            );
          })}

          {/* Custom title */}
          <label
            className={cn(
              "relative flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-3.5 py-3 text-[0.95rem] leading-snug transition-[border-color,background-color,box-shadow] duration-200 sm:col-span-2",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-forest",
              isCustom
                ? "border-solid border-forest bg-forest/[0.045] text-forest shadow-[0_0_0_1px_var(--color-forest)_inset]"
                : "border-sage/50 bg-surface text-ink hover:border-sage",
            )}
          >
            <input
              type="radio"
              name="award-title"
              value={CUSTOM_TITLE_ID}
              checked={isCustom}
              onChange={() => {
                onChange("titleId", CUSTOM_TITLE_ID);
                requestAnimationFrame(() => document.getElementById("custom-title")?.focus());
              }}
              className="sr-only"
            />
            <span
              className={cn(
                "grid size-5 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                isCustom ? "border-forest bg-forest text-white" : "border-line bg-surface",
              )}
              aria-hidden="true"
            >
              {isCustom ? <Check className="size-3" strokeWidth={3} /> : <PenLine className="size-3 text-sage" />}
            </span>
            <span className={cn(isCustom && "font-semibold")}>
              নিজে লিখব <span className="font-normal text-muted">— নিজের মতো মজার টাইটেল</span>
            </span>
          </label>
        </div>

        {isCustom && (
          <div className="space-y-2 pt-1">
            <div className="flex items-end justify-between gap-3">
              <FieldLabel htmlFor="custom-title">
                তোমার টাইটেল <span className="text-danger" aria-hidden="true">*</span>
              </FieldLabel>
              <Counter value={values.customTitle} max={LIMITS.customTitle} />
            </div>
            <input
              id="custom-title"
              name="custom-title"
              type="text"
              autoComplete="off"
              maxLength={LIMITS.customTitle}
              value={values.customTitle}
              onChange={(e) => onChange("customTitle", e.target.value)}
              placeholder="যেমন: চা-বাকির সম্রাট পদক"
              aria-invalid={errors.customTitle ? true : undefined}
              aria-describedby={errors.customTitle ? "custom-title-error" : undefined}
              className={cn(
                inputClass,
                "h-12",
                errors.customTitle && "border-danger focus:border-danger focus:ring-danger/10",
              )}
            />
            {errors.customTitle && (
              <p id="custom-title-error" role="alert" className="text-sm text-danger">
                {errors.customTitle}
              </p>
            )}
          </div>
        )}
      </fieldset>

      {/* Subtitle */}
      <div className="space-y-2">
        <div className="flex items-end justify-between gap-3">
          <FieldLabel htmlFor="subtitle" hint="(ঐচ্ছিক)">
            নিজের মতো মজার লাইন
          </FieldLabel>
          <Counter value={values.subtitle} max={LIMITS.subtitle} />
        </div>
        <textarea
          id="subtitle"
          name="subtitle"
          rows={2}
          maxLength={LIMITS.subtitle}
          value={values.subtitle}
          onChange={(e) => onChange("subtitle", e.target.value)}
          placeholder={taglinePlaceholder}
          aria-describedby="subtitle-hint"
          className={cn(inputClass, "resize-none py-3 leading-relaxed")}
        />
        <p id="subtitle-hint" className="text-xs text-muted">
          ফাঁকা রাখলে টাইটেলের সাথে মানানসই একটা লাইন বসে যাবে।
        </p>
      </div>

      {/* Issuer */}
      <div className="space-y-2">
        <div className="flex items-end justify-between gap-3">
          <FieldLabel htmlFor="issuer" hint="(ঐচ্ছিক)">
            কে দিচ্ছে?
          </FieldLabel>
          <Counter value={values.issuer} max={LIMITS.issuer} />
        </div>
        <input
          id="issuer"
          name="issuer"
          type="text"
          autoComplete="off"
          maxLength={LIMITS.issuer}
          value={values.issuer}
          onChange={(e) => onChange("issuer", e.target.value)}
          placeholder={DEFAULT_ISSUER}
          className={cn(inputClass, "h-12")}
        />
      </div>

      {/* Theme */}
      <fieldset className="space-y-3">
        <legend className="text-[0.95rem] font-semibold text-ink">থিম</legend>
        <div className="grid grid-cols-3 gap-2.5">
          {THEMES.map((theme) => {
            const checked = values.themeId === theme.id;
            const [paper, main, accent] = theme.swatch;
            return (
              <label
                key={theme.id}
                className={cn(
                  "group cursor-pointer rounded-xl border p-2 transition-[border-color,box-shadow,transform] duration-200",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-forest",
                  checked
                    ? "border-forest shadow-[0_0_0_1px_var(--color-forest)_inset]"
                    : "border-line bg-surface hover:-translate-y-0.5 hover:border-sage/45",
                )}
              >
                <input
                  type="radio"
                  name="theme"
                  value={theme.id}
                  checked={checked}
                  onChange={() => onChange("themeId", theme.id as ThemeId)}
                  className="sr-only"
                  aria-describedby={`theme-${theme.id}-desc`}
                />
                <span
                  aria-hidden="true"
                  className="relative block aspect-[4/3] overflow-hidden rounded-lg"
                  style={{ background: paper }}
                >
                  <span className="absolute inset-[5px] rounded-[3px] border" style={{ borderColor: accent }} />
                  <span className="absolute left-1/2 top-[30%] h-[5px] w-[46%] -translate-x-1/2 rounded-full" style={{ background: main }} />
                  <span className="absolute left-1/2 top-[48%] h-[4px] w-[30%] -translate-x-1/2 rounded-full opacity-60" style={{ background: main }} />
                  <span className="absolute bottom-[14%] left-1/2 size-[14px] -translate-x-1/2 rounded-full" style={{ background: accent }} />
                  {checked && (
                    <span className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-forest text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  )}
                </span>
                <span className={cn("mt-2 block text-center text-sm", checked ? "font-semibold text-forest" : "text-ink")}>
                  {theme.name}
                </span>
                <span id={`theme-${theme.id}-desc`} className="sr-only">
                  {theme.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <Button type="submit" size="lg" className="w-full text-[1.05rem]">
        <Sparkles className="size-5" aria-hidden="true" />
        সার্টিফিকেট তৈরি করুন
      </Button>
    </form>
  );
}
