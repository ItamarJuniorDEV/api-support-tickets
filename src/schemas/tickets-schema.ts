import { z } from "zod";

export const createTicketSchema = z.object({
  equipment: z
    .string({ required_error: "Equipamento é obrigatório" })
    .min(2, "Equipamento deve ter pelo menos 2 caracteres"),
  description: z
    .string({ required_error: "Descrição é obrigatória" })
    .min(5, "Descrição deve ter pelo menos 5 caracteres"),
  user_name: z
    .string({ required_error: "Nome do usuário é obrigatório" })
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
});

export const updateTicketSchema = z.object({
  equipment: z.string().min(2, "Equipamento deve ter pelo menos 2 caracteres").optional(),
  description: z.string().min(5, "Descrição deve ter pelo menos 5 caracteres").optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(["open", "progress", "closed"], {
    errorMap: () => ({ message: "Status deve ser: open, progress ou closed" }),
  }),
  solution: z.string().optional(),
});

export type CreateTicketDTO = z.infer<typeof createTicketSchema>;
export type UpdateTicketDTO = z.infer<typeof updateTicketSchema>;
export type UpdateStatusDTO = z.infer<typeof updateStatusSchema>;