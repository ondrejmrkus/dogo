"use client";

import Link from "next/link";
import { getBreeder, getLitter } from "@/lib/store";
import { LitterForm } from "@/components/LitterForm";

export function LitterEdit({
  breederId,
  litterId,
}: {
  breederId: number;
  litterId: number;
}) {
  const breeder = getBreeder(breederId);
  const litter = getLitter(litterId);

  if (!breeder || !litter || litter.breederId !== breeder.id) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8 text-center">
        <p className="text-stone-500">Vrh nenalezen.</p>
        <Link href="/" className="mt-4 inline-block text-sm underline">
          Zpět
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href={`/breeder/${breeder.id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"
      >
        &larr; Zpět na {breeder.kennelName}
      </Link>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Upravit vrh — {litter.sire ?? "?"} &times; {litter.dam ?? "?"}
      </h1>
      <LitterForm breederId={breeder.id} litter={litter} />
    </main>
  );
}
