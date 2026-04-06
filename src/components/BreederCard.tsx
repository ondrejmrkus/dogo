import Link from "next/link";
import type { Breeder, Litter } from "@/lib/types";

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("cs-CZ", { day: "numeric", month: "short" });
}

function formatMonth(dateStr: string | null) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("cs-CZ", { month: "long", year: "numeric" });
}

function formatPrice(price: number | null) {
  if (price == null) return null;
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(price);
}

function isInWindow(dateStr: string | null) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const start = new Date("2026-06-01");
  const end = new Date("2026-08-31");
  return d >= start && d <= end;
}

export function BreederCard({
  breeder,
  litters,
  muted = false,
}: {
  breeder: Breeder;
  litters: Litter[];
  muted?: boolean;
}) {
  const primaryLitter = litters[0] ?? null;
  const pickup = primaryLitter?.expectedPickup;
  const inWindow = isInWindow(pickup ?? null);

  return (
    <Link
      href={`/breeder/${breeder.id}`}
      className={`block rounded-lg border p-3 transition-colors hover:border-stone-400 ${
        muted
          ? "border-stone-200 bg-stone-100 opacity-60"
          : "border-stone-200 bg-white"
      }`}
    >
      <div className="mb-1 font-semibold text-sm leading-tight">
        {breeder.kennelName}
      </div>

      {pickup && (
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              inWindow === true
                ? "bg-green-500"
                : inWindow === false
                ? "bg-amber-400"
                : "bg-stone-300"
            }`}
          />
          <span className="text-stone-600">
            Odběr {formatMonth(pickup)}
          </span>
        </div>
      )}

      {primaryLitter?.price != null && (
        <div className="mt-1 text-xs text-stone-500">
          {formatPrice(primaryLitter.price)}
        </div>
      )}

      {breeder.nextStep && (
        <div className="mt-2 rounded bg-stone-50 px-2 py-1 text-xs text-stone-600">
          {breeder.nextStep}
          {breeder.nextStepDate && (
            <span className="ml-1 font-medium text-stone-800">
              — {formatDate(breeder.nextStepDate)}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
