"use client";

import { useEffect, useRef, useState } from "react";
import type { CertificateView } from "@/lib/certificate-templates";
import { cn } from "@/lib/utils";
import { CERT_HEIGHT, CERT_WIDTH, CertificateCard } from "./certificate-card";

/** A decorative, non-interactive certificate that scales to fit its container. */
export function ScaledCertificate({ view, className }: { view: CertificateView; className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(entry.contentRect.width / CERT_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: `${CERT_WIDTH} / ${CERT_HEIGHT}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: CERT_WIDTH,
          height: CERT_HEIGHT,
          transform: `scale(${scale ?? 1})`,
          visibility: scale === null ? "hidden" : "visible",
        }}
      >
        <CertificateCard view={view} />
      </div>
    </div>
  );
}
