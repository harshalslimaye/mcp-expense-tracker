import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { randomUUID } from "node:crypto";
import express from "express";
import cors from "cors";
import { initDb, db } from "./db.js";
import { registerTools } from "./handlers/tools.js";
import { registerResources } from "./handlers/resources.js";
import { registerPrompts } from "./handlers/prompts.js";
import { registerSampling } from "./handlers/sampling.js";

const transport = (process.env.TRANSPORT ?? "stdio") as "stdio" | "http";

const server = new McpServer({ version: "1.0.0", name: "mcp-expense-tracker" });

initDb(db);

registerTools(server, db);
registerResources(server, db);
registerPrompts(server, db);
registerSampling(server, db);

if (transport === "http") {
  const PORT = Number(process.env.PORT ?? 3000);
  const app = express();
  app.use(cors());
  app.use(express.json());

  const sessions = new Map<string, StreamableHTTPServerTransport>();

  const mcpHandler = async (req: express.Request, res: express.Response) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined;

    if (sessionId) {
      const existing = sessions.get(sessionId);
      if (!existing) {
        res.status(400).json({ error: "Unknown session ID" });
        return;
      }
      await existing.handleRequest(req, res);
      return;
    }

    // No session ID — must be an initialize request
    if (!isInitializeRequest(req.body)) {
      res.status(400).json({ error: "Expected initialize request" });
      return;
    }

    const httpTransport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (id): void => { sessions.set(id, httpTransport); },
    });

    httpTransport.onclose = () => {
      if (httpTransport.sessionId) sessions.delete(httpTransport.sessionId);
    };

    await server.connect(httpTransport);
    await httpTransport.handleRequest(req, res, req.body);
  };

  app.all("/mcp", mcpHandler);

  app.listen(PORT, () => {
    console.error(`MCP server listening on port ${PORT}`);
  });
} else {
  const stdioTransport = new StdioServerTransport();
  await server.connect(stdioTransport);
}
