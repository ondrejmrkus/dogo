"use client";

const MONTHS = [
  { key: "2026-04", label: "Dub" },
  { key: "2026-05", label: "Kvě" },
  { key: "2026-06", label: "Čvn" },
  { key: "2026-07", label: "Čvc" },
  { key: "2026-08", label: "Srp" },
  { key: "2026-09", label: "Zář" },
  { key: "2026-10", label: "Říj" },
];

const WINDOW_START = "2026-06";
const WINDOW_END = "2026-08";

function monthIndex(dateStr: string): number {
  const ym = dateStr.slice(0, 7);
  return MONTHS.findIndex((m) => m.key === ym);
}

function positionPercent(dateStr: string): number {
  const d = new Date(dateStr);
  const start = new Date("2026-04-01");
  const end = new Date("2026-10-31");
  const total = end.getTime() - start.getTime();
  const pos = d.getTime() - start.getTime();
  return Math.max(0, Math.min(100, (pos / total) * 100));
}

export function Timeline({
  data,
  className = "",
}: {
  data: { kennelName: string; expectedPickup: string | null; status: string }[];
  className?: string;
}) {
  const windowStartPct = positionPercent("2026-06-01");
  const windowEndPct = positionPercent("2026-08-31");

  return (
    <div className={`rounded-xl border border-stone-200 bg-white p-4 ${className}`}>
      <div className="mb-2 text-xs font-medium text-stone-500">
        Časová osa odběrů
      </div>
      <div className="relative h-10">
        {/* Window highlight */}
        <div
          className="absolute inset-y-0 rounded bg-green-50 border border-green-200"
          style={{
            left: `${windowStartPct}%`,
            width: `${windowEndPct - windowStartPct}%`,
          }}
        />
        {/* Month labels */}
        {MONTHS.map((m, i) => {
          const pct = (i / (MONTHS.length - 1)) * 100;
          return (
            <span
              key={m.key}
              className="absolute top-0 -translate-x-1/2 text-[10px] text-stone-400"
              style={{ left: `${pct}%` }}
            >
              {m.label}
            </span>
          );
        })}
        {/* Breeder dots */}
        {data.map(
          (d) =>
            d.expectedPickup && (
              <div
                key={d.kennelName}
                className="group absolute bottom-1 -translate-x-1/2"
                style={{ left: `${positionPercent(d.expectedPickup)}%` }}
              >
                <div className="h-3 w-3 rounded-full bg-stone-700 border-2 border-white shadow-sm" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap rounded bg-stone-800 px-2 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                  {d.kennelName}
                </div>
              </div>
            )
        )}
      </div>
      <div className="mt-1 flex items-center gap-1 text-[10px] text-green-700">
        <span className="inline-block h-1.5 w-3 rounded-sm bg-green-200" />
        Tvoje okno (červen–srpen 2026)
      </div>
    </div>
  );
}
