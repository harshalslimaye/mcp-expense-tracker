import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import Database from "better-sqlite3";
import { z } from "zod";
import { CATEGORIES } from "../constants.js";

// TODO: register tool handlers
export function registerTools(server: McpServer, db: Database.Database): void {}
