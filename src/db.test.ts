import { describe, it, beforeEach } from "vitest";
import Database from "better-sqlite3";
import { initDb } from "../db.js";

describe("initDb", () => {
  let db: Database.Database;

  beforeEach(() => {
    db = new Database(":memory:");
  });

  it.todo("creates the expected tables");
});
