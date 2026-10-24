import { useId } from "react";

/* All ornaments are inline SVG so they export perfectly to PNG.
   No text is drawn inside SVG — Bengali shaping stays in HTML. */

type ColorProps = { color: string };

function safeId(raw: string) {
  return raw.replace(/[^a-zA-Z0-9_-]/g, "");
}

export function CornerFlourish({ color, className }: ColorProps & { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" width="72" height="72" className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeLinecap="round">
        <path d="M6 34 C6 18 18 6 34 6" strokeWidth="1.2" />
        <path d="M6 50 C10 32 21 23 27 27 C31 30 27 36 23 33" strokeWidth="1" />
        <path d="M50 6 C32 10 23 21 27 27 C30 31 36 27 33 23" strokeWidth="1" />
        <path d="M12 12 L19 19" strokeWidth="1" />
      </g>
      <g fill={color}>
        <circle cx="6" cy="6" r="2.4" />
        <circle cx="6" cy="54" r="1.4" />
        <circle cx="54" cy="6" r="1.4" />
        <rect x="18.5" y="18.5" width="6" height="6" transform="rotate(45 21.5 21.5)" />
        <path d="M33 34 q4 -1 6 3 q-4 1 -6 -3z" opacity="0.8" />
        <path d="M34 33 q-1 4 3 6 q1 -4 -3 -6z" opacity="0.8" />
      </g>
    </svg>
  );
}

