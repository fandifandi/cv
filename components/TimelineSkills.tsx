"use client";

import { useState } from "react";
import TimelineInteractive, { type TimelineItem } from "@/components/TimelineInteractive";
import SkillsBars, { type SkillDatum } from "@/components/SkillsBars";

export default function TimelineSkills({
  items,
  allSkills,
  skillsByIndex,
}: {
  items: TimelineItem[];
  allSkills: SkillDatum[];
  skillsByIndex: Record<number, SkillDatum[]>;
}) {
  const [sel, setSel] = useState<number | null>(null);
  const shown = sel === null ? allSkills : skillsByIndex[sel] ?? allSkills;
  // const title = sel === null ? "Skill Set" : `Skills in: ${items[sel].title}`;
  const title = "Skill Set";

  return (
    <div className="grid lg:grid-cols-[1fr,420px] gap-8 items-start">
      <TimelineInteractive items={items} onChange={(i) => setSel(i)} />

      {/* Sticky skills panel on the right */}
      <div className="lg:sticky lg:top-24 max-lg:mt-4">
        {sel !== null && (
          <button
            onClick={() => setSel(null)}
            className="mb-3 text-sm px-3 py-1.5 rounded-lg border border-[color:var(--border)] hover:bg-[color:var(--card)]"
          >
            Show all skills
          </button>
        )}
        {/* Batasi tinggi agar nyaman saat sticky */}
        <div className="max-h-[calc(100vh-8rem)] overflow-auto pr-1">
          <SkillsBars data={shown} title={title} />
        </div>
      </div>
    </div>
  );
}
