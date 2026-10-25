import { useId } from "react";

/* All ornaments are inline SVG so they export perfectly to PNG.
   No Bengali text is drawn inside SVG — shaping stays in HTML. */

type ColorProps = { color: string };

function safeId(raw: string) {
  return raw.replace(/[^a-zA-Z0-9_-]/g, "");
}

/** Ornate gold corner: double bracket, scrolls, leaves and dots. Top-left orientation. */
export function CornerFiligree({ color }: ColorProps) {
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <g fill="none" stroke={color} strokeLinecap="round">
        <path d="M5 46 V16 Q5 5 16 5 H46" strokeWidth="1.6" />
        <path d="M11 38 V19 Q11 11 19 11 H38" strokeWidth="0.9" />
        <path d="M17 17 C27 15 31 21 29 27 C27.5 31 22 30 22.5 26 C23 23 27 23.5 27 26" strokeWidth="1.2" />
        <path d="M46 5 C52 5 56 8 58 13" strokeWidth="1" />
        <path d="M5 46 C5 52 8 56 13 58" strokeWidth="1" />
      </g>
      <g fill={color}>
        <path d="M46 5 C52 1 60 2 64 7 C58 9 51 9 46 5Z" />
        <path d="M5 46 C1 52 2 60 7 64 C9 58 9 51 5 46Z" />
        <path d="M30 9 C34 6 39 6 42 9 C38 11 34 11 30 9Z" opacity="0.8" />
        <path d="M9 30 C6 34 6 39 9 42 C11 38 11 34 9 30Z" opacity="0.8" />
        <circle cx="5" cy="5" r="2.6" />
        <circle cx="64.5" cy="7" r="1.6" />
        <circle cx="7" cy="64.5" r="1.6" />
        <rect x="14" y="14" width="5" height="5" transform="rotate(45 16.5 16.5)" />
      </g>
    </svg>
  );
}

export function SparkleCluster({ colors }: { colors: [string, string, string] }) {
  const star = "M0 -10 C1.2 -2.4 2.4 -1.2 10 0 C2.4 1.2 1.2 2.4 0 10 C-1.2 2.4 -2.4 1.2 -10 0 C-2.4 -1.2 -1.2 -2.4 0 -10Z";
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" aria-hidden="true">
      <path d={star} transform="translate(18 18) scale(1.2)" fill={colors[0]} />
      <path d={star} transform="translate(42 10) scale(0.5)" fill={colors[1]} />
      <path d={star} transform="translate(10 42) scale(0.5)" fill={colors[2]} />
      <circle cx="36" cy="30" r="2.6" fill={colors[2]} />
      <circle cx="26" cy="44" r="1.8" fill={colors[1]} />
    </svg>
  );
}

export function Crown({ color }: ColorProps) {
  return (
    <svg viewBox="0 0 44 28" width="40" height="26" aria-hidden="true">
      <path d="M5 21 L3 7 L13 14 L22 3 L31 14 L41 7 L39 21 Z" fill={color} />
      <rect x="5" y="22.5" width="34" height="3.5" rx="1" fill={color} />
      <circle cx="3" cy="6.5" r="2.2" fill={color} />
      <circle cx="22" cy="2.6" r="2.4" fill={color} />
      <circle cx="41" cy="6.5" r="2.2" fill={color} />
      <path d="M12 18 L32 18" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}

/** A curved laurel branch with leaves along a quadratic curve. Grows upward, opening to the right. */
export function LaurelBranch({ color, height = 80, flip = false }: ColorProps & { height?: number; flip?: boolean }) {
  const p0 = { x: 30, y: 78 };
  const p1 = { x: 2, y: 46 };
  const p2 = { x: 24, y: 4 };
  const at = (t: number) => ({
    x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x,
    y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y,
  });
  const tangent = (t: number) => {
    const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
    const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };
  const leaves = [0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84];
  return (
    <svg
      viewBox="0 0 40 82"
      width={(height * 40) / 82}
      height={height}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d={`M${p0.x} ${p0.y} Q${p1.x} ${p1.y} ${p2.x} ${p2.y}`} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {leaves.map((t, i) => {
        const pt = at(t);
        const angle = tangent(t);
        const size = 1 - t * 0.35;
        return (
          <g key={t} transform={`translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) rotate(${angle.toFixed(1)})`}>
            <ellipse cx={4.5 * size} cy={i % 2 ? 4 : -4} rx={6 * size} ry={2.4 * size} fill={color} transform={`rotate(${i % 2 ? 32 : -32})`} />
            <ellipse cx={4.5 * size} cy={i % 2 ? -3.4 : 3.4} rx={5 * size} ry={2 * size} fill={color} opacity="0.85" transform={`rotate(${i % 2 ? -30 : 30})`} />
          </g>
        );
      })}
      <ellipse cx={p2.x} cy={p2.y - 1} rx="2.2" ry="4" fill={color} />
    </svg>
  );
}

/** ── ★ ── divider with three stars. */
export function StarRule({ color, width = 200 }: ColorProps & { width?: number }) {
  const mid = width / 2;
  const star = (cx: number, r: number) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = (Math.PI / 5) * i - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * 0.45;
      return `${(cx + rad * Math.cos(a)).toFixed(2)},${(7 + rad * Math.sin(a)).toFixed(2)}`;
    }).join(" ");
    return <polygon key={cx} points={pts} fill={color} />;
  };
  return (
    <svg viewBox={`0 0 ${width} 14`} width={width} height="14" aria-hidden="true">
      <path d={`M2 7 H${mid - 30} M${mid + 30} 7 H${width - 2}`} stroke={color} strokeWidth="0.9" />
      {star(mid - 18, 3.4)}
      {star(mid, 6)}
      {star(mid + 18, 3.4)}
    </svg>
  );
}

