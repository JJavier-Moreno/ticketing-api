import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import server from "../server.js";
import Ticket from "../models/ticket.js";
import User from "../models/User.js";

describe("Ticket tests", () => {
  let token;

  beforeAll(async () => {
    await User.deleteMany(); // Borrar usuarios antes de los tests
    const response = await request(app).post("/api/users/register").send({
      name: "Jose Javier",
      email: "corredeprueba4@gmail.com",
      password: "bichoneo123",
      rol: "admin",
    });

    token = response.body.token;
    if (!token) {
      throw new Error("Token not found in the response body");
    }
  });

  beforeEach(async () => {
    await Ticket.deleteMany(); // Limpiar tickets antes de cada prueba
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve)); // Espera a que se cierre el servidor
    await mongoose.connection.close(); // Cierra la conexión de MongoDB
  });

  test("Create a new ticket", async () => {
    if (!token) {
      throw new Error("Token is missing");
    }

    const response = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Ticket #1",
        description: "Ticket desde test",
        priority: "high",
        state: "open",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("ticket");
  });

  test("Get all tickets", async () => {
    const response = await request(app).get("/api/tickets");

    expect(response.status).toBe(200); // El código de estado correcto es 200
    expect(response.body).toHaveProperty("tickets");
  });
});
