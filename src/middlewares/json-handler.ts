import { IncomingMessage, ServerResponse } from "node:http";

export interface CustomRequest extends IncomingMessage {
  body: Record<string, unknown>;
  params: Record<string, string>;
  query: Record<string, string>;
}

export async function jsonHandler(req: IncomingMessage, res: ServerResponse) {
  const buffers: Buffer[] = [];

  for await (const chunk of req) {
    buffers.push(chunk as Buffer);
  }

  try {
    (req as CustomRequest).body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    (req as CustomRequest).body = {};
  }

  res.setHeader("Content-Type", "application/json");
}