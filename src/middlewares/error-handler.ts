import { ServerResponse } from "node:http";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

export function handleError(error: unknown, res: ServerResponse) {
  if (error instanceof AppError) {
    return res.writeHead(error.statusCode).end(
      JSON.stringify({
        status: "error",
        message: error.message,
      })
    );
  }

  if (error instanceof ZodError) {
    return res.writeHead(400).end(
      JSON.stringify({
        status: "error",
        message: "Erro de validação",
        issues: error.flatten().fieldErrors,
      })
    );
  }

  console.error(error);

  return res.writeHead(500).end(
    JSON.stringify({
      status: "error",
      message: "Erro interno do servidor",
    })
  );
}