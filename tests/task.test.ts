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

// Funções auxiliares para criar um projeto e uma tarefa
const createProject = async () => {
  const res = await request(app)
    .post("/api/projects")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Projeto Teste",
      description: "Descrição do Projeto Teste",
      owner: userId,
      members: [userId],
    });
  return res.body._id;
};

const createTask = async (projectId: string) => {
  const res = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Tarefa Teste",
      description: "Descrição da Tarefa Teste",
      project: projectId,
      assignedTo: userId,
      status: "pending",
      dueDate: "2024-07-01T00:00:00.000Z",
      createdBy: userId,
    });
  return res.body;
};

describe("Task API", () => {
  it("should create a new task", async () => {
    const projectId = await createProject();
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

    expect(taskRes.statusCode).toEqual(201);
    expect(taskRes.body).toHaveProperty("name", "Tarefa Teste");
  });

  it("should get a list of tasks for a project", async () => {
    const projectId = await createProject();
    await createTask(projectId);

    const res = await request(app)
      .get(`/api/tasks?projectId=${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a task by ID", async () => {
    const projectId = await createProject();
    const task = await createTask(projectId);

    const res = await request(app)
      .get(`/api/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Tarefa Teste");
  });

  it("should update a task", async () => {
    const projectId = await createProject();
    const task = await createTask(projectId);

    const res = await request(app)
      .put(`/api/tasks/${task._id}`)
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
    const projectId = await createProject();
    const task = await createTask(projectId);

    const res = await request(app)
      .delete(`/api/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});
