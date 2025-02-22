import http from "node:http";

import { jsonHandler } from "./middlewares/jsonHandler.js";
import { json } from "node:stream/consumers";

async function listener(req, res) {
  await jsonHandler(req, res);
  console.log(req.body);
}

http.createServer(listener).listen(3333);
