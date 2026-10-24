import { CertificateStudio } from "@/components/certificate-studio";
import { FaqSection } from "@/components/faq-section";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <a
        href="#generator"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-white"
      >
        সরাসরি জেনারেটরে যাও
      </a>
      <SiteHeader />
      <main>
        <Hero />

        <section
          id="generator"
          aria-labelledby="generator-title"
          className="scroll-mt-4 border-y border-line/70 bg-[#F1EFE8]/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="mb-8 max-w-2xl">
              <h2 id="generator-title" className="font-serif text-3xl leading-tight text-forest sm:text-[2.4rem]">
                সার্টিফিকেট জেনারেটর
              </h2>
              <p className="mt-2 text-muted">নাম লেখো, টাইটেল আর থিম বাছো—সার্টিফিকেট সাথে সাথে বদলাতে থাকবে।</p>
            </div>
            <CertificateStudio />
          </div>
        </section>

        <HowItWorks />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
