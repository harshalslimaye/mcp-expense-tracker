import { describe, it, beforeEach } from "vitest";
import Database from "better-sqlite3";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerTools } from "./tools.js";

describe("registerTools", () => {
  let server: McpServer;
  let db: Database.Database;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.0" });
    db = new Database(":memory:");
  });

  it.todo("registers all tools without throwing");
  it.todo("each tool returns correct results");
});
