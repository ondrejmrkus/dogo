"use client";

import { updateBreederStatus } from "@/lib/store";
import { STATUS_LABELS, PIPELINE_STATUSES, CLOSED_STATUSES } from "@/lib/types";
import type { Status } from "@/lib/types";

const ALL_STATUSES = [...PIPELINE_STATUSES, ...CLOSED_STATUSES];

const STATUS_COLORS: Record<string, string> = {
  to_contact: "bg-stone-100 text-stone-700 border-stone-300",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  waiting: "bg-amber-100 text-amber-800 border-amber-200",
  waitlist: "bg-purple-100 text-purple-800 border-purple-200",
  reserved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  declined: "bg-red-100 text-red-800 border-red-200",
  not_interested: "bg-stone-100 text-stone-600 border-stone-200",
};

export function StatusSwitcher({
  breederId,
  currentStatus,
}: {
  breederId: number;
  currentStatus: Status;
}) {
  function handleChange(status: Status) {
    updateBreederStatus(breederId, status);
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {ALL_STATUSES.map((status) => (
        <button
          key={status}
          onClick={() => handleChange(status)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
            status === currentStatus
              ? STATUS_COLORS[status]
              : "border-stone-200 bg-white text-stone-400 hover:text-stone-600 hover:border-stone-300"
          }`}
        >
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}
