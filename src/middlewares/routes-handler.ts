import { ServerResponse } from "node:http";
import { routes } from "../routes/index.js";
import { Database } from "../database/database.js";
import { extractQueryParams } from "../utils/extract-query-params.js";
import { CustomRequest } from "./json-handler.js";
import { handleError } from "./error-handler.js";

const database = new Database();

export function routesHandler(req: CustomRequest, res: ServerResponse) {
  const route = routes.find((route) => {
    return route.method === req.method && route.path.test(req.url || "");
  });

  if (route) {
    const routeParams = (req.url || "").match(route.path);

    if (routeParams?.groups) {
      const { query, ...params } = routeParams.groups;
      req.params = params;
      req.query = query ? extractQueryParams(query) : {};
    }

    try {
      return route.controller({ req, res, database });
    } catch (error) {
      return handleError(error, res);
    }
  }

  res.writeHead(404).end(JSON.stringify({ status: "error", message: "Rota não encontrada" }));
}