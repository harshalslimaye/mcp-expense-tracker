import { describe, it, beforeEach } from "vitest";
import Database from "better-sqlite3";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerPrompts } from "./prompts.js";

describe("registerPrompts", () => {
  let server: McpServer;
  let db: Database.Database;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "0.0.0" });
    db = new Database(":memory:");
  });

  it.todo("registers all prompts without throwing");
  it.todo("each prompt returns correct messages");
});
