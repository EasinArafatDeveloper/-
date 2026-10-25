"use client";

import { useRef, type Ref } from "react";
import { ImagePlus, LoaderCircle, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  photo: string | null;
  busy: boolean;
  error: string | null;
  onPick: (file: File) => void;
  onRemove: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
};

export function PhotoPicker({ photo, busy, error, onPick, onRemove, buttonRef }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const openPicker = () => inputRef.current?.click();

  return (
    <div className="space-y-2">
      <p id="photo-label" className="text-[0.95rem] font-semibold text-ink">
        বন্ধুর ছবি <span className="text-danger" aria-hidden="true">*</span>
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file);
          e.target.value = "";
        }}
      />

      {photo ? (
        <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- local data URL preview */}
          <img src={photo} alt="বাছাই করা ছবি" className="size-16 rounded-full object-cover ring-2 ring-gold ring-offset-2" />
          <div className="flex flex-1 flex-wrap gap-2">
            <button
              ref={buttonRef}
              type="button"
              onClick={openPicker}
              disabled={busy}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-3 text-sm font-medium text-forest transition-colors hover:border-sage/50 hover:bg-canvas disabled:opacity-50"
            >
              {busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <RefreshCw className="size-4" aria-hidden="true" />}
              ছবি বদলাও
            </button>
            <button
              type="button"
              onClick={onRemove}
              disabled={busy}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-danger transition-colors hover:bg-danger/[0.06] disabled:opacity-50"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              সরাও
            </button>
          </div>
        </div>
      ) : (
        <button
          ref={buttonRef}
          type="button"
          onClick={openPicker}
          disabled={busy}
          aria-describedby={cn("photo-hint", error && "photo-error")}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors",
            error ? "border-danger/60 bg-danger/[0.03]" : "border-sage/40 bg-mint/40 hover:border-forest/50 hover:bg-mint/70",
          )}
        >
          <span className="grid size-11 place-items-center rounded-full bg-surface text-forest shadow-[var(--shadow-card)]">
            {busy ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <ImagePlus className="size-5" aria-hidden="true" />}
          </span>
          <span className="font-semibold text-forest">{busy ? "ছবি প্রস্তুত হচ্ছে..." : "বন্ধুর ছবি বাছাই করো"}</span>
          <span className="text-xs text-muted">JPG, PNG বা WebP • মুখ মাঝখানে থাকলে সবচেয়ে ভালো</span>
        </button>
      )}

      {error && (
        <p id="photo-error" role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      <p id="photo-hint" className="flex items-center gap-1.5 text-xs text-muted">
        <ShieldCheck className="size-3.5 text-sage" aria-hidden="true" />
        ছবি কোথাও আপলোড হয় না—শুধু তোমার ব্রাউজারেই থাকে।
      </p>
    </div>
  );
}
