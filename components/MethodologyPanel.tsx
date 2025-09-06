/* components/MethodologyCycleSVG.tsx */
import * as React from "react";

type Props = {
  size?: number;
  accent?: string;
  labels?: string[];
  methodName?: string;        // <-- caption di bawah diagram
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
  size = 440,
  accent = "#22c55e",
  labels = DEFAULT_LABELS,
  methodName = "Signal → Strategy Cycle",
  className,
}: Props) {
  // ViewBox lebih lebar supaya teks tidak kepotong
  const vb = 640;                   // sebelumnya 540
  const cx = vb / 2, cy = vb / 2;

  // Radius ring diperkecil agar ada ruang label di tepi
  const rTrack = vb * 0.27;         // sebelumnya 0.30
  const rNode = 8;
  const padForLabels = 56;          // label ditarik agak keluar, tapi masih aman

  const n = labels.length;
  const step = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const pt = (ang: number, r: number) => ({
    x: cx + Math.cos(ang) * r,
    y: cy + Math.sin(ang) * r,
  });

  const arc = (a1: number, a2: number, r: number) => {
    const p1 = pt(a1, r), p2 = pt(a2, r);
    const largeArc = ((a2 - a1 + 2 * Math.PI) % (2 * Math.PI)) > Math.PI ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y}`;
  };

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${vb} ${vb}`}
        width={size}
        height={size}
        style={{ display: "block", overflow: "visible" }}  // overflow visible
        role="img"
        aria-label="Methodology cycle"
      >
        <defs>
          <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
          </marker>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* ring dasar */}
        <circle cx={cx} cy={cy} r={rTrack} fill="none" stroke="var(--border,#2a2a2a)" strokeWidth={10} opacity={0.35} />

        {/* arc berpanah searah jarum jam */}
        {Array.from({ length: n }).map((_, i) => {
          const a1 = startAngle + i * step + 0.06;
          const a2 = startAngle + ((i + 1) % n) * step - 0.06;
          return (
            <path
              key={`arc-${i}`}
              d={arc(a1, a2, rTrack)}
              fill="none"
              stroke="url(#ring)"
              strokeWidth={6}
              markerEnd="url(#arrowHead)"
            />
          );
        })}

        {/* node + label */}
        {labels.map((label, i) => {
          const ang = startAngle + i * step;
          const p = pt(ang, rTrack);
          const lp = pt(ang, rTrack + padForLabels);

          // anchor + offset supaya label tidak kepotong
          const cos = Math.cos(ang), sin = Math.sin(ang);
          const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";
          const dy = sin > 0.35 ? 14 : sin < -0.35 ? -8 : 5;

          // auto-ukuran font untuk label panjang (contoh: "Instrument & Validate")
          const fs = label.length > 18 ? 13 : 14;

          return (
            <g key={`node-${i}`}>
              <circle cx={p.x} cy={p.y} r={rNode} fill="#0b0b0b" stroke={accent} strokeWidth={3} />
              <circle cx={p.x} cy={p.y} r={3} fill={accent} />
              <text x={lp.x} y={lp.y + dy} textAnchor={anchor} fontSize={fs} fontWeight={600} fill="currentColor" style={{ opacity: 0.9 }}>
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* caption / nama metodologi */}
      <figcaption className="mt-2 text-center text-xs opacity-75">
        {methodName}
      </figcaption>
    </figure>
  );
}
