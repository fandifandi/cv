// components/MiniCharts.tsx
// Mini charts: Line, Donut, Bar — pure SVG, no deps.
// Warna default nyambung sama tema: gunakan class tailwind di props.

type LineMiniProps = {
  series: number[][];            // ex: [[12,14,13,16,...], [1.2,1.3,...]]
  height?: number;               // px
  strokeClasses?: string[];      // ex: ["stroke-sky-400","stroke-emerald-400"]
  grid?: boolean;
  ariaLabel?: string;
};

export function LineMini({
  series,
  height = 160,
  strokeClasses = ["stroke-sky-400", "stroke-emerald-400"],
  grid = true,
  ariaLabel = "Line mini chart",
}: LineMiniProps) {
  const w = 360;
  const h = height;
  const pad = 12;

  const all = series.flat();
  const max = Math.max(...all, 1);
  const min = Math.min(...all, 0);
  const range = max - min || 1;

  const xStep = (w - pad * 2) / Math.max(1, series[0].length - 1);

  const toPath = (arr: number[]) =>
    arr
      .map((v, i) => {
        const x = pad + i * xStep;
        const y = pad + (1 - (v - min) / range) * (h - pad * 2);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={ariaLabel} className="w-full h-40">
      {/* grid */}
      {grid && (
        <g className="stroke-[color:var(--border)]/70">
          {[0.25, 0.5, 0.75].map((t) => {
            const y = pad + (1 - t) * (h - pad * 2);
            return <line key={t} x1={pad} y1={y} x2={w - pad} y2={y} strokeWidth="1" />;
          })}
        </g>
      )}
      {/* lines */}
      {series.map((s, idx) => (
        <path
          key={idx}
          d={toPath(s)}
          className={`${strokeClasses[idx % strokeClasses.length]} fill-none`}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

type DonutMiniProps = {
  values: number[];                 // ex: [40,25,20,15]
  colors?: string[];                // tailwind fill classes
  size?: number;                    // px
  ariaLabel?: string;
};

export function DonutMini({
  values,
  colors = ["fill-emerald-400", "fill-sky-400", "fill-violet-400", "fill-lime-400"],
  size = 128,
  ariaLabel = "Donut mini chart",
}: DonutMiniProps) {
  const total = Math.max(1, values.reduce((a, b) => a + b, 0));
  const r = size / 2 - 8;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;

  let acc = 0;
  const segs = values.map((v, i) => {
    const frac = v / total;
    const dash = Math.max(1, frac * circ - 1);
    const gap = circ - dash;
    const rot = (acc / total) * 360 - 90; // start at top
    acc += v;
    return { dash, gap, rot, cls: colors[i % colors.length] };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={ariaLabel} className="w-full h-32">
      <circle cx={cx} cy={cy} r={r} className="fill-none stroke-[color:var(--border)]" strokeWidth={8} />
      {segs.map((s, idx) => (
        <g key={idx} transform={`rotate(${s.rot} ${cx} ${cy})`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            className={`stroke-none ${s.cls}`}
            strokeWidth={8}
            fill="none"
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeLinecap="butt"
          />
        </g>
      ))}
      {/* hole */}
      <circle cx={cx} cy={cy} r={r - 12} className="fill-[var(--bg)]" />
    </svg>
  );
}

type BarMiniProps = {
  values: number[];                 // ex: [2, 4.5, 3.2, 1.1]
  height?: number;
  barClass?: string;                // tailwind fill class
  grid?: boolean;
  ariaLabel?: string;
};

export function BarMini({
  values,
  height = 128,
  barClass = "fill-teal-400",
  grid = true,
  ariaLabel = "Bar mini chart",
}: BarMiniProps) {
  const w = 360;
  const h = height;
  const pad = 12;

  const max = Math.max(...values, 1);
  const bw = (w - pad * 2) / values.length - 8;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={ariaLabel} className="w-full h-32">
      {/* grid */}
      {grid && (
        <g className="stroke-[color:var(--border)]/70">
          {[0.25, 0.5, 0.75].map((t) => {
            const y = pad + (1 - t) * (h - pad * 2);
            return <line key={t} x1={pad} y1={y} x2={w - pad} y2={y} strokeWidth="1" />;
          })}
        </g>
      )}
      {/* bars */}
      {values.map((v, i) => {
        const x = pad + i * ((w - pad * 2) / values.length) + 4;
        const bh = ((v / max) * (h - pad * 2)) || 0;
        const y = h - pad - bh;
        return <rect key={i} x={x} y={y} width={bw} height={bh} className={barClass} rx={6} />;
      })}
    </svg>
  );
}
