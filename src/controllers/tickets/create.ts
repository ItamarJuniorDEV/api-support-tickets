import { randomUUID } from "node:crypto";
import { RouteContext } from "../../routes/tickets.js";
import { createTicketSchema } from "../../schemas/tickets-schema.js";

export function create({ req, res, database }: RouteContext) {
  const data = createTicketSchema.parse(req.body);

  const ticket = {
    id: randomUUID(),
    equipment: data.equipment,
    description: data.description,
    user_name: data.user_name,
    status: "open" as const,
    created_at: new Date(),
    updated_at: new Date(),
  };

  database.insert("tickets", ticket);

  return res.writeHead(201).end(JSON.stringify(ticket));
}