import type { Breeder, Litter } from "@/lib/types";
import { BreederCard } from "./BreederCard";

const STATUS_COLORS: Record<string, string> = {
  to_contact: "bg-stone-100 text-stone-700",
  contacted: "bg-blue-100 text-blue-800",
  waiting: "bg-amber-100 text-amber-800",
  waitlist: "bg-purple-100 text-purple-800",
  reserved: "bg-emerald-100 text-emerald-800",
  confirmed: "bg-green-100 text-green-800",
};

export function StatusColumn({
  status,
  label,
  breeders,
  littersByBreeder,
}: {
  status: string;
  label: string;
  breeders: Breeder[];
  littersByBreeder: Map<number, Litter[]>;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            STATUS_COLORS[status] ?? "bg-stone-100 text-stone-600"
          }`}
        >
          {label}
        </span>
        <span className="text-xs text-stone-400">{breeders.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {breeders.map((breeder) => (
          <BreederCard
            key={breeder.id}
            breeder={breeder}
            litters={littersByBreeder.get(breeder.id) ?? []}
          />
        ))}
      </div>
    </div>
  );
}
