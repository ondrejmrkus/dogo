"use client";

import { useSyncExternalStore } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/dogo" : "";

let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSegments(): string[] {
  if (typeof window === "undefined") return [];
  const pathname = window.location.pathname;
  const rel = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname;
  return rel.split("/").filter(Boolean);
}

let cachedSegments = typeof window !== "undefined" ? getSegments() : [];

function getSnapshot() {
  return cachedSegments;
}

function getServerSnapshot() {
  return [] as string[];
}

export function usePathSegments(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function navigate(path: string) {
  window.history.pushState({}, "", basePath + path);
  cachedSegments = getSegments();
  for (const l of listeners) l();
}

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    cachedSegments = getSegments();
    for (const l of listeners) l();
  });
}
