import { MessageCircleHeart } from "lucide-react";

/* Clearly labelled, made-up example reactions — not real user reviews. */
const REACTIONS = [
  { initial: "র", tone: "bg-[#DDE9E0] text-forest", who: "যে বন্ধু ধার নিয়েছে", text: "ভাই এটা কী বানাইলি 😭 সার্টিফিকেট দেখে নিজেই হাসতেছি। কালকে সত্যি দিয়ে দিব!", emoji: "😂😅" },
  { initial: "ত", tone: "bg-[#F6E6C8] text-gold-deep", who: "গ্রুপের অ্যাডমিন", text: "গ্রুপের সবাইকে একটা করে দিলাম। আজকে থেকে এটাই অফিসিয়াল পুরস্কার 🏆", emoji: "🤣❤️" },
  { initial: "জ", tone: "bg-[#F7DCD3] text-[#A8402F]", who: "চায়ের দোকানের মামা", text: "এইটা প্রিন্ট করে দোকানে টাঙায় দিমু। বাকির খাতা আর লাগবো না!", emoji: "😆👏" },
  { initial: "ন", tone: "bg-[#E4E0F3] text-[#4B3F86]", who: "বেস্ট ফ্রেন্ড", text: "আমার নামেও একটা বানাইছে… এখন আমি বন্ধুমহলের বাকিরাজ 😎", emoji: "😎🔥" },
] as const;

export function ReactionsSection() {
  return (
    <section aria-labelledby="reactions-title" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-line bg-surface/70 p-5 shadow-[var(--shadow-card)] sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="reactions-title" className="font-display text-[1.75rem] font-bold leading-tight text-forest sm:text-[2.1rem]">
              বন্ধুর রিঅ্যাকশন যেমন হতে পারে
            </h2>
            <p className="mt-1 text-muted">সার্টিফিকেট পাঠানোর পর মেসেঞ্জারে যা যা ঘটতে পারে 😄</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1 text-xs text-muted ring-1 ring-line">
            <MessageCircleHeart className="size-3.5" aria-hidden="true" />
            উদাহরণ—মজার জন্য বানানো
          </span>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REACTIONS.map((r) => (
            <li
              key={r.who}
              className="flex flex-col rounded-2xl border border-line bg-surface p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] motion-reduce:hover:translate-y-0"
            >
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className={`grid size-10 place-items-center rounded-full font-display text-lg font-bold ${r.tone}`}>
                  {r.initial}
                </span>
                <span className="text-sm font-semibold text-ink">{r.who}</span>
              </div>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink/85">{r.text}</p>
              <p className="mt-3 text-sm" aria-hidden="true">
                {r.emoji}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
