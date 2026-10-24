import type { Metadata, Viewport } from "next";
import { Galada, Hind_Siliguri, Tiro_Bangla } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const tiro = Tiro_Bangla({
  subsets: ["bengali", "latin"],
  weight: "400",
  style: "normal",
  variable: "--font-tiro",
  display: "swap",
});

const galada = Galada({
  subsets: ["bengali", "latin"],
  weight: "400",
  variable: "--font-galada",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["ধারখোর সার্টিফিকেট", "ফানি সার্টিফিকেট", "বাংলা মিম", "certificate generator", "Bangla"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ধারখোর সার্টিফিকেট — বন্ধুর জন্য ফানি সার্টিফিকেট",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#183D32",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" className={`${hind.variable} ${tiro.variable} ${galada.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
