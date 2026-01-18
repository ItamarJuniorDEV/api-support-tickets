import { RouteContext } from "../../routes/tickets.js";
import { updateStatusSchema } from "../../schemas/tickets-schema.js";
import { AppError } from "../../utils/AppError.js";

export function updateStatus({ req, res, database }: RouteContext) {
  const { id } = req.params;
  const data = updateStatusSchema.parse(req.body);

  const tickets = database.select("tickets");
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    throw new AppError("Ticket não encontrado", 404);
  }

  if (data.status === "closed" && !data.solution) {
    throw new AppError("Solução é obrigatória para fechar o ticket", 400);
  }

  database.update("tickets", id, {
    status: data.status,
    solution: data.solution,
    updated_at: new Date(),
  });

  return res.writeHead(204).end();
}