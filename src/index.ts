import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import cors from "cors";
import { initDb, db } from "./db.js";
import { registerTools } from "./handlers/tools.js";
import { registerResources } from "./handlers/resources.js";
import { registerPrompts } from "./handlers/prompts.js";
import { registerSampling } from "./handlers/sampling.js";

// TODO: read TRANSPORT env var, create McpServer, call initDb, register all handlers, start transport
