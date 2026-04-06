import type { Litter } from "@/lib/types";
import { AppLink } from "@/components/AppLink";

const DNA_TESTS = [
  { key: "cea", label: "CEA" },
  { key: "tns", label: "TNS" },
  { key: "cl", label: "CL" },
  { key: "mdr1", label: "MDR1" },
  { key: "sn", label: "SN" },
] as const;

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(price: number | null) {
  if (price == null) return "—";
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(price);
}

function HealthBadge({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  const isGood =
    value.toLowerCase().includes("clear") ||
    value.toLowerCase().includes("normal") ||
    value === "0/0" ||
    value === "A" ||
    value.startsWith("A/");
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium ${
        isGood
          ? "bg-green-50 text-green-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {label}: {value}
    </span>
  );
}

function EyeBadge({ label, value }: { label: string; value: boolean | null }) {
  if (value == null) return null;
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium ${
        value ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
      }`}
    >
      {label}: {value ? "OK" : "!!!"}
    </span>
  );
}

export function LitterCard({
  litter,
  breederId,
}: {
  litter: Litter;
  breederId: number;
}) {
  const hasSireTests =
    litter.hdSire || litter.ceaSire || litter.tnsSire || litter.eyesSire != null;
  const hasDamTests =
    litter.hdDam || litter.ceaDam || litter.tnsDam || litter.eyesDam != null;

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          {(litter.sire || litter.dam) && (
            <div className="font-semibold text-sm">
              {litter.sire ?? "?"} &times; {litter.dam ?? "?"}
            </div>
          )}
        </div>
        <AppLink
          href={`/breeder/${breederId}/litter/${litter.id}/edit`}
          className="text-xs text-stone-400 hover:text-stone-700"
        >
          Upravit
        </AppLink>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
        <dt className="text-stone-500">Očekávané narození</dt>
        <dd>{formatDate(litter.expectedDate)}</dd>

        {litter.bornDate && (
          <>
            <dt className="text-stone-500">Narozeno</dt>
            <dd>{formatDate(litter.bornDate)}</dd>
          </>
        )}

        <dt className="text-stone-500">Předpokládaný odběr</dt>
        <dd>{formatDate(litter.expectedPickup)}</dd>

        {litter.totalPuppies != null && (
          <>
            <dt className="text-stone-500">Štěňata</dt>
            <dd>
              {litter.availablePuppies != null
                ? `${litter.availablePuppies} volných / ${litter.totalPuppies} celkem`
                : `${litter.totalPuppies} celkem`}
            </dd>
          </>
        )}

        <dt className="text-stone-500">Cena</dt>
        <dd>
          {formatPrice(litter.price)}
          {litter.priceNote && (
            <span className="ml-1 text-stone-400">({litter.priceNote})</span>
          )}
        </dd>
      </dl>

      {/* Health tests */}
      {(hasSireTests || hasDamTests) && (
        <div className="mt-3 border-t border-stone-100 pt-3">
          <div className="mb-2 text-xs font-semibold text-stone-500 uppercase tracking-wide">
            Zdravotní testy
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {hasSireTests && (
              <div>
                <div className="mb-1 text-xs text-stone-400">
                  Otec {litter.sire && `(${litter.sire})`}
                </div>
                <div className="flex flex-wrap gap-1">
                  <HealthBadge label="HD" value={litter.hdSire} />
                  <HealthBadge label="ED" value={litter.edSire} />
                  <EyeBadge label="Oči" value={litter.eyesSire} />
                  {DNA_TESTS.map((t) => {
                    const val = litter[`${t.key}Sire` as keyof Litter] as string | null;
                    return <HealthBadge key={t.key} label={t.label} value={val} />;
                  })}
                </div>
              </div>
            )}
            {hasDamTests && (
              <div>
                <div className="mb-1 text-xs text-stone-400">
                  Matka {litter.dam && `(${litter.dam})`}
                </div>
                <div className="flex flex-wrap gap-1">
                  <HealthBadge label="HD" value={litter.hdDam} />
                  <HealthBadge label="ED" value={litter.edDam} />
                  <EyeBadge label="Oči" value={litter.eyesDam} />
                  {DNA_TESTS.map((t) => {
                    const val = litter[`${t.key}Dam` as keyof Litter] as string | null;
                    return <HealthBadge key={t.key} label={t.label} value={val} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
