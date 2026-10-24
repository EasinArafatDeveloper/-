import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2.5">
          <BrandMark className="size-6" />
          <span>
            <span className="font-serif text-forest">ধারখোর সার্টিফিকেট</span> — শুধুমাত্র মজা ও বন্ধুত্বের জন্য
          </span>
        </p>
        <p>৩০ দিনে ৩০ ওয়েবসাইট • Day ০১ • কোনো তথ্য সংরক্ষণ করা হয় না</p>
      </div>
    </footer>
  );
}
