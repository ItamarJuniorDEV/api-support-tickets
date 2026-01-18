import { RouteContext } from "../../routes/tickets.js";
import { AppError } from "../../utils/AppError.js";

export function remove({ req, res, database }: RouteContext) {
  const { id } = req.params;

  const tickets = database.select("tickets");
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    throw new AppError("Ticket não encontrado", 404);
  }

  database.delete("tickets", id);

  return res.writeHead(204).end();
}