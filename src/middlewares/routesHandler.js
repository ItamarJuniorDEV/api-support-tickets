import { routes } from "../routes/index.js";
import { Database } from "../database/database.js";

const database = new Database();

export function routesHandler(req, res) {
  const route = routes.find(
    (route) => route.method === req.method && route.path === req.url
  );

  if (route) {
    return route.controller({ req, res, database });
  }

  res.writeHead(404).end();
}
