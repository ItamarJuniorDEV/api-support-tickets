import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import http from "node:http";
import { jsonHandler, CustomRequest } from "../middlewares/json-handler.js";
import { routesHandler } from "../middlewares/routes-handler.js";

let server: http.Server;
let ticketId: string;

beforeAll((done) => {
  server = http.createServer(async (req, res) => {
    await jsonHandler(req, res);
    routesHandler(req as CustomRequest, res);
  });
  server.listen(0, done);
});

afterAll((done) => {
  server.close(done);
});

function getUrl() {
  const addr = server.address();
  if (addr && typeof addr === "object") {
    return `http://localhost:${addr.port}`;
  }
  return "http://localhost:3333";
}

describe("Tickets", () => {
  describe("POST /tickets", () => {
    it("deve criar um novo ticket", async () => {
      const res = await request(getUrl()).post("/tickets").send({
        equipment: "Mouse",
        description: "Mouse não funciona",
        user_name: "João",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.equipment).toBe("Mouse");
      expect(res.body.status).toBe("open");

      ticketId = res.body.id;
    });

    it("deve falhar ao criar ticket sem equipamento", async () => {
      const res = await request(getUrl()).post("/tickets").send({
        description: "Mouse não funciona",
        user_name: "João",
      });

      expect(res.status).toBe(400);
    });

    it("deve falhar ao criar ticket sem descrição", async () => {
      const res = await request(getUrl()).post("/tickets").send({
        equipment: "Mouse",
        user_name: "João",
      });

      expect(res.status).toBe(400);
    });

    it("deve falhar ao criar ticket sem nome do usuário", async () => {
      const res = await request(getUrl()).post("/tickets").send({
        equipment: "Mouse",
        description: "Mouse não funciona",
      });

      expect(res.status).toBe(400);
    });

    it("deve falhar ao criar ticket com equipamento curto", async () => {
      const res = await request(getUrl()).post("/tickets").send({
        equipment: "M",
        description: "Mouse não funciona",
        user_name: "João",
      });

      expect(res.status).toBe(400);
    });

    it("deve falhar ao criar ticket com descrição curta", async () => {
      const res = await request(getUrl()).post("/tickets").send({
        equipment: "Mouse",
        description: "Erro",
        user_name: "João",
      });

      expect(res.status).toBe(400);
    });

    it("deve falhar ao criar ticket com nome curto", async () => {
      const res = await request(getUrl()).post("/tickets").send({
        equipment: "Mouse",
        description: "Mouse não funciona",
        user_name: "J",
      });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /tickets", () => {
    it("deve listar todos os tickets", async () => {
      const res = await request(getUrl()).get("/tickets");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("deve filtrar tickets por status", async () => {
      const res = await request(getUrl()).get("/tickets?status=open");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /tickets/:id", () => {
    it("deve buscar um ticket por ID", async () => {
      const res = await request(getUrl()).get(`/tickets/${ticketId}`);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(ticketId);
    });

    it("deve falhar ao buscar ticket inexistente", async () => {
      const res = await request(getUrl()).get("/tickets/00000000-0000-0000-0000-000000000000");

      expect(res.status).toBe(404);
    });
  });

  describe("PUT /tickets/:id", () => {
    it("deve atualizar um ticket", async () => {
      const res = await request(getUrl()).put(`/tickets/${ticketId}`).send({
        equipment: "Teclado",
        description: "Tecla com defeito",
      });

      expect(res.status).toBe(204);
    });

    it("deve falhar ao atualizar ticket inexistente", async () => {
      const res = await request(getUrl())
        .put("/tickets/00000000-0000-0000-0000-000000000000")
        .send({
          equipment: "Teclado",
        });

      expect(res.status).toBe(404);
    });
  });

  describe("PATCH /tickets/:id/status", () => {
    it("deve atualizar status para progress", async () => {
      const res = await request(getUrl()).patch(`/tickets/${ticketId}/status`).send({
        status: "progress",
      });

      expect(res.status).toBe(204);
    });

    it("deve falhar ao fechar ticket sem solução", async () => {
      const res = await request(getUrl()).patch(`/tickets/${ticketId}/status`).send({
        status: "closed",
      });

      expect(res.status).toBe(400);
    });

    it("deve fechar ticket com solução", async () => {
      const res = await request(getUrl()).patch(`/tickets/${ticketId}/status`).send({
        status: "closed",
        solution: "Trocamos o equipamento",
      });

      expect(res.status).toBe(204);
    });

    it("deve falhar com status inválido", async () => {
      const res = await request(getUrl()).patch(`/tickets/${ticketId}/status`).send({
        status: "invalido",
      });

      expect(res.status).toBe(400);
    });

    it("deve falhar ao atualizar status de ticket inexistente", async () => {
      const res = await request(getUrl())
        .patch("/tickets/00000000-0000-0000-0000-000000000000/status")
        .send({
          status: "progress",
        });

      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /tickets/:id", () => {
    it("deve remover um ticket", async () => {
      const res = await request(getUrl()).delete(`/tickets/${ticketId}`);

      expect(res.status).toBe(204);
    });

    it("deve falhar ao remover ticket inexistente", async () => {
      const res = await request(getUrl()).delete("/tickets/00000000-0000-0000-0000-000000000000");

      expect(res.status).toBe(404);
    });
  });
});