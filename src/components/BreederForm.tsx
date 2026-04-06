"use client";

import { createBreeder, updateBreeder } from "@/lib/store";
import type { Breeder, NewBreeder, Status } from "@/lib/types";
import { STATUS_LABELS, PIPELINE_STATUSES, CLOSED_STATUSES } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const ALL_STATUSES = [...PIPELINE_STATUSES, ...CLOSED_STATUSES];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-stone-700">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400";

export function BreederForm({ breeder }: { breeder?: Breeder }) {
  const router = useRouter();
  const isEdit = !!breeder;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: NewBreeder = {
      kennelName: fd.get("kennelName") as string,
      name: fd.get("name") as string,
      phone: (fd.get("phone") as string) || null,
      email: (fd.get("email") as string) || null,
      website: (fd.get("website") as string) || null,
      location: (fd.get("location") as string) || null,
      status: (fd.get("status") as Status) || "to_contact",
      nextStep: (fd.get("nextStep") as string) || null,
      nextStepDate: (fd.get("nextStepDate") as string) || null,
      notes: (fd.get("notes") as string) || null,
    };

    if (isEdit) {
      updateBreeder(breeder.id, data);
      router.push(`/breeder/${breeder.id}`);
    } else {
      const created = createBreeder(data);
      router.push(`/breeder/${created.id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Chovatelská stanice *">
          <input
            name="kennelName"
            required
            defaultValue={breeder?.kennelName}
            className={inputClass}
            placeholder="Např. z Modré zátoky"
          />
        </Field>
        <Field label="Jméno chovatele *">
          <input
            name="name"
            required
            defaultValue={breeder?.name}
            className={inputClass}
            placeholder="Jan Novák"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Telefon">
          <input
            name="phone"
            type="tel"
            defaultValue={breeder?.phone ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Email">
          <input
            name="email"
            type="email"
            defaultValue={breeder?.email ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Web">
          <input
            name="website"
            type="url"
            defaultValue={breeder?.website ?? ""}
            className={inputClass}
            placeholder="https://..."
          />
        </Field>
        <Field label="Lokalita">
          <input
            name="location"
            defaultValue={breeder?.location ?? ""}
            className={inputClass}
            placeholder="Město / kraj"
          />
        </Field>
      </div>

      <Field label="Status">
        <select
          name="status"
          defaultValue={breeder?.status ?? "to_contact"}
          className={inputClass}
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Další krok">
          <input
            name="nextStep"
            defaultValue={breeder?.nextStep ?? ""}
            className={inputClass}
            placeholder="Např. zavolat, počkat na info o vrhu..."
          />
        </Field>
        <Field label="Datum dalšího kroku">
          <input
            name="nextStepDate"
            type="date"
            defaultValue={breeder?.nextStepDate ?? ""}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Poznámky a dohody">
        <textarea
          name="notes"
          rows={4}
          defaultValue={breeder?.notes ?? ""}
          className={inputClass}
          placeholder="Podmínky chovatele, co bylo domluveno..."
        />
      </Field>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
        >
          {isEdit ? "Uložit změny" : "Vytvořit"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-stone-200 px-4 py-2 text-sm hover:bg-stone-50 transition-colors"
        >
          Zrušit
        </button>
      </div>
    </form>
  );
}
