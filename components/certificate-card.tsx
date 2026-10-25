import type { Ref } from "react";
import { CalendarDays, Camera, Handshake } from "lucide-react";
import { CITATION, nameFontSize, type CertificateView } from "@/lib/certificate-templates";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";
import {
  Confetti,
  CornerFiligree,
  Crown,
  LaurelBranch,
  MoneyWings,
  PaperPattern,
  ScrollRule,
  SealGraphic,
  SideLine,
  Signature,
  Smiley,
  SparkleCluster,
  StarRule,
  Swoosh,
} from "./certificate-ornaments";

/** The certificate is designed on a fixed 540×675 (4:5) canvas and scaled for display. */
export const CERT_WIDTH = 540;
export const CERT_HEIGHT = 675;

const CORNERS = [
  { pos: "left-[13px] top-[13px]", flip: "" },
  { pos: "right-[13px] top-[13px]", flip: "scale(-1, 1)" },
  { pos: "left-[13px] bottom-[13px]", flip: "scale(1, -1)" },
  { pos: "right-[13px] bottom-[13px]", flip: "scale(-1, -1)" },
] as const;

const RIBBON_CLIP = "polygon(0 0, 100% 0, calc(100% - 16px) 50%, 100% 100%, 0 100%, 16px 50%)";

type Props = {
  view: CertificateView;
  ref?: Ref<HTMLDivElement>;
};

