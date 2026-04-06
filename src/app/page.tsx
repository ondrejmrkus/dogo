"use client";

import { useStoreSubscription } from "@/lib/store";
import { usePathSegments } from "@/lib/navigation";
import { AppRouter } from "@/components/AppRouter";

export default function Page() {
  useStoreSubscription();
  const segments = usePathSegments();
  return <AppRouter segments={segments} />;
}