export function SparkleCluster({ colors, className }: { colors: [string, string, string]; className?: string }) {
  const star = "M0 -10 C1.2 -2.4 2.4 -1.2 10 0 C2.4 1.2 1.2 2.4 0 10 C-1.2 2.4 -2.4 1.2 -10 0 C-2.4 -1.2 -1.2 -2.4 0 -10Z";
  return (
    <svg viewBox="0 0 72 72" width="72" height="72" className={className} aria-hidden="true">
      <path d={star} transform="translate(20 20) scale(1.25)" fill={colors[0]} />
      <path d={star} transform="translate(44 12) scale(0.55)" fill={colors[1]} />
      <path d={star} transform="translate(12 44) scale(0.55)" fill={colors[2]} />
      <circle cx="40" cy="34" r="3" fill={colors[2]} />
      <circle cx="30" cy="48" r="2" fill={colors[1]} />
      <path d="M50 26 q4 -5 8 0 t8 0" fill="none" stroke={colors[0]} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Horizontal laurel sprig; mirror it with `flip`. */
export function LaurelSprig({ color, flip = false }: ColorProps & { flip?: boolean }) {
  const leaves = [8, 19, 30, 41, 52, 62];
  return (
    <svg
      viewBox="0 0 74 22"
      width="74"
      height="22"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M2 11 Q38 15 72 11" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" />
      {leaves.map((x, i) => {
        const up = i % 2 === 0;
        const size = 1 - i * 0.07;
        return (
          <ellipse
            key={x}
            cx={x + 2}
            cy={up ? 7.4 : 15}
            rx={5.6 * size}
            ry={2.2 * size}
            fill={color}
            transform={`rotate(${up ? -28 : 28} ${x + 2} ${up ? 7.4 : 15})`}
          />
        );
      })}
      <circle cx="72" cy="11" r="1.6" fill={color} />
    </svg>
  );
}

export function Star({ color, size = 14 }: ColorProps & { size?: number }) {
  return (
    <svg viewBox="-10 -10 20 20" width={size} height={size} aria-hidden="true">
      <path
        d="M0 -10 L2.6 -3.4 L9.5 -3.1 L4.1 1.3 L5.9 8.1 L0 4.3 L-5.9 8.1 L-4.1 1.3 L-9.5 -3.1 L-2.6 -3.4Z"
        fill={color}
      />
    </svg>
  );
}

export function DiamondRule({ color, width = 180 }: ColorProps & { width?: number }) {
  const mid = width / 2;
  return (
    <svg viewBox={`0 0 ${width} 12`} width={width} height="12" aria-hidden="true">
      <path d={`M4 6 H${mid - 12} M${mid + 12} 6 H${width - 4}`} stroke={color} strokeWidth="0.9" />
      <rect x={mid - 4} y="2" width="8" height="8" transform={`rotate(45 ${mid} 6)`} fill={color} />
      <circle cx={mid - 9} cy="6" r="1.4" fill={color} />
      <circle cx={mid + 9} cy="6" r="1.4" fill={color} />
      <circle cx="3" cy="6" r="1.2" fill={color} />
      <circle cx={width - 3} cy="6" r="1.2" fill={color} />
    </svg>
  );
}

export function NameFlourish({ color }: ColorProps) {
  return (
    <svg viewBox="0 0 260 14" width="260" height="14" aria-hidden="true">
      <path
        d="M6 8 C60 2 100 12 130 7 C160 2 200 12 254 6"
        fill="none"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="130" cy="7" r="2.2" fill={color} />
    </svg>
  );
}

export function Hourglass({ color }: ColorProps) {
  return (
    <svg viewBox="0 0 12 16" width="11" height="14" aria-hidden="true">
      <path
        d="M1.5 1h9M1.5 15h9M2.5 1c0 4 3.5 5 3.5 7S2.5 11 2.5 15M9.5 1c0 4-3.5 5-3.5 7s3.5 3 3.5 7"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M4 13.6 Q6 11 8 13.6Z" fill={color} />
    </svg>
  );
}

/** Rosette award seal. The label is HTML laid on top so Bengali shapes correctly. */
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
  const points = Array.from({ length: 48 }, (_, i) => {
    const angle = (i / 48) * Math.PI * 2;
    const r = i % 2 === 0 ? 57 : 52.5;
    return `${(60 + r * Math.cos(angle)).toFixed(2)},${(60 + r * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 120 138" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id={gradId} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M38 92 L24 136 L36 128 L46 137 L58 100Z" fill={ribbon} />
      <path d="M82 92 L96 136 L84 128 L74 137 L62 100Z" fill={ribbon} />
      <polygon points={points} fill={rim} />
      <polygon points={points} fill={`url(#${gradId})`} />
      <circle cx="60" cy="60" r="48" fill={inner} />
      <circle cx="60" cy="60" r="44" fill="none" stroke={line} strokeWidth="0.9" strokeDasharray="2 2.6" />
      <circle cx="60" cy="60" r="39.5" fill="none" stroke={line} strokeWidth="0.6" opacity="0.8" />
    </svg>
  );
}

/** Very faint decorative background — dots plus a soft ring watermark. */
export function PaperPattern({ color, opacity = 0.07 }: ColorProps & { opacity?: number }) {
  const patternId = safeId(`dots-${useId()}`);
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id={patternId} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.9" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      <g fill="none" stroke={color} strokeWidth="1.2">
        <circle cx="270" cy="300" r="170" />
        <circle cx="270" cy="300" r="150" strokeDasharray="1 7" />
        <circle cx="270" cy="300" r="128" />
      </g>
    </svg>
  );
}

export function Confetti() {
  const bits: { x: number; y: number; c: string; r: number; shape: "dot" | "bar" | "tri" }[] = [
    { x: 84, y: 150, c: "#7CC4A4", r: 4, shape: "dot" },
    { x: 452, y: 168, c: "#B9A7E8", r: 4, shape: "dot" },
    { x: 66, y: 330, c: "#F2CF88", r: 0, shape: "bar" },
    { x: 470, y: 312, c: "#E9765B", r: 20, shape: "bar" },
    { x: 92, y: 470, c: "#B9A7E8", r: 0, shape: "tri" },
    { x: 446, y: 452, c: "#7CC4A4", r: 0, shape: "tri" },
  ];
  return (
    <svg className="pointer-events-none absolute inset-0" width="100%" height="100%" aria-hidden="true">
      {bits.map((b, i) => {
        if (b.shape === "dot") return <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={b.c} />;
        if (b.shape === "bar")
          return (
            <rect
              key={i}
              x={b.x}
              y={b.y}
              width="14"
              height="5"
              rx="2.5"
              fill={b.c}
              transform={`rotate(${b.r ? -35 : 35} ${b.x} ${b.y})`}
            />
          );
        return <path key={i} d={`M${b.x} ${b.y} l7 -12 l7 12z`} fill={b.c} opacity="0.85" />;
      })}
    </svg>
  );
}
