import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  return (
    <header className="border-b border-line/70 bg-canvas/85 backdrop-blur supports-[backdrop-filter]:bg-canvas/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-3 rounded-lg" aria-label="ধারখোর সার্টিফিকেট — শুরুতে যাও">
          <BrandMark className="size-9 shrink-0 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-[1.15rem] text-forest">ধারখোর সার্টিফিকেট</span>
            <span className="text-xs text-muted">একটি মজার জেনারেটর</span>
          </span>
        </a>
        <nav aria-label="প্রধান">
          <a
            href="#how-it-works"
            className="rounded-lg px-3 py-2 text-sm font-medium text-forest transition-colors hover:bg-forest/[0.06]"
          >
            কীভাবে কাজ করে
          </a>
        </nav>
      </div>
    </header>
  );
}
