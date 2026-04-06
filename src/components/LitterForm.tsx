"use client";

import { createLitter, updateLitter, deleteLitter } from "@/lib/store";
import type { Litter, NewLitter } from "@/lib/types";
import { navigate } from "@/lib/navigation";
import { FormEvent } from "react";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium text-stone-700">
        {label}
      </span>
      {children}
    </label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-500 pt-4 pb-1">
      {children}
    </h3>
  );
}

const inputClass =
  "w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400";

const DNA_TESTS = [
  { key: "cea", label: "CEA" },
  { key: "tns", label: "TNS" },
  { key: "cl", label: "CL" },
  { key: "mdr1", label: "MDR1" },
  { key: "sn", label: "SN" },
] as const;

export function LitterForm({
  breederId,
  litter,
}: {
  breederId: number;
  litter?: Litter;
}) {
  const isEdit = !!litter;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const str = (key: string) => (fd.get(key) as string) || null;
    const num = (key: string) => {
      const v = fd.get(key) as string;
      return v ? Number(v) : null;
    };
    const bool = (key: string) => {
      const v = fd.get(key) as string;
      return v === "" ? null : v === "true";
    };

    const data: NewLitter = {
      breederId,
      sire: str("sire"),
      dam: str("dam"),
      expectedDate: str("expectedDate"),
      bornDate: str("bornDate"),
      expectedPickup: str("expectedPickup"),
      totalPuppies: num("totalPuppies"),
      availablePuppies: num("availablePuppies"),
      price: num("price"),
      priceNote: str("priceNote"),
      hdSire: str("hdSire"),
      hdDam: str("hdDam"),
      edSire: str("edSire"),
      edDam: str("edDam"),
      eyesSire: bool("eyesSire"),
      eyesDam: bool("eyesDam"),
      ceaSire: str("ceaSire"),
      ceaDam: str("ceaDam"),
      tnsSire: str("tnsSire"),
      tnsDam: str("tnsDam"),
      clSire: str("clSire"),
      clDam: str("clDam"),
      mdr1Sire: str("mdr1Sire"),
      mdr1Dam: str("mdr1Dam"),
      snSire: str("snSire"),
      snDam: str("snDam"),
    };

    if (isEdit) {
      updateLitter(litter.id, data);
    } else {
      createLitter(data);
    }
    navigate(`/breeder/${breederId}`);
  }

  function handleDelete() {
    if (!litter || !confirm("Opravdu smazat tento vrh?")) return;
    deleteLitter(litter.id);
    navigate(`/breeder/${breederId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Parents */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Otec (sire)">
          <input
            name="sire"
            defaultValue={litter?.sire ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Matka (dam)">
          <input
            name="dam"
            defaultValue={litter?.dam ?? ""}
            className={inputClass}
          />
        </Field>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Očekávané narození">
          <input
            name="expectedDate"
            type="date"
            defaultValue={litter?.expectedDate ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Narozeno">
          <input
            name="bornDate"
            type="date"
            defaultValue={litter?.bornDate ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Předpokládaný odběr">
          <input
            name="expectedPickup"
            type="date"
            defaultValue={litter?.expectedPickup ?? ""}
            className={inputClass}
          />
        </Field>
      </div>

      {/* Puppies & Price */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Štěňat celkem">
          <input
            name="totalPuppies"
            type="number"
            min="0"
            defaultValue={litter?.totalPuppies ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Volných">
          <input
            name="availablePuppies"
            type="number"
            min="0"
            defaultValue={litter?.availablePuppies ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Cena (Kč)">
          <input
            name="price"
            type="number"
            min="0"
            defaultValue={litter?.price ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Co je v ceně">
          <input
            name="priceNote"
            defaultValue={litter?.priceNote ?? ""}
            className={inputClass}
            placeholder="čip, očkování..."
          />
        </Field>
      </div>

      {/* Health tests - Sire */}
      <SectionTitle>Zdravotní testy — Otec</SectionTitle>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="HD">
          <input
            name="hdSire"
            defaultValue={litter?.hdSire ?? ""}
            className={inputClass}
            placeholder="A/A"
          />
        </Field>
        <Field label="ED/OCD">
          <input
            name="edSire"
            defaultValue={litter?.edSire ?? ""}
            className={inputClass}
            placeholder="0/0"
          />
        </Field>
        <Field label="Oční vyšetření">
          <select
            name="eyesSire"
            defaultValue={
              litter?.eyesSire == null ? "" : String(litter.eyesSire)
            }
            className={inputClass}
          >
            <option value="">—</option>
            <option value="true">OK</option>
            <option value="false">Nález</option>
          </select>
        </Field>
        {DNA_TESTS.map((t) => (
          <Field key={t.key} label={t.label}>
            <input
              name={`${t.key}Sire`}
              defaultValue={
                (litter?.[`${t.key}Sire` as keyof Litter] as string) ?? ""
              }
              className={inputClass}
              placeholder="clear / carrier / affected"
            />
          </Field>
        ))}
      </div>

      {/* Health tests - Dam */}
      <SectionTitle>Zdravotní testy — Matka</SectionTitle>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="HD">
          <input
            name="hdDam"
            defaultValue={litter?.hdDam ?? ""}
            className={inputClass}
            placeholder="A/A"
          />
        </Field>
        <Field label="ED/OCD">
          <input
            name="edDam"
            defaultValue={litter?.edDam ?? ""}
            className={inputClass}
            placeholder="0/0"
          />
        </Field>
        <Field label="Oční vyšetření">
          <select
            name="eyesDam"
            defaultValue={
              litter?.eyesDam == null ? "" : String(litter.eyesDam)
            }
            className={inputClass}
          >
            <option value="">—</option>
            <option value="true">OK</option>
            <option value="false">Nález</option>
          </select>
        </Field>
        {DNA_TESTS.map((t) => (
          <Field key={t.key} label={t.label}>
            <input
              name={`${t.key}Dam`}
              defaultValue={
                (litter?.[`${t.key}Dam` as keyof Litter] as string) ?? ""
              }
              className={inputClass}
              placeholder="clear / carrier / affected"
            />
          </Field>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-4">
        <button
          type="submit"
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
        >
          {isEdit ? "Uložit změny" : "Vytvořit"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-lg border border-stone-200 px-4 py-2 text-sm hover:bg-stone-50 transition-colors"
        >
          Zrušit
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="ml-auto rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            Smazat vrh
          </button>
        )}
      </div>
    </form>
  );
}
