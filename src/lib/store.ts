"use client";

import { createContext, useContext, useSyncExternalStore, useCallback } from "react";
import type { Breeder, Litter, NewBreeder, NewLitter, Status } from "./types";

const BREEDERS_KEY = "dogo_breeders";
const LITTERS_KEY = "dogo_litters";
const NEXT_ID_KEY = "dogo_next_id";

function getNextId(): number {
  const current = Number(localStorage.getItem(NEXT_ID_KEY) || "0") + 1;
  localStorage.setItem(NEXT_ID_KEY, String(current));
  return current;
}

function readBreeders(): Breeder[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BREEDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeBreeders(breeders: Breeder[]) {
  localStorage.setItem(BREEDERS_KEY, JSON.stringify(breeders));
  notify();
}

function readLitters(): Litter[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LITTERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLitters(litters: Litter[]) {
  localStorage.setItem(LITTERS_KEY, JSON.stringify(litters));
  notify();
}

// Simple external store for reactivity
let listeners: Array<() => void> = [];
let snapshot = 0;

function notify() {
  snapshot++;
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return 0;
}

// Hook that triggers re-render on store changes
export function useStoreSubscription() {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// --- CRUD operations ---

export function getBreeders(): Breeder[] {
  return readBreeders();
}

export function getBreeder(id: number): Breeder | null {
  return readBreeders().find((b) => b.id === id) ?? null;
}

export function createBreeder(data: NewBreeder): Breeder {
  const breeders = readBreeders();
  const breeder: Breeder = {
    ...data,
    id: getNextId(),
    createdAt: new Date().toISOString(),
  };
  breeders.push(breeder);
  writeBreeders(breeders);
  return breeder;
}

export function updateBreeder(id: number, data: Partial<NewBreeder>) {
  const breeders = readBreeders();
  const idx = breeders.findIndex((b) => b.id === id);
  if (idx !== -1) {
    breeders[idx] = { ...breeders[idx], ...data };
    writeBreeders(breeders);
  }
}

export function deleteBreeder(id: number) {
  writeBreeders(readBreeders().filter((b) => b.id !== id));
  // Cascade delete litters
  writeLitters(readLitters().filter((l) => l.breederId !== id));
}

export function updateBreederStatus(id: number, status: Status) {
  updateBreeder(id, { status } as Partial<NewBreeder>);
}

export function getLitters(): Litter[] {
  return readLitters();
}

export function getLittersForBreeder(breederId: number): Litter[] {
  return readLitters().filter((l) => l.breederId === breederId);
}

export function createLitter(data: NewLitter): Litter {
  const litters = readLitters();
  const litter: Litter = {
    ...data,
    id: getNextId(),
    createdAt: new Date().toISOString(),
  };
  litters.push(litter);
  writeLitters(litters);
  return litter;
}

export function updateLitter(id: number, data: Partial<NewLitter>) {
  const litters = readLitters();
  const idx = litters.findIndex((l) => l.id === id);
  if (idx !== -1) {
    litters[idx] = { ...litters[idx], ...data };
    writeLitters(litters);
  }
}

export function deleteLitter(id: number) {
  writeLitters(readLitters().filter((l) => l.id !== id));
}

export function getLitter(id: number): Litter | null {
  return readLitters().find((l) => l.id === id) ?? null;
}
