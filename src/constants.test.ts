import { describe, it, expect } from "vitest";
import { CATEGORIES } from "./constants.js";

describe("CATEGORIES", () => {
  it("is a non-empty array", () => {
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });

  it("contains only non-empty strings", () => {
    for (const category of CATEGORIES) {
      expect(typeof category).toBe("string");
      expect(category.length).toBeGreaterThan(0);
    }
  });

  it("has no duplicate values", () => {
    expect(new Set(CATEGORIES).size).toBe(CATEGORIES.length);
  });
});
