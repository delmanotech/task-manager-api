import request from "supertest";
import Project from "../src/models/Project";
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
  await Project.deleteMany({});
  await User.deleteMany({});
});

describe("Project API", () => {
  it("should create a new project", async () => {
    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Projeto Teste",
        description: "Descrição do Projeto Teste",
        owner: "665f95e2957f65e976a2fe86",
        members: ["665f95e2957f65e976a2fe86"],
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Projeto Teste");
  });

  it("should get a list of projects", async () => {
    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should update a project", async () => {
    const projectRes = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Projeto Teste",
        description: "Descrição do Projeto Teste",
        owner: "665f95e2957f65e976a2fe86",
        members: ["665f95e2957f65e976a2fe86"],
      });

    const projectId = projectRes.body._id;

    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Projeto Atualizado",
        description: "Descrição Atualizada",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Projeto Atualizado");
  });

  it("should delete a project", async () => {
    const projectRes = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Projeto Teste",
        description: "Descrição do Projeto Teste",
        owner: "665f95e2957f65e976a2fe86",
        members: ["665f95e2957f65e976a2fe86"],
      });

    const projectId = projectRes.body._id;

    const res = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});
