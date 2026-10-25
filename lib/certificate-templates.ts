import { toBengaliDigits } from "./utils";

/* ------------------------------------------------------------------ */
/* Award titles                                                        */
/* ------------------------------------------------------------------ */

export const AWARD_TITLE_IDS = [
  "lifetime-kalke",
  "special-honour",
  "invisible-debtor",
  "bakiraj",
  "promise-champion",
  "kalke-medal",
] as const;

export type AwardTitleId = (typeof AWARD_TITLE_IDS)[number];

export type AwardTitle = {
  id: AwardTitleId;
  label: string;
  /** Default funny line shown when the user leaves the subtitle empty. */
  tagline: string;
};

export const AWARD_TITLES: readonly AwardTitle[] = [
  {
    id: "lifetime-kalke",
    label: "আজীবন কালকে-দেব পুরস্কার",
    tagline: "যাঁর ‘কালকে’ কখনো আসে না, কিন্তু আমাদের আশা কখনো মরে না।",
  },
  {
    id: "special-honour",
    label: "ধার নেওয়ার বিশেষ সম্মাননা",
    tagline: "হাসিমুখে, নিপুণ কৌশলে ধার নেওয়ার অসামান্য দক্ষতার স্বীকৃতিস্বরূপ।",
  },
  {
    id: "invisible-debtor",
    label: "মাসের সেরা অদৃশ্য ঋণী",
    tagline: "টাকার কথা উঠলেই যিনি রহস্যজনকভাবে নেটওয়ার্কের বাইরে চলে যান।",
  },
  {
    id: "bakiraj",
    label: "বন্ধুমহলের বাকিরাজ",
    tagline: "চায়ের দোকান থেকে ক্যান্টিন—সবখানে যাঁর নামে খাতা খোলা।",
  },
  {
    id: "promise-champion",
    label: "প্রতিশ্রুতির বিশ্বচ্যাম্পিয়ন",
    tagline: "প্রতিশ্রুতি দেওয়ায় অপরাজিত, রাখার ব্যাপারে এখনো অনুশীলনরত।",
  },
  {
    id: "kalke-medal",
    label: "বিশেষ কালকে-দেব পদক",
    tagline: "‘ভাই, কালকে দিয়ে দেব!’—এই অমর বাণীর নিরলস প্রচারের জন্য।",
  },
];

/** Special choice: the user types their own award title. */
export const CUSTOM_TITLE_ID = "custom" as const;
export type TitleChoice = AwardTitleId | typeof CUSTOM_TITLE_ID;
export const CUSTOM_TITLE_PLACEHOLDER = "তোমার নিজের টাইটেল";
export const CUSTOM_TITLE_TAGLINE = "‘ভাই, কালকে দিয়ে দেব!’—এই অমূল্য প্রতিশ্রুতির স্বীকৃতিস্বরূপ।";

export function getAwardTitle(id: AwardTitleId): AwardTitle {
  return AWARD_TITLES.find((t) => t.id === id) ?? AWARD_TITLES[0]!;
}

/** The fixed citation printed above the award ribbon. */
export const CITATION =
  "টাকা ধার নিয়ে সময়মতো ফেরত না দেওয়ার অসাধারণ দক্ষতা, মিষ্টি প্রতিশ্রুতি এবং “কালকে দেবো” বলার অনন্য যোগ্যতায়";

/* ------------------------------------------------------------------ */
/* Themes                                                              */
/* ------------------------------------------------------------------ */

export const THEME_IDS = ["classic", "midnight", "playful"] as const;
export type ThemeId = (typeof THEME_IDS)[number];

export type CertificateTheme = {
  id: ThemeId;
  name: string;
  description: string;
  /** Typeface for the big heading and the recipient's name. */
  display: "bold" | "script";
  decor: "classic" | "midnight" | "playful";
  colors: {
    /** Thick outer band around the paper. */
    band: string;
    paperBg: string;
    gold: string;
    goldSoft: string;
    ink: string;
    heading: string;
    /** Bevel/shadow colour under the big heading. */
    headingShadow: string;
    name: string;
    muted: string;
    ribbonBg: string;
    ribbonBorder: string;
    ribbonText: string;
    sealRim: string;
    sealInner: string;
    sealText: string;
    sealRibbon: string;
    /** Handwritten notes and doodles. */
    note: string;
    accent: string;
    pattern: string;
  };
  /** Small swatches used by the theme picker. */
  swatch: [string, string, string];
};

