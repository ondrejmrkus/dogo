"use client";

import { useStoreSubscription } from "@/lib/store";
import { Dashboard } from "@/components/pages/Dashboard";
import { BreederDetail } from "@/components/pages/BreederDetail";
import { BreederNew } from "@/components/pages/BreederNew";
import { BreederEdit } from "@/components/pages/BreederEdit";
import { LitterNew } from "@/components/pages/LitterNew";
import { LitterEdit } from "@/components/pages/LitterEdit";
import { AppLink } from "@/components/AppLink";

export function AppRouter({ segments }: { segments: string[] }) {
  useStoreSubscription();

  // / → Dashboard
  if (segments.length === 0) {
    return <Dashboard />;
  }

  // /breeder/new
  if (segments[0] === "breeder" && segments[1] === "new" && segments.length === 2) {
    return <BreederNew />;
  }

  // /breeder/[id]/edit
  if (
    segments[0] === "breeder" &&
    segments[2] === "edit" &&
    segments.length === 3
  ) {
    return <BreederEdit id={Number(segments[1])} />;
  }

  // /breeder/[id]/litter/new
  if (
    segments[0] === "breeder" &&
    segments[2] === "litter" &&
    segments[3] === "new" &&
    segments.length === 4
  ) {
    return <LitterNew breederId={Number(segments[1])} />;
  }

  // /breeder/[id]/litter/[litterId]/edit
  if (
    segments[0] === "breeder" &&
    segments[2] === "litter" &&
    segments[4] === "edit" &&
    segments.length === 5
  ) {
    return (
      <LitterEdit
        breederId={Number(segments[1])}
        litterId={Number(segments[3])}
      />
    );
  }

  // /breeder/[id]
  if (segments[0] === "breeder" && segments.length === 2) {
    return <BreederDetail id={Number(segments[1])} />;
  }

  // 404
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 text-center">
      <p className="text-stone-500">Stránka nenalezena.</p>
      <AppLink href="/" className="mt-4 inline-block text-sm underline">
        Zpět na přehled
      </AppLink>
    </main>
  );
}
