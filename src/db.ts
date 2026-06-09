import Database from "better-sqlite3";

// TODO: create db instance pointing to data/expenses.db and implement initDb to create tables
export const db = new Database("data/expenses.db");

export function initDb(database: Database.Database): void {
  // TODO
}
