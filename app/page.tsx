import { CertificateStudio } from "@/components/certificate-studio";
import { ChallengeStrip } from "@/components/challenge-strip";
import { FaqSection } from "@/components/faq-section";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { ReactionsSection } from "@/components/reactions-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhyFun } from "@/components/why-fun";

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
        <ChallengeStrip />
        <HowItWorks />

        <section
          id="generator"
          aria-labelledby="generator-title"
          className="scroll-mt-20 border-y border-line/70 bg-[#F1EFE8]/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
            <div className="mb-8 max-w-2xl">
              <p className="text-sm font-semibold text-sage">পুরো কাস্টমাইজেশন</p>
              <h2 id="generator-title" className="mt-1 font-display text-[2rem] font-bold leading-tight text-forest sm:text-[2.5rem]">
                সার্টিফিকেট জেনারেটর
              </h2>
              <p className="mt-2 text-muted">নাম লেখো, টাইটেল আর থিম বাছো—সার্টিফিকেট সাথে সাথে বদলাতে থাকবে।</p>
            </div>
            <CertificateStudio />
          </div>
        </section>

        <WhyFun />
        <ReactionsSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
