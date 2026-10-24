"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleAlert, CircleCheck, Download, Info, Link2, LoaderCircle, RotateCcw, Share2 } from "lucide-react";
import {
  canShareFile,
  certificateFileName,
  copyText,
  downloadBlob,
  renderCertificateBlob,
} from "@/lib/download-certificate";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Feedback = { tone: "success" | "error" | "info"; message: string } | null;
type Busy = "download" | "share" | "copy" | null;

type Props = {
  getNode: () => HTMLElement | null;
  /** Serialized certificate content — changes whenever the certificate changes. */
  exportKey: string;
  themeId: string;
  recipientName: string;
  /** False when the current form state can't be exported (e.g. empty name). */
  enabled: boolean;
  onReset: () => void;
};

const EXPORT_ERROR =
  "দুঃখিত, ছবিটা তৈরি করা গেল না। পেজটা একবার রিফ্রেশ করে আবার চেষ্টা করো, অথবা অন্য ব্রাউজার (যেমন Chrome) ব্যবহার করো।";

function pageUrl() {
  if (typeof window === "undefined") return siteConfig.url;
  return `${window.location.origin}${window.location.pathname}`;
}

export function CertificateActions({ getNode, exportKey, themeId, recipientName, enabled, onReset }: Props) {
  const [busy, setBusy] = useState<Busy>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [showFallback, setShowFallback] = useState(false);
  const cache = useRef<{ key: string; promise: Promise<Blob> } | null>(null);

  const getBlob = useCallback((): Promise<Blob> => {
    if (cache.current?.key === exportKey) return cache.current.promise;
    const node = getNode();
    if (!node) return Promise.reject(new Error("Certificate not mounted"));
    const promise = renderCertificateBlob(node, themeId);
    const entry = { key: exportKey, promise };
    cache.current = entry;
    promise.catch(() => {
      if (cache.current === entry) cache.current = null;
    });
    return promise;
  }, [exportKey, getNode, themeId]);

  // Pre-render quietly after edits settle, so Share can open instantly
  // (browsers only allow sharing shortly after a tap).
  useEffect(() => {
    if (!enabled) return;
    const timer = window.setTimeout(() => {
      getBlob().catch(() => {
        /* surfaced only when the user actually asks for the image */
      });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [enabled, getBlob]);

  const fileName = certificateFileName(recipientName);

  async function handleDownload() {
    setBusy("download");
    setFeedback(null);
    try {
      const blob = await getBlob();
      downloadBlob(blob, fileName);
      setFeedback({ tone: "success", message: "PNG তৈরি হয়েছে, ডাউনলোড শুরু হয়েছে!" });
    } catch {
      setFeedback({ tone: "error", message: EXPORT_ERROR });
    } finally {
      setBusy(null);
    }
  }

  async function handleShare() {
    setBusy("share");
    setFeedback(null);
    let blob: Blob;
    try {
      blob = await getBlob();
    } catch {
      setFeedback({ tone: "error", message: EXPORT_ERROR });
      setBusy(null);
      return;
    }

    const file = new File([blob], fileName, { type: "image/png" });
    if (!canShareFile(file)) {
      setShowFallback(true);
      setFeedback({
        tone: "info",
        message: "এই ব্রাউজারে সরাসরি ছবি শেয়ার করা যায় না। নিচ থেকে PNG ডাউনলোড করো বা লিংক কপি করে পাঠাও।",
      });
      setBusy(null);
      return;
    }

    try {
      await navigator.share({
        files: [file],
        title: siteConfig.name,
        text: `ভাই, কালকে দিয়ে দিও 😂 তোমার জন্য একটা বিশেষ সার্টিফিকেট!\nনিজেও বানাও: ${pageUrl()}`,
      });
      setFeedback({ tone: "success", message: "শেয়ার সম্পন্ন! বন্ধুর রিঅ্যাকশনের অপেক্ষায় 😄" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        // User closed the share sheet — not an error.
      } else {
        setShowFallback(true);
        setFeedback({
          tone: "info",
          message: "শেয়ার করা গেল না। নিচ থেকে PNG ডাউনলোড করো বা লিংক কপি করে পাঠাও।",
        });
      }
    } finally {
      setBusy(null);
    }
  }

  async function handleCopyLink() {
    setBusy("copy");
    setFeedback(null);
    try {
      await copyText(pageUrl());
      setFeedback({ tone: "success", message: "লিংক কপি হয়েছে! এখন বন্ধুকে পেস্ট করে পাঠাও।" });
    } catch {
      setFeedback({ tone: "error", message: "লিংক কপি করা গেল না। ব্রাউজারের অ্যাড্রেস বার থেকে কপি করে নাও।" });
    } finally {
      setBusy(null);
    }
  }

  const spinner = <LoaderCircle className="size-4.5 animate-spin" aria-hidden="true" />;
  const disabled = !enabled || busy !== null;

  return (
    <div className="space-y-3">
      <div className="grid gap-2.5 sm:grid-cols-2">
        <Button onClick={handleDownload} disabled={disabled} aria-busy={busy === "download"} size="lg">
          {busy === "download" ? spinner : <Download className="size-4.5" aria-hidden="true" />}
          {busy === "download" ? "তৈরি হচ্ছে..." : "PNG ডাউনলোড"}
        </Button>
        <Button
          onClick={handleShare}
          disabled={disabled}
          aria-busy={busy === "share"}
          variant="gold"
          size="lg"
        >
          {busy === "share" ? spinner : <Share2 className="size-4.5" aria-hidden="true" />}
          {busy === "share" ? "প্রস্তুত হচ্ছে..." : "বন্ধুকে শেয়ার করো"}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {showFallback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid gap-2.5 rounded-xl border border-dashed border-line bg-canvas/60 p-3 sm:grid-cols-2">
              <Button variant="secondary" onClick={handleDownload} disabled={disabled}>
                <Download className="size-4" aria-hidden="true" />
                ছবি ডাউনলোড করো
              </Button>
              <Button variant="secondary" onClick={handleCopyLink} disabled={busy !== null} aria-busy={busy === "copy"}>
                {busy === "copy" ? spinner : <Link2 className="size-4" aria-hidden="true" />}
                ওয়েবসাইটের লিংক কপি
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div aria-live="polite" role="status" className="min-h-[1.5rem]">
        {feedback && (
          <p
            className={cn(
              "flex items-start gap-2 text-sm leading-relaxed",
              feedback.tone === "success" && "text-sage",
              feedback.tone === "error" && "text-danger",
              feedback.tone === "info" && "text-muted",
            )}
          >
            {feedback.tone === "error" ? (
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : feedback.tone === "info" ? (
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : (
              <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            )}
            {feedback.message}
          </p>
        )}
        {!enabled && !feedback && (
          <p className="text-sm text-muted">ডাউনলোড বা শেয়ার করার আগে বন্ধুর নামটা লিখে দাও।</p>
        )}
      </div>

      <Button variant="ghost" onClick={onReset} className="w-full" disabled={busy !== null}>
        <RotateCcw className="size-4" aria-hidden="true" />
        নতুন সার্টিফিকেট বানাও
      </Button>
    </div>
  );
}
