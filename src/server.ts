import http from "node:http";
import { jsonHandler, CustomRequest } from "./middlewares/json-handler.js";
import { routesHandler } from "./middlewares/routes-handler.js";

async function listener(req: http.IncomingMessage, res: http.ServerResponse) {
  await jsonHandler(req, res);
  routesHandler(req as CustomRequest, res);
}

const PORT = process.env.PORT || 3333;

http.createServer(listener).listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});