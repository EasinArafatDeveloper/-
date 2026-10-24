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

/* ------------------------------------------------------------------ */
/* Themes                                                              */
/* ------------------------------------------------------------------ */

export const THEME_IDS = ["classic", "midnight", "playful"] as const;
export type ThemeId = (typeof THEME_IDS)[number];

export type CertificateTheme = {
  id: ThemeId;
  name: string;
  description: string;
  /** Typeface used for the big heading and the recipient's name. */
  display: "serif" | "script";
  decor: "classic" | "midnight" | "playful";
  colors: {
    paperBg: string;
    frame: string;
    gold: string;
    goldSoft: string;
    ink: string;
    heading: string;
    name: string;
    muted: string;
    ribbonBg: string;
    ribbonText: string;
    sealInner: string;
    sealText: string;
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
    display: "serif",
    decor: "classic",
    colors: {
      paperBg:
        "radial-gradient(120% 85% at 50% 0%, #FFFDF7 0%, #FBF6EA 52%, #F2E9D4 100%)",
      frame: "#183D32",
      gold: "#B08A3E",
      goldSoft: "#D8BF86",
      ink: "#20251F",
      heading: "#183D32",
      name: "#183D32",
      muted: "#5F6358",
      ribbonBg: "#183D32",
      ribbonText: "#FAF3E1",
      sealInner: "#183D32",
      sealText: "#F6EACB",
      accent: "#557963",
      pattern: "#C7A45B",
    },
    swatch: ["#FBF6EA", "#183D32", "#C7A45B"],
  },
  {
    id: "midnight",
    name: "মিডনাইট",
    description: "গভীর সবুজ জমিন, ক্রিম লেখা, সোনালি আভা",
    display: "serif",
    decor: "midnight",
    colors: {
      paperBg:
        "radial-gradient(120% 90% at 50% 0%, #21503F 0%, #153629 48%, #0C231A 100%)",
      frame: "#C7A45B",
      gold: "#D4B46E",
      goldSoft: "#7E6E45",
      ink: "#F2EAD6",
      heading: "#F2EAD6",
      name: "#EBD293",
      muted: "#BDB6A0",
      ribbonBg: "#C7A45B",
      ribbonText: "#10291F",
      sealInner: "#0E261C",
      sealText: "#EBD293",
      accent: "#9FC2AC",
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
      paperBg:
        "radial-gradient(120% 90% at 20% 0%, #FFF9EF 0%, #FFF1E2 55%, #FDE5D3 100%)",
      frame: "#E9765B",
      gold: "#DDA23A",
      goldSoft: "#F2CF88",
      ink: "#3B2A24",
      heading: "#2E6A57",
      name: "#C94F36",
      muted: "#7E655A",
      ribbonBg: "#2E6A57",
      ribbonText: "#FFF8EC",
      sealInner: "#E9765B",
      sealText: "#FFF8EC",
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
  const base = display === "script" ? 62 : 58;
  if (len <= 9) return base;
  if (len <= 14) return base - 8;
  if (len <= 20) return base - 15;
  if (len <= 28) return base - 21;
  return base - 25;
}
