"use client";

import { AppLink } from "@/components/AppLink";
import { getBreeders, getLitters } from "@/lib/store";
import { PIPELINE_STATUSES, CLOSED_STATUSES, STATUS_LABELS } from "@/lib/types";
import type { Breeder, Litter } from "@/lib/types";
import { Timeline } from "@/components/Timeline";
import { BreederCard } from "@/components/BreederCard";
import { StatusColumn } from "@/components/StatusColumn";

export function Dashboard() {
  const allBreeders = getBreeders();
  const allLitters = getLitters();

  const littersByBreeder = new Map<number, Litter[]>();
  for (const litter of allLitters) {
    const existing = littersByBreeder.get(litter.breederId) ?? [];
    existing.push(litter);
    littersByBreeder.set(litter.breederId, existing);
  }

  const breedersByStatus = new Map<string, Breeder[]>();
  for (const breeder of allBreeders) {
    const existing = breedersByStatus.get(breeder.status) ?? [];
    existing.push(breeder);
    breedersByStatus.set(breeder.status, existing);
  }

  const closedBreeders = allBreeders.filter((b) =>
    (CLOSED_STATUSES as readonly string[]).includes(b.status)
  );

  const timelineData = allBreeders
    .filter((b) => !(CLOSED_STATUSES as readonly string[]).includes(b.status))
    .map((b) => {
      const bl = littersByBreeder.get(b.id) ?? [];
      const pickup = bl.find((l) => l.expectedPickup)?.expectedPickup ?? null;
      return { kennelName: b.kennelName, expectedPickup: pickup, status: b.status };
    })
    .filter((d) => d.expectedPickup);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dogo</h1>
          <p className="text-sm text-stone-500">
            Sledování chovatelů border kolií
          </p>
        </div>
        <AppLink
          href="/breeder/new"
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
        >
          + Přidat chovatele
        </AppLink>
      </header>

      {timelineData.length > 0 && (
        <Timeline data={timelineData} className="mb-8" />
      )}

      {allBreeders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 p-12 text-center">
          <p className="text-stone-500">
            Zatím žádní chovatelé.{" "}
            <AppLink href="/breeder/new" className="text-stone-900 underline">
              Přidej prvního
            </AppLink>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {PIPELINE_STATUSES.map((status) => (
            <StatusColumn
              key={status}
              status={status}
              label={STATUS_LABELS[status]}
              breeders={breedersByStatus.get(status) ?? []}
              littersByBreeder={littersByBreeder}
            />
          ))}
        </div>
      )}

      {closedBreeders.length > 0 && (
        <details className="mt-8">
          <summary className="cursor-pointer text-sm text-stone-400 hover:text-stone-600">
            Ukončené ({closedBreeders.length})
          </summary>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {closedBreeders.map((b) => (
              <BreederCard
                key={b.id}
                breeder={b}
                litters={littersByBreeder.get(b.id) ?? []}
                muted
              />
            ))}
          </div>
        </details>
      )}
    </main>
  );
}