export function CertificateCard({ view, ref }: Props) {
  const { theme } = view;
  const c = theme.colors;
  const playful = theme.decor === "playful";
  const displayFont = theme.display === "script" ? "font-script font-normal" : "font-display font-extrabold";
  const nameFont = theme.display === "script" ? "font-script font-normal" : "font-display font-bold";
  const nameSize = nameFontSize(view.name, theme.display);
  const photoMode = !!view.photoMode;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`সার্টিফিকেট: ${view.name} — ${view.title}`}
      className="relative overflow-hidden font-sans"
      style={{ width: CERT_WIDTH, height: CERT_HEIGHT, background: c.band, color: c.ink, lineHeight: 1.5 }}
    >
      {/* Paper */}
      <div
        className="absolute inset-[9px] overflow-hidden"
        style={{ background: c.paperBg, borderRadius: playful ? 16 : 2 }}
      >
        <PaperPattern color={c.pattern} opacity={playful ? 0.08 : 0.06} />
        {playful && <Confetti />}
      </div>

      {/* Gold double frame */}
      <div
        className="pointer-events-none absolute inset-[17px]"
        style={{ border: `1.6px solid ${c.gold}`, borderRadius: playful ? 12 : 1 }}
      />
      <div
        className="pointer-events-none absolute inset-[22px]"
        style={{ border: `0.8px ${playful ? "dashed" : "solid"} ${c.gold}`, borderRadius: playful ? 9 : 0, opacity: 0.85 }}
      />

      {/* Corners */}
      {CORNERS.map((corner) => (
        <div key={corner.pos} className={cn("pointer-events-none absolute", corner.pos)} style={{ transform: corner.flip || undefined }}>
          {playful ? <SparkleCluster colors={[c.gold, c.band, c.heading]} /> : <CornerFiligree color={c.gold} />}
        </div>
      ))}

      {/* Handwritten corner notes */}
      <div className="absolute left-[74px] top-[50px] flex -rotate-[10deg] items-end gap-1" style={{ color: c.note }}>
        <p className="font-script" style={{ fontSize: 12.5, lineHeight: 1.25 }}>
          টাকা এখন নেই,
          <br />
          কিন্তু আশা আছে!
        </p>
        <Smiley color={c.note} size={16} />
      </div>
      <div className="absolute right-[72px] top-[48px] flex rotate-[9deg] items-end gap-1" style={{ color: c.note }}>
        <p className="text-right font-script" style={{ fontSize: 12.5, lineHeight: 1.25 }}>
          কালকে
          <br />
          দেবো...
        </p>
        <Smiley color={c.note} size={16} />
      </div>

      {/* Content */}
      <div className="absolute inset-x-[44px] bottom-[30px] top-[32px] flex flex-col items-center text-center">
        {!photoMode && <MoneyWings color={c.note} money={playful ? "#BFE3CF" : "#CFE0C9"} />}
        <div className={photoMode ? "mt-[32px]" : "-mt-[2px]"}>
          <Crown color={c.gold} />
        </div>

        {/* Heading with laurels */}
        <div className="relative w-full">
          <div className="absolute left-[2px] top-[-6px]">
            <LaurelBranch color={c.gold} height={74} />
          </div>
          <div className="absolute right-[2px] top-[-6px]">
            <LaurelBranch color={c.gold} height={74} flip />
          </div>
          <h2
            className={displayFont}
            style={{
              color: c.heading,
              fontSize: playful ? 50 : 45,
              lineHeight: 1.12,
              textShadow: playful
                ? `2px 2px 0 ${c.headingShadow}`
                : `1px 1px 0 ${c.headingShadow}, 2px 2px 0 ${c.headingShadow}, 3px 4px 6px rgba(0,0,0,0.18)`,
              transform: playful ? "rotate(-1.5deg)" : undefined,
            }}
          >
            বিশেষ সার্টিফিকেট
          </h2>
          <div className="mt-[2px] flex items-center justify-center gap-2">
            <SideLine color={c.gold} flip />
            <span className="font-display font-bold" style={{ color: c.heading, fontSize: 16.5, lineHeight: 1.4 }}>
              ধারখোর সম্মাননা
            </span>
            <SideLine color={c.gold} />
          </div>
        </div>

        <div className="mt-[4px]">
          <StarRule color={c.gold} width={210} />
        </div>

        {photoMode && (
          <div className="relative mb-[11px] mt-[2px] size-[80px] shrink-0">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 20deg, ${c.gold}, ${c.goldSoft}, ${c.gold}, ${c.goldSoft}, ${c.gold})`,
                boxShadow: "0 6px 14px -6px rgba(0,0,0,0.35)",
              }}
            />
            <div className="absolute inset-[4px] rounded-full" style={{ background: "#FFFDF6" }} />
            <div
              className="absolute inset-[7px] grid place-items-center overflow-hidden rounded-full"
              style={{ background: c.goldSoft, boxShadow: `inset 0 0 0 1px ${c.gold}` }}
            >
              {view.photo ? (
                // eslint-disable-next-line @next/next/no-img-element -- local data URL, exported with the card
                <img src={view.photo} alt="" className="size-full object-cover" />
              ) : (
                <span className="flex flex-col items-center" style={{ color: c.heading, opacity: 0.7 }}>
                  <Camera className="size-7" strokeWidth={1.6} aria-hidden="true" />
                  <span style={{ fontSize: 11, lineHeight: 1.3 }}>বন্ধুর ছবি</span>
                </span>
              )}
            </div>
            <span
              className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full font-display font-bold"
              style={{
                background: c.ribbonBg,
                color: c.ribbonText,
                border: `1.5px solid ${c.ribbonBorder}`,
                fontSize: 10,
                lineHeight: 1,
                padding: "3px 9px 2px",
              }}
            >
              ★ বিজয়ী ★
            </span>
          </div>
        )}

        <div className="min-h-[6px] flex-1" />

        <p style={{ color: c.ink, opacity: 0.85, fontSize: 13.5, lineHeight: 1.5 }}>এই মর্মে ঘোষণা করা যাচ্ছে যে</p>

        <p
          className={cn(nameFont, "mt-[2px] w-full")}
          style={{
            color: c.name,
            fontSize: nameSize,
            lineHeight: 1.22,
            opacity: view.isPlaceholder ? 0.35 : 1,
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

        <ScrollRule color={c.gold} width={300} />

        {!photoMode && (
          <p
            className="mt-[6px] max-w-[410px]"
            style={{ color: c.ink, opacity: 0.88, fontSize: 12, lineHeight: 1.6, textWrap: "balance" }}
          >
            {CITATION}
          </p>
        )}

        {/* Ribbon with gold border */}
        <div className="mt-[9px]" style={{ transform: playful ? "rotate(-2deg)" : undefined }}>
          <div style={{ background: c.ribbonBorder, clipPath: RIBBON_CLIP, padding: 2.5, maxWidth: 452 }}>
            <div
              className={cn(displayFont, "flex items-center gap-2")}
              style={{
                background: c.ribbonBg,
                color: c.ribbonText,
                clipPath: RIBBON_CLIP,
                padding: "6px 34px 7px",
                fontSize: playful ? 23 : 20.5,
                lineHeight: 1.3,
                fontWeight: playful ? 400 : 700,
              }}
            >
              <span style={{ color: c.ribbonBorder, fontSize: 10 }}>◆</span>
              <span>{view.title}</span>
              <span style={{ color: c.ribbonBorder, fontSize: 10 }}>◆</span>
            </div>
          </div>
        </div>

        <p className="mt-[5px] font-semibold" style={{ color: c.ink, fontSize: 13.5, lineHeight: 1.5 }}>
          সম্মাননায় ভূষিত হলেন।
        </p>

        <p
          className="mt-[3px] max-w-[400px] font-serif"
          style={{
            color: c.muted,
            fontSize: 12.5,
            lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            overflowWrap: "anywhere",
          }}
        >
          {view.tagline}
        </p>

        <p className="mt-[2px] font-script" style={{ color: c.accent, fontSize: 14, lineHeight: 1.5 }}>
          প্রতিশ্রুতি অনুযায়ী টাকা আসার অপেক্ষায়...
        </p>

        {!photoMode && (
          <div className="mt-[4px]">
            <StarRule color={c.gold} width={150} />
          </div>
        )}

        <div className="min-h-[6px] flex-1" />

        {/* Signature · Seal · Date */}
        <div className="grid w-full grid-cols-[1fr_132px_1fr] items-end">
          <div className="pb-[6px] pl-[6px] text-left">
            <Signature color={c.note} />
            <p className="mt-[2px] truncate font-display font-bold" style={{ color: c.heading, fontSize: 15.5, lineHeight: 1.3 }}>
              {view.issuer}
            </p>
            <p style={{ color: c.muted, fontSize: 11, lineHeight: 1.4 }}>প্রদায়ক কর্তৃপক্ষ</p>
          </div>

          <div className="relative h-[112px] w-[132px]">
            <div className="absolute bottom-[34px] left-[-2px]">
              <LaurelBranch color={c.gold} height={58} />
            </div>
            <div className="absolute bottom-[34px] right-[-2px]">
              <LaurelBranch color={c.gold} height={58} flip />
            </div>
            <div className="absolute left-1/2 top-0 h-[108px] w-[92px] -translate-x-1/2">
              <SealGraphic rim={c.sealRim} inner={c.sealInner} ribbon={c.sealRibbon} line={c.sealText} />
              <div className="absolute inset-x-0 top-0 flex h-[79px] flex-col items-center justify-center" style={{ color: c.sealText }}>
                <Handshake className="size-[15px]" strokeWidth={2} aria-hidden="true" />
                <span className="font-display font-bold" style={{ fontSize: 12.5, lineHeight: 1.15, marginTop: 1 }}>
                  বিশেষ
                </span>
                <span className="font-display font-bold" style={{ fontSize: 13.5, lineHeight: 1.15 }}>
                  সম্মাননা
                </span>
                <span style={{ fontSize: 6.5, letterSpacing: 2, marginTop: 1 }}>★★★</span>
              </div>
            </div>
          </div>

          <div className="pb-[6px] pr-[6px] text-left" style={{ justifySelf: "end" }}>
            <p className="flex items-center gap-1.5" style={{ color: c.heading, fontSize: 12, lineHeight: 1.4 }}>
              <CalendarDays className="size-[15px]" strokeWidth={2} aria-hidden="true" />
              তারিখ
            </p>
            <p className="mt-[2px] whitespace-nowrap font-semibold" style={{ color: c.heading, fontSize: 15, lineHeight: 1.4 }}>
              {view.dateLabel || " "}
            </p>
            <div className="mt-[4px] w-[124px]" style={{ borderTop: `1.2px dashed ${c.gold}` }} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-[8px] flex w-full items-end justify-between">
          <div className="flex items-center gap-2 text-left">
            <BrandMark className="size-[26px]" />
            <div>
              <p className="font-display font-bold" style={{ color: c.heading, fontSize: 12.5, lineHeight: 1.2 }}>
                ধারখোর সার্টিফিকেট
              </p>
              <p style={{ color: c.muted, fontSize: 9.5, lineHeight: 1.3 }}>
                একটি মজার জেনারেটর • ক্রমিক {view.serial}
              </p>
            </div>
          </div>
          <div className="flex -rotate-[8deg] flex-col items-end" style={{ color: c.note }}>
            <div className="flex items-end gap-1">
              <p className="text-right font-script" style={{ fontSize: 12.5, lineHeight: 1.25 }}>
                শুধুমাত্র মজা ও
                <br />
                বন্ধুত্বের জন্য!
              </p>
              <Smiley color={c.note} size={15} />
            </div>
            <Swoosh color={c.note} />
          </div>
        </div>
      </div>
    </div>
  );
}
