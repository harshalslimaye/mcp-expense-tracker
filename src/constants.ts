export const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Housing",
  "Utilities",
  "Travel",
  "Education",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
