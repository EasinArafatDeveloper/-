import { z } from "zod";
import {
  AWARD_TITLE_IDS,
  CUSTOM_TITLE_ID,
  DEFAULT_ISSUER,
  THEME_IDS,
  type ThemeId,
  type TitleChoice,
} from "./certificate-templates";
import { charCount, cleanText, toBengaliDigits } from "./utils";

export const LIMITS = {
  name: 40,
  customTitle: 32,
  subtitle: 90,
  issuer: 30,
} as const;

const tooLong = (max: number) =>
  `সর্বোচ্চ ${toBengaliDigits(max)} অক্ষর লেখা যাবে`;

const cleaned = z.string().transform(cleanText);

export const certificateSchema = z.object({
  name: cleaned.pipe(
    z
      .string()
      .min(1, "বন্ধুর নামটা লিখে ফেলো—নাম ছাড়া সার্টিফিকেট হয় না!")
      .refine((v) => charCount(v) <= LIMITS.name, tooLong(LIMITS.name))
      .refine((v) => /[\p{L}\p{N}]/u.test(v), "নামে অন্তত একটি অক্ষর থাকতে হবে"),
  ),
  titleId: z.enum([...AWARD_TITLE_IDS, CUSTOM_TITLE_ID]),
  customTitle: cleaned.pipe(
    z.string().refine((v) => charCount(v) <= LIMITS.customTitle, tooLong(LIMITS.customTitle)),
  ),
  subtitle: cleaned.pipe(
    z.string().refine((v) => charCount(v) <= LIMITS.subtitle, tooLong(LIMITS.subtitle)),
  ),
  issuer: cleaned
    .pipe(z.string().refine((v) => charCount(v) <= LIMITS.issuer, tooLong(LIMITS.issuer)))
    .transform((v) => v || DEFAULT_ISSUER),
  themeId: z.enum(THEME_IDS),
}).superRefine((data, ctx) => {
  if (data.titleId === CUSTOM_TITLE_ID && !data.customTitle) {
    ctx.addIssue({
      code: "custom",
      path: ["customTitle"],
      message: "নিজের টাইটেলটা লিখে ফেলো, অথবা উপরের কোনো একটা বেছে নাও",
    });
  }
});

export type CertificateFormValues = {
  name: string;
  titleId: TitleChoice;
  customTitle: string;
  subtitle: string;
  issuer: string;
  themeId: ThemeId;
};

export type CertificateData = z.output<typeof certificateSchema>;

export type FieldErrors = Partial<Record<keyof CertificateFormValues, string>>;

export const DEFAULT_VALUES: CertificateFormValues = {
  name: "",
  titleId: "lifetime-kalke",
  customTitle: "",
  subtitle: "",
  issuer: "",
  themeId: "classic",
};

export function validateCertificate(
  values: CertificateFormValues,
): { success: true; data: CertificateData } | { success: false; errors: FieldErrors } {
  const result = certificateSchema.safeParse(values);
  if (result.success) return { success: true, data: result.data };

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && key in values && !errors[key as keyof FieldErrors]) {
      errors[key as keyof FieldErrors] = issue.message;
    }
  }
  return { success: false, errors };
}