export const THEMES: readonly CertificateTheme[] = [
  {
    id: "classic",
    name: "ক্লাসিক গোল্ড",
    description: "আইভরি কাগজ, বনসবুজ আর সোনালি কারুকাজ",
    display: "bold",
    decor: "classic",
    colors: {
      band: "#183D32",
      paperBg: "radial-gradient(120% 85% at 50% 0%, #FFFDF6 0%, #FBF5E4 55%, #F3EAD2 100%)",
      gold: "#B8913F",
      goldSoft: "#DCC48C",
      ink: "#20251F",
      heading: "#183D32",
      headingShadow: "#C9A552",
      name: "#1B2E26",
      muted: "#4F5A50",
      ribbonBg: "#183D32",
      ribbonBorder: "#C7A45B",
      ribbonText: "#F1DCA2",
      sealRim: "#C29A45",
      sealInner: "#E4C67E",
      sealText: "#183D32",
      sealRibbon: "#183D32",
      note: "#1F4A3B",
      accent: "#2C5A49",
      pattern: "#C7A45B",
    },
    swatch: ["#FBF5E4", "#183D32", "#C7A45B"],
  },
  {
    id: "midnight",
    name: "মিডনাইট",
    description: "গভীর সবুজ জমিন, ক্রিম লেখা, সোনালি আভা",
    display: "bold",
    decor: "midnight",
    colors: {
      band: "#C7A45B",
      paperBg: "radial-gradient(120% 90% at 50% 0%, #21503F 0%, #153629 48%, #0C231A 100%)",
      gold: "#D4B46E",
      goldSoft: "#7E6E45",
      ink: "#F2EAD6",
      heading: "#F6EBCF",
      headingShadow: "#B8913F",
      name: "#F1D791",
      muted: "#C4BDA6",
      ribbonBg: "#0E261C",
      ribbonBorder: "#D4B46E",
      ribbonText: "#F1D791",
      sealRim: "#C29A45",
      sealInner: "#E4C67E",
      sealText: "#10291F",
      sealRibbon: "#C7A45B",
      note: "#E9D49B",
      accent: "#A9CBB6",
      pattern: "#C7A45B",
    },
    swatch: ["#153629", "#F2EAD6", "#C7A45B"],
  },
  {
    id: "playful",
    name: "প্লেফুল",
    description: "উষ্ণ প্যাস্টেল রং আর খেলুড়ে অক্ষর",
    display: "script",
    decor: "playful",
    colors: {
      band: "#E9765B",
      paperBg: "radial-gradient(120% 90% at 20% 0%, #FFF9EF 0%, #FFF1E2 55%, #FDE5D3 100%)",
      gold: "#DDA23A",
      goldSoft: "#F2CF88",
      ink: "#3B2A24",
      heading: "#2E6A57",
      headingShadow: "#F2B58F",
      name: "#C94F36",
      muted: "#6F584D",
      ribbonBg: "#2E6A57",
      ribbonBorder: "#F2CF88",
      ribbonText: "#FFF3DA",
      sealRim: "#DDA23A",
      sealInner: "#F7D27A",
      sealText: "#7A3322",
      sealRibbon: "#E9765B",
      note: "#2E6A57",
      accent: "#2E6A57",
      pattern: "#E9765B",
    },
    swatch: ["#FFF1E2", "#E9765B", "#2E6A57"],
  },
];

export function getTheme(id: ThemeId): CertificateTheme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]!;
}

/* ------------------------------------------------------------------ */
/* View model                                                          */
/* ------------------------------------------------------------------ */

export const DEFAULT_ISSUER = "বন্ধুমহল";
export const NAME_PLACEHOLDER = "বন্ধুর নাম";

export type CertificateView = {
  name: string;
  isPlaceholder: boolean;
  title: string;
  tagline: string;
  issuer: string;
  dateLabel: string;
  serial: string;
  theme: CertificateTheme;
  /** Photo layout: shows a circular photo of the friend (or a placeholder until one is chosen). */
  photoMode?: boolean;
  /** Local data URL of the friend's photo. */
  photo?: string | null;
};

/** A short, playful, deterministic "serial number" derived from the name. */
export function serialFor(name: string): string {
  let hash = 5381;
  for (const ch of name) {
    hash = ((hash << 5) + hash + (ch.codePointAt(0) ?? 0)) >>> 0;
  }
  return `ধা-${toBengaliDigits(1000 + (hash % 9000))}`;
}

/** Pick a font size so long names still fit on the certificate. */
export function nameFontSize(name: string, display: CertificateTheme["display"]): number {
  const len = Array.from(name).length;
  const base = display === "script" ? 46 : 42;
  if (len <= 9) return base;
  if (len <= 14) return base - 5;
  if (len <= 20) return base - 10;
  if (len <= 28) return base - 14;
  return base - 17;
}
