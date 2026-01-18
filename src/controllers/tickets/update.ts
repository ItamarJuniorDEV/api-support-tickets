import { RouteContext } from "../../routes/tickets.js";
import { updateTicketSchema } from "../../schemas/tickets-schema.js";
import { AppError } from "../../utils/AppError.js";

export function update({ req, res, database }: RouteContext) {
  const { id } = req.params;
  const data = updateTicketSchema.parse(req.body);

  const tickets = database.select("tickets");
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    throw new AppError("Ticket não encontrado", 404);
  }

  database.update("tickets", id, {
    ...data,
    updated_at: new Date(),
  });

  return res.writeHead(204).end();
}