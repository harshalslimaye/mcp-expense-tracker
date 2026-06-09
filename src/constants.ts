// TODO: populate CATEGORIES with expense category values
export const CATEGORIES = [] as const;

export type Category = (typeof CATEGORIES)[number];