/** Line with a small scroll ornament in the middle (under the name). */
export function ScrollRule({ color, width = 300 }: ColorProps & { width?: number }) {
  const mid = width / 2;
  return (
    <svg viewBox={`0 0 ${width} 16`} width={width} height="16" aria-hidden="true">
      <path d={`M2 8 H${mid - 26} M${mid + 26} 8 H${width - 2}`} stroke={color} strokeWidth="1" />
      <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
        <path d={`M${mid - 24} 8 C${mid - 16} 8 ${mid - 12} 2 ${mid - 6} 4 C${mid - 2} 5 ${mid - 3} 10 ${mid - 7} 9`} />
        <path d={`M${mid + 24} 8 C${mid + 16} 8 ${mid + 12} 2 ${mid + 6} 4 C${mid + 2} 5 ${mid + 3} 10 ${mid + 7} 9`} />
      </g>
      <path d={`M${mid} 3 L${mid + 3.5} 8 L${mid} 13 L${mid - 3.5} 8Z`} fill={color} />
    </svg>
  );
}

/** Line — label — line, used around "ধারখোর সম্মাননা". */
export function SideLine({ color, flip = false }: ColorProps & { flip?: boolean }) {
  return (
    <svg viewBox="0 0 70 8" width="70" height="8" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M2 4 H58" stroke={color} strokeWidth="1" />
      <circle cx="63" cy="4" r="2.4" fill={color} />
    </svg>
  );
}

/** Banknotes with wings — the money flying away. */
export function MoneyWings({ color, money }: ColorProps & { money: string }) {
  return (
    <svg viewBox="0 0 84 46" width="76" height="42" aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* left wing */}
        <path d="M30 22 C22 10 12 8 4 10 C10 13 12 15 13 17 C9 17 7 19 6 21 C12 21 15 22 17 24 C14 25 13 27 13 29 C20 27 25 26 30 27" fill="#fff" />
        {/* right wing */}
        <path d="M54 22 C62 10 72 8 80 10 C74 13 72 15 71 17 C75 17 77 19 78 21 C72 21 69 22 67 24 C70 25 71 27 71 29 C64 27 59 26 54 27" fill="#fff" />
      </g>
      {/* notes stack */}
      <g transform="rotate(-14 42 26)">
        <rect x="28" y="17" width="28" height="16" rx="2" fill={money} stroke={color} strokeWidth="1.4" />
        <rect x="26" y="20" width="28" height="16" rx="2" fill={money} stroke={color} strokeWidth="1.4" />
        <circle cx="40" cy="28" r="3.6" fill="none" stroke={color} strokeWidth="1.2" />
        <path d="M30 24 h4 M46 32 h4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      </g>
      <g stroke={color} strokeWidth="1.4" strokeLinecap="round">
        <path d="M60 4 l3 -3 M66 9 l5 -2 M18 4 l-3 -3" />
      </g>
    </svg>
  );
}

