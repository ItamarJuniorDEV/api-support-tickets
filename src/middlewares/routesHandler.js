import { routes } from "../routes/index.js";

export function routesHandler(req, res) {
  const route = routes.find(
    (route) => route.method === req.method && route.path === req.url
  );

  if (route) {
    return route.controller(req, res);
  }

  res.writeHead(404).end();
}
