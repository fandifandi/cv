"use client";
import * as React from "react";
import { useId } from "react";

type Props = {
  size?: number;
  labels?: string[];
  methodName?: string;
  accent?: string;
  startAccent?: string;
  className?: string;
};

const DEFAULT_LABELS = [
  "Align Metrics",
  "Instrument & Validate",
  "Model & Expose",
  "Experiment & Learn",
  "Decide & Rollout",
  "Iterate & Optimize",
];

export default function MethodologyCycleSVG({
  size = 520,
  labels = DEFAULT_LABELS,
  methodName = "Signal → Strategy Cycle",
  accent = "#22c55e",
  startAccent = "#a78bfa",
  className = "",
}: Props) {
  const VB = 900;
  const cx = VB / 2, cy = VB / 2;
  const MARGIN = 130;
  const rTrack = cx - MARGIN;
  const rNode = 9;
  const labelR = rTrack + 44;

  const n = labels.length;
  const step = (2 * Math.PI) / n;
  const startAng = -Math.PI / 2;

  const [hover, setHover] = React.useState<number | null>(null);

  const pt = (ang: number, r: number) => ({
    x: cx + Math.cos(ang) * r,
    y: cy + Math.sin(ang) * r,
  });

  const arc = (a1: number, a2: number, r: number) => {
    const p1 = pt(a1, r), p2 = pt(a2, r);
    const largeArc =
      ((a2 - a1 + 2 * Math.PI) % (2 * Math.PI)) > Math.PI ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y}`;
  };

  const split2 = (label: string): [string, string?] => {
    if (label.length <= 18) return [label];
    const amp = label.indexOf(" & ");
    if (amp > 0 && amp < label.length - 3)
      return [label.slice(0, amp + 2), label.slice(amp + 3)];
    const mid = Math.floor(label.length / 2);
    const L = label.lastIndexOf(" ", mid);
    const R = label.indexOf(" ", mid + 1);
    const idx =
      L !== -1 && (mid - L) <= (R === -1 ? 99 : R - mid) ? L : (R !== -1 ? R : mid);
    return [label.slice(0, idx).trim(), label.slice(idx).trim()];
  };

  /* ====== proporsional panah vs stroke ====== */
  const STROKE = 7;                             // ketebalan garis ring
  const ARROW_W = Math.max(16, STROKE * 3.8);   // lebar kepala panah (px)
  const ARROW_H = Math.max(12, STROKE * 3.1);   // tinggi kepala panah (px)
  const ARROW_REF_X = ARROW_W - Math.max(2, STROKE * 1.5); // titik referensi agar panah “menempel” ujung path

  // mundurkan ujung/buntut arc supaya tidak nabrak node & panah
  const EXTRA_GAP = 10; // padding kecil
  const backoffAng = (rNode + STROKE / 2 + ARROW_W + EXTRA_GAP) / rTrack;

  // celah antar segmen biar lega
  const GAP_RAD = 0.06;

  // id unik untuk marker/gradient supaya aman kalau ada beberapa instance
  const uid = useId().replace(/:/g, "");
  const markerId = `arrowHead-${uid}`;
  const gradId = `ringGrad-${uid}`;
  const glowId = `glow-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${VB} ${VB}`}
      width={size}
      height={size}
      className={className}
      style={{ display: "block", overflow: "visible" }}
      role="img"
      aria-label="Methodology cycle"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth={ARROW_W}
          markerHeight={ARROW_H}
          refX={ARROW_REF_X}
          refY={ARROW_H / 2}
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          {/* kepala panah lebih gemuk → proporsional dengan STROKE */}
          <path d={`M0,0 L${ARROW_W},${ARROW_H / 2} L0,${ARROW_H} Z`} fill={accent} />
        </marker>

        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.35" />
        </linearGradient>

        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ring dasar */}
      <circle
        cx={cx}
        cy={cy}
        r={rTrack}
        fill="none"
        stroke="var(--border,#2a2a2a)"
        strokeWidth={12}
        opacity={0.35}
      />

      {/* arc berpanah */}
      {Array.from({ length: n }).map((_, i) => {
        const aStart = startAng + i * step + GAP_RAD + backoffAng;
        const aEnd = startAng + ((i + 1) % n) * step - GAP_RAD - backoffAng;
        return (
          <path
            key={`arc-${i}`}
            d={arc(aStart, aEnd, rTrack)}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={STROKE}
            markerEnd={`url(#${markerId})`}
          />
        );
      })}

      {/* nodes + labels */}
      {labels.map((raw, i) => {
        const [l1, l2] = split2(raw);
        const ang = startAng + i * step;
        const node = pt(ang, rTrack);
        const lab = pt(ang, labelR);
        const cos = Math.cos(ang), sin = Math.sin(ang);
        const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";
        const dy = sin > 0.35 ? 16 : sin < -0.35 ? -10 : 6;
        const isHover = hover === i;
        const color = i === 0 ? startAccent : accent;

        return (
          <g
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            cursor="pointer"
          >
            <circle cx={node.x} cy={node.y} r={rNode + 2} fill="#d1f5f5ff" stroke={color} strokeWidth={3.5} />
            <circle cx={node.x} cy={node.y} r={3.5} fill={color} />
            <text
              x={lab.x}
              y={lab.y + dy}
              textAnchor={anchor}
              fontSize={14}
              fontWeight={isHover ? 800 : 700}
              fill="currentColor"
              style={{ opacity: isHover ? 1 : 0.95, transition: "opacity 150ms ease" }}
            >
              <tspan x={lab.x} dy="0">{l1}</tspan>
              {l2 && <tspan x={lab.x} dy="1.2em">{l2}</tspan>}
            </text>
          </g>
        );
      })}

      {/* judul tengah */}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={18} fontWeight={800} fill="currentColor" style={{ opacity: 0.95 }}>
        {methodName}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize={12} fontWeight={600} fill="currentColor" style={{ opacity: 0.6 }}>
        Metrics • Experiments • Outcomes
      </text>
    </svg>
  );
}
