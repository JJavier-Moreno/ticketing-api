import request from "supertest";
import app from "../app.js";
import server from "../server.js";
import User from "../models/User.js";
import mongoose from "mongoose";

describe("User tests", () => {
  beforeAll(async () => {
    await User.deleteMany(); // Borrar usuarios antes de los tests
  });

  afterAll(async () => {
    server.close();
    await new Promise((resolve) => server.close(resolve)); // Espera a que se cierre el servidor
  });

  test("Create a new User", async () => {
    const response = await request(app).post("/api/users/register").send({
      name: "Jose Javier",
      email: "corredeprueba2@gmail.com",
      password: "bichoneo123",
      rol: "admin",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });
});