export function Smiley({ color, size = 18 }: ColorProps & { size?: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
      <circle cx="10" cy="10" r="8.4" fill="none" stroke={color} strokeWidth="1.4" />
      <circle cx="7.2" cy="8" r="1.1" fill={color} />
      <circle cx="12.8" cy="8" r="1.1" fill={color} />
      <path d="M6 11.6 C7.5 14.6 12.5 14.6 14 11.6" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Signature({ color }: ColorProps) {
  return (
    <svg viewBox="0 0 120 40" width="112" height="37" aria-hidden="true">
      <path
        d="M6 30 C14 30 20 8 26 6 C31 4 24 32 30 32 C35 32 38 14 42 14 C45 14 42 28 46 28 C52 28 58 16 64 18 C70 20 60 30 68 29 C78 28 92 20 114 18"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 36 C40 33 80 33 116 35" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function Swoosh({ color }: ColorProps) {
  return (
    <svg viewBox="0 0 70 12" width="64" height="11" aria-hidden="true">
      <path d="M2 9 C20 2 46 2 68 6" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Gold rosette seal with ribbon tails. The label is HTML laid on top. */
export function SealGraphic({
  rim,
  inner,
  ribbon,
  line,
}: {
  rim: string;
  inner: string;
  ribbon: string;
  line: string;
}) {
  const gradId = safeId(`seal-${useId()}`);
  const points = Array.from({ length: 56 }, (_, i) => {
    const angle = (i / 56) * Math.PI * 2;
    const r = i % 2 === 0 ? 57 : 53;
    return `${(60 + r * Math.cos(angle)).toFixed(2)},${(60 + r * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 120 140" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id={gradId} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#fff6d6" stopOpacity="0.9" />
          <stop offset="45%" stopColor={inner} stopOpacity="1" />
          <stop offset="100%" stopColor={rim} stopOpacity="1" />
        </radialGradient>
      </defs>
      <path d="M36 92 L22 138 L35 129 L46 139 L58 100Z" fill={ribbon} />
      <path d="M84 92 L98 138 L85 129 L74 139 L62 100Z" fill={ribbon} />
      <polygon points={points} fill={rim} />
      <circle cx="60" cy="60" r="50" fill={`url(#${gradId})`} />
      <circle cx="60" cy="60" r="46" fill="none" stroke={line} strokeWidth="1" strokeDasharray="1.5 2.5" />
      <circle cx="60" cy="60" r="41" fill="none" stroke={rim} strokeWidth="1.4" />
    </svg>
  );
}

/** Very faint decorative background dots. */
export function PaperPattern({ color, opacity = 0.06 }: ColorProps & { opacity?: number }) {
  const patternId = safeId(`dots-${useId()}`);
  return (
    <svg className="pointer-events-none absolute inset-0" width="100%" height="100%" aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id={patternId} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.9" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function Confetti() {
  const bits: { x: number; y: number; c: string; r: number; shape: "dot" | "bar" | "tri" }[] = [
    { x: 70, y: 200, c: "#7CC4A4", r: 3.5, shape: "dot" },
    { x: 468, y: 214, c: "#B9A7E8", r: 3.5, shape: "dot" },
    { x: 58, y: 360, c: "#F2CF88", r: 0, shape: "bar" },
    { x: 474, y: 350, c: "#E9765B", r: 20, shape: "bar" },
    { x: 64, y: 470, c: "#B9A7E8", r: 0, shape: "tri" },
    { x: 462, y: 462, c: "#7CC4A4", r: 0, shape: "tri" },
  ];
  return (
    <svg className="pointer-events-none absolute inset-0" width="100%" height="100%" aria-hidden="true">
      {bits.map((b, i) => {
        if (b.shape === "dot") return <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={b.c} />;
        if (b.shape === "bar")
          return (
            <rect key={i} x={b.x} y={b.y} width="13" height="5" rx="2.5" fill={b.c} transform={`rotate(${b.r ? -35 : 35} ${b.x} ${b.y})`} />
          );
        return <path key={i} d={`M${b.x} ${b.y} l7 -12 l7 12z`} fill={b.c} opacity="0.85" />;
      })}
    </svg>
  );
}
