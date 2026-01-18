import { RouteContext } from "../../routes/tickets.js";

export function index({ req, res, database }: RouteContext) {
  const { status } = req.query;

  const filters = status ? { status: status as "open" | "progress" | "closed" } : undefined;

  const tickets = database.select("tickets", filters);

  return res.end(JSON.stringify(tickets));
}