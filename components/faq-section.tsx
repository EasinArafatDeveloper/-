import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "এটা কি কোনো আসল সার্টিফিকেট?",
    a: "একদমই না! এটা পুরোপুরি মজার জন্য বানানো। এতে কোনো আসল লেনদেন, ঋণ বা আর্থিক তথ্য যাচাই করা হয় না—সার্টিফিকেটেও সেটা লেখা থাকে।",
  },
  {
    q: "আমার লেখা নাম কি কোথাও সেভ হয়?",
    a: "না। পুরো সার্টিফিকেট তোমার ব্রাউজারেই তৈরি হয়। কোনো সার্ভারে নাম পাঠানো হয় না, কোনো অ্যাকাউন্টও লাগে না।",
  },
  {
    q: "ডাউনলোড করা ছবিটা কোন সাইজের?",
    a: "১০৮০×১৩৫০ পিক্সেলের PNG—ফেসবুক, ইনস্টাগ্রাম বা মেসেঞ্জারে শেয়ারের জন্য একদম মানানসই ৪:৫ সাইজ।",
  },
  {
    q: "শেয়ার বাটন কাজ না করলে কী করব?",
    a: "কিছু ব্রাউজার (বিশেষ করে ডেস্কটপে) সরাসরি ছবি শেয়ার সাপোর্ট করে না। তখন PNG ডাউনলোড করে পাঠাও, অথবা ওয়েবসাইটের লিংক কপি করে দাও।",
  },
  {
    q: "বন্ধু যদি রাগ করে?",
    a: "এটা বন্ধুত্বের খুনসুটি—অপমান নয়। যে বন্ধু মজাটা নিতে পারে, তাকেই পাঠাও। আর সত্যি টাকা আটকে থাকলে সুন্দর করে সরাসরি কথা বলাই ভালো 🙂",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 id="faq-title" className="font-display text-[2rem] font-bold leading-tight text-forest sm:text-[2.5rem]">
            টুকটাক প্রশ্ন
          </h2>
          <p className="mt-3 max-w-sm text-muted">যা জানতে মন চায়, তার উত্তর এখানে।</p>
        </div>
        <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {FAQS.map((item) => (
            <details key={item.q} className="group px-5 sm:px-6">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-[1.02rem] font-semibold text-ink transition-colors hover:text-forest">
                {item.q}
                <Plus
                  className="size-5 shrink-0 text-sage transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="-mt-1 pb-5 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
