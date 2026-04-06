export const STATUSES = [
  "to_contact",
  "contacted",
  "waiting",
  "waitlist",
  "reserved",
  "confirmed",
  "declined",
  "not_interested",
] as const;

export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  to_contact: "Oslovit",
  contacted: "Osloveno",
  waiting: "Čekám na odpověď",
  waitlist: "Na čekačce",
  reserved: "Rezervováno",
  confirmed: "Potvrzeno",
  declined: "Odmítnuto",
  not_interested: "Nezájem",
};

export const PIPELINE_STATUSES: Status[] = [
  "to_contact",
  "contacted",
  "waiting",
  "waitlist",
  "reserved",
  "confirmed",
];

export const CLOSED_STATUSES: Status[] = ["declined", "not_interested"];

export interface Breeder {
  id: number;
  kennelName: string;
  name: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  location: string | null;
  status: Status;
  nextStep: string | null;
  nextStepDate: string | null;
  notes: string | null;
  createdAt: string;
}

export interface Litter {
  id: number;
  breederId: number;
  sire: string | null;
  dam: string | null;
  expectedDate: string | null;
  bornDate: string | null;
  expectedPickup: string | null;
  totalPuppies: number | null;
  availablePuppies: number | null;
  price: number | null;
  priceNote: string | null;
  hdSire: string | null;
  hdDam: string | null;
  edSire: string | null;
  edDam: string | null;
  eyesSire: boolean | null;
  eyesDam: boolean | null;
  ceaSire: string | null;
  ceaDam: string | null;
  tnsSire: string | null;
  tnsDam: string | null;
  clSire: string | null;
  clDam: string | null;
  mdr1Sire: string | null;
  mdr1Dam: string | null;
  snSire: string | null;
  snDam: string | null;
  createdAt: string;
}

export type NewBreeder = Omit<Breeder, "id" | "createdAt">;
export type NewLitter = Omit<Litter, "id" | "createdAt">;
