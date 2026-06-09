import Database from "better-sqlite3";
import { CATEGORIES } from "./constants.js";

export const db: Database.Database = new Database("data/expenses.db");

export function initDb(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      amount      REAL    NOT NULL CHECK (amount > 0),
      category    TEXT    NOT NULL CHECK (category IN (${CATEGORIES.map((c) => `'${c}'`).join(",")})),
      description TEXT    NOT NULL,
      date        TEXT    NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )
  `);
}
