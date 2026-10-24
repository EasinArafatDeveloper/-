import type { CSSProperties, Ref } from "react";
import { nameFontSize, type CertificateView } from "@/lib/certificate-templates";
import { cn } from "@/lib/utils";
import {
  Confetti,
  CornerFlourish,
  DiamondRule,
  Hourglass,
  LaurelSprig,
  NameFlourish,
  PaperPattern,
  SealGraphic,
  SparkleCluster,
  Star,
} from "./certificate-ornaments";

/** The certificate is designed on a fixed 540×675 (4:5) canvas and scaled for display. */
export const CERT_WIDTH = 540;
export const CERT_HEIGHT = 675;

const CORNERS = [
  { pos: "left-[24px] top-[24px]", flip: "" },
  { pos: "right-[24px] top-[24px]", flip: "scale(-1, 1)" },
  { pos: "left-[24px] bottom-[24px]", flip: "scale(1, -1)" },
  { pos: "right-[24px] bottom-[24px]", flip: "scale(-1, -1)" },
] as const;

type Props = {
  view: CertificateView;
  ref?: Ref<HTMLDivElement>;
};

export function CertificateCard({ view, ref }: Props) {
  const { theme } = view;
  const c = theme.colors;
  const playful = theme.decor === "playful";
  const midnight = theme.decor === "midnight";
  const displayFont = theme.display === "script" ? "font-script" : "font-serif";
  const nameSize = nameFontSize(view.name, theme.display);

  const ribbonClip = "polygon(0 0, 100% 0, calc(100% - 14px) 50%, 100% 100%, 0 100%, 14px 50%)";

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`সার্টিফিকেট: ${view.name} — ${view.title}`}
      className="relative overflow-hidden font-sans"
      style={{
        width: CERT_WIDTH,
        height: CERT_HEIGHT,
        background: c.paperBg,
        color: c.ink,
        lineHeight: 1.5,
      }}
    >
      <PaperPattern color={c.pattern} opacity={midnight ? 0.09 : playful ? 0.08 : 0.07} />
      {playful && <Confetti />}

      {/* Double-line frame */}
      <div
        className="pointer-events-none absolute inset-[12px]"
        style={{
          border: `${playful ? 2.5 : 2}px solid ${c.frame}`,
          borderRadius: playful ? 18 : 2,
        }}
      />
      <div
        className="pointer-events-none absolute inset-[18px]"
        style={{
          border: `1px ${playful ? "dashed" : "solid"} ${playful ? c.frame : c.gold}`,
          borderRadius: playful ? 13 : 1,
          opacity: playful ? 0.55 : 1,
        }}
      />

      {/* Corner ornaments */}
      {CORNERS.map((corner) => (
        <div
          key={corner.pos}
          className={cn("pointer-events-none absolute", corner.pos)}
          style={{ transform: corner.flip || undefined }}
        >
          {playful ? (
            <SparkleCluster colors={[c.gold, c.frame, c.heading]} />
          ) : (
            <CornerFlourish color={c.gold} />
          )}
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-x-[50px] top-[50px] bottom-[36px] flex flex-col items-center text-center">
        <div className="flex h-[22px] items-center gap-2">
          {playful ? (
            <>
              <Star color={c.frame} size={11} />
              <Star color={c.gold} size={16} />
              <Star color={c.heading} size={11} />
            </>
          ) : (
            <>
              <LaurelSprig color={c.gold} />
              <Star color={c.gold} size={15} />
              <LaurelSprig color={c.gold} flip />
            </>
          )}
        </div>

        <h2
          className={cn(displayFont, "mt-[6px] font-normal")}
          style={{
            color: c.heading,
            fontSize: playful ? 47 : 44,
            lineHeight: 1.3,
            transform: playful ? "rotate(-1.5deg)" : undefined,
          }}
        >
          বিশেষ সার্টিফিকেট
        </h2>

        <div className="mt-[6px]">
          <DiamondRule color={c.gold} width={playful ? 150 : 190} />
        </div>

        <div className="min-h-[12px] flex-1" />

        <p style={{ color: c.muted, fontSize: 15.5, lineHeight: 1.6 }}>
          এই মর্মে ঘোষণা করা যাচ্ছে যে
        </p>

        <p
          className={cn(displayFont, "mt-[2px] w-full font-normal")}
          style={{
            color: c.name,
            fontSize: nameSize,
            lineHeight: 1.28,
            opacity: view.isPlaceholder ? 0.38 : 1,
            overflowWrap: "anywhere",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            paddingBottom: 2,
          }}
        >
          {view.name}
        </p>

        <div className="mt-[2px]">
          <NameFlourish color={c.gold} />
        </div>

        <p className="mt-[10px]" style={{ color: c.muted, fontSize: 14, lineHeight: 1.6 }}>
          বন্ধুমহলের সর্বসম্মতিক্রমে অর্জন করেছেন
        </p>

        <div
          className="mt-[10px]"
          style={{ transform: playful ? "rotate(-2deg)" : undefined }}
        >
          <div
            className={cn(displayFont, "font-normal")}
            style={
              {
                background: c.ribbonBg,
                color: c.ribbonText,
                clipPath: ribbonClip,
                padding: "7px 36px 8px",
                fontSize: playful ? 23 : 21,
                lineHeight: 1.35,
                maxWidth: 440,
                boxShadow: midnight ? "none" : undefined,
              } satisfies CSSProperties
            }
          >
            {view.title}
          </div>
        </div>

        <p
          className="mt-[12px] max-w-[390px]"
          style={{
            color: c.ink,
            opacity: 0.86,
            fontSize: 14.5,
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            overflowWrap: "anywhere",
          }}
        >
          {view.tagline}
        </p>

        <p
          className="mt-[10px] inline-flex items-center gap-[6px] rounded-full px-[12px] py-[3px]"
          style={{
            color: c.accent,
            fontSize: 13,
            lineHeight: 1.5,
            border: `1px solid ${midnight ? "rgba(199,164,91,0.45)" : playful ? "rgba(46,106,87,0.35)" : "rgba(85,121,99,0.35)"}`,
            background: midnight ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)",
          }}
        >
          <Hourglass color={c.accent} />
          প্রতিশ্রুতি অনুযায়ী টাকা আসার অপেক্ষায়...
        </p>

        <div className="min-h-[12px] flex-1" />

        {/* Issuer · Seal · Date */}
        <div className="grid w-full grid-cols-[1fr_96px_1fr] items-end gap-[10px]">
          <div className="pb-[6px]">
            <p
              className={cn(displayFont, "truncate font-normal")}
              style={{ color: c.heading, fontSize: 19, lineHeight: 1.35 }}
            >
              {view.issuer}
            </p>
            <div className="mx-auto mt-[3px] h-px w-[132px]" style={{ background: c.gold }} />
            <p className="mt-[4px]" style={{ color: c.muted, fontSize: 11.5 }}>
              প্রদানকারী
            </p>
          </div>

          <div className="relative h-[110px] w-[96px]">
            <SealGraphic rim={c.gold} inner={c.sealInner} ribbon={c.frame} line={c.goldSoft} />
            <div
              className="absolute inset-x-0 top-0 flex h-[83px] flex-col items-center justify-center"
              style={{ color: c.sealText }}
            >
              <span style={{ fontSize: 8, lineHeight: 1, letterSpacing: 2, opacity: 0.9 }}>★ ★ ★</span>
              <span className="font-serif" style={{ fontSize: 13, lineHeight: 1.3, marginTop: 2 }}>
                বিশেষ
              </span>
              <span className="font-serif" style={{ fontSize: 14.5, lineHeight: 1.2 }}>
                সম্মাননা
              </span>
            </div>
          </div>

          <div className="pb-[6px]">
            <p
              className="truncate"
              style={{ color: c.heading, fontSize: 16, lineHeight: 1.45, fontWeight: 600 }}
            >
              {view.dateLabel || " "}
            </p>
            <div className="mx-auto mt-[4px] h-px w-[132px]" style={{ background: c.gold }} />
            <p className="mt-[4px]" style={{ color: c.muted, fontSize: 11.5 }}>
              প্রদানের তারিখ
            </p>
          </div>
        </div>

        <p className="mt-[10px]" style={{ color: c.muted, fontSize: 10.5, lineHeight: 1.5 }}>
          শুধুমাত্র মজা ও বন্ধুত্বের জন্য&nbsp;&nbsp;•&nbsp;&nbsp;
          <span style={{ color: c.heading, fontWeight: 600 }}>ধারখোর সার্টিফিকেট</span>
          &nbsp;&nbsp;•&nbsp;&nbsp;ক্রমিক {view.serial}
        </p>
      </div>
    </div>
  );
}
