import request from "supertest";
import Task from "../src/models/Task";
import Project from "../src/models/Project";
import User from "../src/models/User";
import app from "../src/server";

let token: string;
let userId: string;

beforeAll(async () => {
  const res = await request(app).post("/api/auth/register").send({
    email: "test@example.com",
    password: "password123",
  });

  token = res.body.token;
  userId = res.body.userId;
});

afterEach(async () => {
  await Task.deleteMany({});
  await Project.deleteMany({});
  await User.deleteMany({});
});

describe("Task API", () => {
  it("should create a new task", async () => {
    // Primeiro, crie um projeto para a tarefa
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
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Tarefa Teste",
        description: "Descrição da Tarefa Teste",
        project: projectId,
        assignedTo: "665f95e2957f65e976a2fe86",
        status: "pending",
        dueDate: "2024-07-01T00:00:00.000Z",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Tarefa Teste");
  });

  it("should get a list of tasks for a project", async () => {
    // Primeiro, crie um projeto para a tarefa
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

    // Em seguida, crie uma tarefa para o projeto
    await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Tarefa Teste",
        description: "Descrição da Tarefa Teste",
        project: projectId,
        assignedTo: "665f95e2957f65e976a2fe86",
        status: "pending",
        dueDate: "2024-07-01T00:00:00.000Z",
      });

    const res = await request(app)
      .get(`/api/tasks/${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should update a task", async () => {
    // Primeiro, crie um projeto para a tarefa
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

    // Em seguida, crie uma tarefa para o projeto
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Tarefa Teste",
        description: "Descrição da Tarefa Teste",
        project: projectId,
        assignedTo: userId,
        status: "pending",
        dueDate: "2024-07-01T00:00:00.000Z",
      });

    const taskId = taskRes.body._id;

    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Tarefa Atualizada",
        description: "Descrição Atualizada",
        status: "in-progress",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Tarefa Atualizada");
  });

  it("should delete a task", async () => {
    // Primeiro, crie um projeto para a tarefa
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

    // Em seguida, crie uma tarefa para o projeto
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Tarefa Teste",
        description: "Descrição da Tarefa Teste",
        project: projectId,
        assignedTo: userId,
        status: "pending",
        dueDate: "2024-07-01T00:00:00.000Z",
      });

    const taskId = taskRes.body._id;

    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});
