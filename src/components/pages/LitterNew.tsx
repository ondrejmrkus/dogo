"use client";

import { AppLink } from "@/components/AppLink";
import { getBreeder } from "@/lib/store";
import { LitterForm } from "@/components/LitterForm";

export function LitterNew({ breederId }: { breederId: number }) {
  const breeder = getBreeder(breederId);

  if (!breeder) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8 text-center">
        <p className="text-stone-500">Chovatel nenalezen.</p>
        <AppLink href="/" className="mt-4 inline-block text-sm underline">
          Zpět
        </AppLink>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <AppLink
        href={`/breeder/${breeder.id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"
      >
        &larr; Zpět na {breeder.kennelName}
      </AppLink>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Nový vrh — {breeder.kennelName}
      </h1>
      <LitterForm breederId={breeder.id} />
    </main>
  );
}
