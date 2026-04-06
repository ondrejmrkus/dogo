"use client";

import Link from "next/link";
import { BreederForm } from "@/components/BreederForm";

export function BreederNew() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"
      >
        &larr; Zpět
      </Link>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Nový chovatel
      </h1>
      <BreederForm />
    </main>
  );
}
