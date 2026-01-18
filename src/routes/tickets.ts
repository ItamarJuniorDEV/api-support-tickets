import { ServerResponse } from "node:http";
import { CustomRequest } from "../middlewares/json-handler.js";
import { Database } from "../database/database.js";
import { create } from "../controllers/tickets/create.js";
import { index } from "../controllers/tickets/index.js";
import { show } from "../controllers/tickets/show.js";
import { update } from "../controllers/tickets/update.js";
import { updateStatus } from "../controllers/tickets/update-status.js";
import { remove } from "../controllers/tickets/remove.js";

export interface RouteContext {
  req: CustomRequest;
  res: ServerResponse;
  database: Database;
}

interface RouteDefinition {
  method: string;
  path: string;
  controller: (ctx: RouteContext) => void;
}

export const tickets: RouteDefinition[] = [
  { method: "POST", path: "/tickets", controller: create },
  { method: "GET", path: "/tickets", controller: index },
  { method: "GET", path: "/tickets/:id", controller: show },
  { method: "PUT", path: "/tickets/:id", controller: update },
  { method: "PATCH", path: "/tickets/:id/status", controller: updateStatus },
  { method: "DELETE", path: "/tickets/:id", controller: remove },
];