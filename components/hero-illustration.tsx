/** Decorative hero art built from CSS + tiny SVGs (no images). */
export function HeroIllustration() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-[300px] w-full max-w-[400px] select-none sm:h-[340px]">
      {/* back sheet */}
      <div className="absolute left-[18%] top-[8%] h-[78%] w-[62%] rotate-[7deg] rounded-[6px] border border-line bg-[#F3EEE1] shadow-[0_18px_40px_-24px_rgba(24,61,50,0.45)]" />

      {/* front mini certificate */}
      <div className="absolute left-[12%] top-[6%] h-[80%] w-[64%] -rotate-[3deg] animate-float-slow rounded-[6px] bg-[radial-gradient(120%_85%_at_50%_0%,#FFFDF7_0%,#FBF6EA_55%,#F2E9D4_100%)] p-2.5 shadow-[0_24px_50px_-24px_rgba(24,61,50,0.55)]">
        <div className="relative flex h-full flex-col items-center border-[1.5px] border-forest p-1">
          <div className="flex h-full w-full flex-col items-center border border-gold px-3 pt-4 text-center">
            <span className="text-[10px] tracking-[0.3em] text-gold">★ ★ ★</span>
            <span className="mt-1 font-serif text-[1.15rem] leading-tight text-forest sm:text-[1.3rem]">বিশেষ সার্টিফিকেট</span>
            <span className="mt-2 h-px w-16 bg-gold" />
            <span className="mt-3 font-serif text-[1.5rem] leading-none text-forest/85 sm:text-[1.7rem]">রাকিব</span>
            <span
              className="mt-3 bg-forest px-4 py-1 text-[10.5px] text-[#FAF3E1]"
              style={{ clipPath: "polygon(0 0,100% 0,calc(100% - 7px) 50%,100% 100%,0 100%,7px 50%)" }}
            >
              কালকে-দেব পদক
            </span>
            <div className="mt-auto mb-3 grid size-12 place-items-center rounded-full bg-gold shadow-[inset_0_0_0_3px_#FBF6EA,inset_0_0_0_5px_#C7A45B]">
              <span className="font-serif text-[8px] leading-tight text-forest">সম্মাননা</span>
            </div>
          </div>
        </div>
      </div>

      {/* speech bubble */}
      <div className="absolute right-0 top-[2%] animate-float rounded-2xl rounded-bl-sm bg-forest px-4 py-2.5 text-[0.95rem] font-medium text-[#FBF7EC] shadow-[0_14px_30px_-14px_rgba(24,61,50,0.8)] sm:right-[-2%]">
        ভাই, কালকে দিয়ে দেব! 🤞
      </div>

      {/* calendar chip */}
      <div className="absolute bottom-[4%] right-[4%] w-[132px] rotate-[4deg] overflow-hidden rounded-xl border border-line bg-surface shadow-[0_16px_32px_-18px_rgba(24,61,50,0.55)]">
        <div className="bg-[#E9765B] px-3 py-1 text-center text-[11px] font-semibold text-white">ফেরতের তারিখ</div>
        <div className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-center">
          <span className="font-serif text-lg leading-none text-forest">কাল</span>
          <svg viewBox="0 0 24 24" className="size-4 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
            <path d="M18 3v4h-4M6 21v-4h4" />
          </svg>
          <span className="font-serif text-lg leading-none text-forest">কাল</span>
        </div>
      </div>

      {/* coin */}
      <div className="absolute bottom-[16%] left-[2%] grid size-12 animate-float place-items-center rounded-full bg-gold font-serif text-xl text-forest shadow-[inset_0_0_0_3px_#e4cf9b,0_10px_20px_-10px_rgba(143,111,46,0.9)] [animation-delay:-2s]">
        ৳
      </div>
    </div>
  );
}
