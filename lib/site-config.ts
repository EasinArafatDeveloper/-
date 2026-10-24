export const siteConfig = {
  name: "ধারখোর সার্টিফিকেট",
  title: "ধারখোর সার্টিফিকেট 😂 — বন্ধুর জন্য ফানি সার্টিফিকেট বানাও",
  description:
    "বন্ধুর নাম দিয়ে তৈরি করো মজার ধারখোর সার্টিফিকেট! ফ্রি জেনারেট করো, PNG ডাউনলোড করো, আর বন্ধুকে পাঠিয়ে দাও।",
  // Set NEXT_PUBLIC_SITE_URL once the production domain is known.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  // Optional external link for the "suggest the next idea" CTA.
  ideaUrl: process.env.NEXT_PUBLIC_IDEA_URL || "",
} as const;
