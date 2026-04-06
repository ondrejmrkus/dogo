"use client";

import { AppLink } from "@/components/AppLink";
import { navigate } from "@/lib/navigation";
import { getBreeder, getLittersForBreeder, deleteBreeder } from "@/lib/store";
import { StatusSwitcher } from "@/components/StatusSwitcher";
import { LitterCard } from "@/components/LitterCard";

export function BreederDetail({ id }: { id: number }) {
  const breeder = getBreeder(id);

  if (!breeder) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 text-center">
        <p className="text-stone-500">Chovatel nenalezen.</p>
        <AppLink href="/" className="mt-4 inline-block text-sm underline">
          Zpět na přehled
        </AppLink>
      </main>
    );
  }

  const breederLitters = getLittersForBreeder(breeder.id);

  function handleDelete() {
    if (!confirm(`Opravdu smazat chovatele "${breeder!.kennelName}"?`)) return;
    deleteBreeder(breeder!.id);
    navigate("/");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <AppLink
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"
      >
        &larr; Zpět na přehled
      </AppLink>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {breeder.kennelName}
          </h1>
          <p className="text-sm text-stone-500">{breeder.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <AppLink
            href={`/breeder/${breeder.id}/edit`}
            className="rounded-lg border border-stone-200 px-3 py-1.5 text-sm hover:bg-stone-50 transition-colors"
          >
            Upravit
          </AppLink>
          <button
            onClick={handleDelete}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            Smazat
          </button>
        </div>
      </div>

      <StatusSwitcher breederId={breeder.id} currentStatus={breeder.status} />

      <section className="mt-6 rounded-xl border border-stone-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-stone-500 uppercase tracking-wide">
          Kontakt
        </h2>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {breeder.phone && (
            <>
              <dt className="text-stone-500">Telefon</dt>
              <dd>
                <a href={`tel:${breeder.phone}`} className="underline">
                  {breeder.phone}
                </a>
              </dd>
            </>
          )}
          {breeder.email && (
            <>
              <dt className="text-stone-500">Email</dt>
              <dd>
                <a href={`mailto:${breeder.email}`} className="underline">
                  {breeder.email}
                </a>
              </dd>
            </>
          )}
          {breeder.website && (
            <>
              <dt className="text-stone-500">Web</dt>
              <dd>
                <a
                  href={breeder.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {breeder.website.replace(/^https?:\/\//, "")}
                </a>
              </dd>
            </>
          )}
          {breeder.location && (
            <>
              <dt className="text-stone-500">Lokalita</dt>
              <dd>{breeder.location}</dd>
            </>
          )}
        </dl>
      </section>

      {breeder.nextStep && (
        <section className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h2 className="mb-1 text-sm font-semibold text-amber-800">
            Další krok
          </h2>
          <p className="text-sm text-amber-900">
            {breeder.nextStep}
            {breeder.nextStepDate && (
              <span className="ml-2 font-medium">
                —{" "}
                {new Date(breeder.nextStepDate).toLocaleDateString("cs-CZ", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </p>
        </section>
      )}

      {breeder.notes && (
        <section className="mt-4 rounded-xl border border-stone-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-stone-500 uppercase tracking-wide">
            Poznámky a dohody
          </h2>
          <p className="whitespace-pre-wrap text-sm text-stone-700">
            {breeder.notes}
          </p>
        </section>
      )}

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
            Vrhy
          </h2>
          <AppLink
            href={`/breeder/${breeder.id}/litter/new`}
            className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-stone-800 transition-colors"
          >
            + Přidat vrh
          </AppLink>
        </div>
        {breederLitters.length === 0 ? (
          <div className="rounded-xl border border-dashed border-stone-300 p-8 text-center">
            <p className="text-sm text-stone-500">Zatím žádné vrhy.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {breederLitters.map((litter) => (
              <LitterCard
                key={litter.id}
                litter={litter}
                breederId={breeder.id}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
