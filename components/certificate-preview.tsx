"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CertificateView } from "@/lib/certificate-templates";
import { CERT_HEIGHT, CERT_WIDTH, CertificateCard } from "./certificate-card";

type Props = {
  view: CertificateView;
  cardRef: Ref<HTMLDivElement>;
  /** Changes every time a certificate is generated — replays the reveal. */
  revealKey: number;
};

const BURST = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const distance = 120 + (i % 3) * 40;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance * 0.8,
    color: ["#C7A45B", "#183D32", "#557963", "#E9765B"][i % 4]!,
    size: i % 3 === 0 ? 10 : 7,
    round: i % 2 === 0,
  };
});

export function CertificatePreview({ view, cardRef, revealKey }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

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
    <div className="relative">
      <div
        ref={frameRef}
        className="relative w-full overflow-hidden rounded-[6px] shadow-[0_1px_2px_rgba(24,61,50,0.08),0_18px_40px_-18px_rgba(24,61,50,0.35)]"
        style={{ aspectRatio: `${CERT_WIDTH} / ${CERT_HEIGHT}` }}
      >
        <motion.div
          key={revealKey}
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: CERT_WIDTH,
            height: CERT_HEIGHT,
            scale: scale ?? 1,
            visibility: scale === null ? "hidden" : "visible",
          }}
          initial={revealKey > 0 && !reduceMotion ? { opacity: 0, y: 18, filter: "blur(6px)" } : false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <CertificateCard ref={cardRef} view={view} />
        </motion.div>
      </div>

      {revealKey > 0 && !reduceMotion && (
        <div key={`burst-${revealKey}`} className="pointer-events-none absolute inset-0" aria-hidden="true">
          {BURST.map((p, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-[62%]"
              style={{
                width: p.size,
                height: p.round ? p.size : p.size / 2.4,
                background: p.color,
                borderRadius: p.round ? 999 : 2,
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
              animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: 1, rotate: i * 40 }}
              transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
