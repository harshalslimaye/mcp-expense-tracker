import { describe, it, expect, beforeEach } from "vitest";
import Database from "better-sqlite3";
import { initDb } from "./db.js";
import { CATEGORIES } from "./constants.js";

describe("initDb", () => {
  let db: Database.Database;

  beforeEach(() => {
    db = new Database(":memory:");
    initDb(db);
  });

  it("creates the expenses table", () => {
    const row = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='expenses'")
      .get() as { name: string } | undefined;
    expect(row?.name).toBe("expenses");
  });

  it("expenses table has the correct columns", () => {
    const columns = db.prepare("PRAGMA table_info(expenses)").all() as { name: string }[];
    const names = columns.map((c) => c.name);
    expect(names).toEqual(["id", "amount", "category", "description", "date", "created_at"]);
  });

  it("rejects a row with an invalid category", () => {
    expect(() => {
      db.prepare("INSERT INTO expenses (amount, category, description, date) VALUES (10, 'Invalid', 'test', '2026-06-09')").run();
    }).toThrow();
  });

  it("rejects a row with amount <= 0", () => {
    expect(() => {
      db.prepare(`INSERT INTO expenses (amount, category, description, date) VALUES (0, '${CATEGORIES[0]}', 'test', '2026-06-09')`).run();
    }).toThrow();
  });

  it("accepts a valid expense row", () => {
    const result = db
      .prepare(`INSERT INTO expenses (amount, category, description, date) VALUES (25.50, '${CATEGORIES[0]}', 'Lunch', '2026-06-09')`)
      .run();
    expect(result.changes).toBe(1);
  });
});
