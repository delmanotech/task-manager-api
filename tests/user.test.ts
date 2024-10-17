import request from "supertest";
import mongoose from "mongoose";
import User from "../src/models/User";
import app from "../src/server";

let token: string;

beforeAll(async () => {
  await request(app).post("/api/auth/register").send({
    email: "test@example.com",
    password: "password123",
  });

  const res = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "password123",
  });

  token = res.body.token;
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("User API", () => {
  it("should get a list of users", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a user by id", async () => {
    const { body } = await request(app).post("/api/auth/register").send({
      email: "anotheruser@example.com",
      password: "password123",
    });

    const { user } = body;

    const userId = user._id;

    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", userId);
  });

  it("should update a user", async () => {
    const { body } = await request(app).post("/api/auth/register").send({
      email: "anotheruser@example.com",
      password: "password123",
    });

    const { user } = body;

    const userId = user._id;

    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "updated@example.com",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "updated@example.com");
  });

  it("should delete a user", async () => {
    const { body } = await request(app).post("/api/auth/register").send({
      email: "anotheruser@example.com",
      password: "password123",
    });

    const { user } = body;

    const userId = user._id;

    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});
