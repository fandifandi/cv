// components/TimelineSkills.tsx
"use client";

import { useState } from "react";
import TimelineInteractive, { type TimelineItem } from "@/components/TimelineInteractive";
import SkillsBars, { type SkillDatum } from "@/components/SkillsBars";

export default function TimelineSkills({
  items,
  allSkills,
  skillsByIndex, // mapping: index timeline -> subset skills
}: {
  items: TimelineItem[];
  allSkills: SkillDatum[];
  skillsByIndex: Record<number, SkillDatum[]>;
}) {
  const [sel, setSel] = useState<number | null>(null);
  const shown = sel === null ? allSkills : (skillsByIndex[sel] ?? allSkills);
  const title = sel === null ? "Skill Set" : `Skills in: ${items[sel].title}`;

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <TimelineInteractive items={items} onChange={(i) => setSel(i)} />
      <div className="space-y-3">
        {sel !== null && (
          <button
            onClick={() => setSel(null)}
            className="text-sm px-3 py-1.5 rounded-lg border border-[color:var(--border)] hover:bg-[color:var(--card)]"
          >
            Show all skills
          </button>
        )}
        <SkillsBars data={shown} title={title} />
      </div>
    </div>
  );
}
