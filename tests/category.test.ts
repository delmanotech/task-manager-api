import request from "supertest";
import app from "../src/server";
import User from "../src/models/User";
import Project from "../src/models/Project";
import Category from "../src/models/Category";

let token: string;
let userId: string;
let projectId: string;

beforeAll(async () => {
  const res = await request(app).post("/api/auth/register").send({
    email: "test@example.com",
    password: "password123",
  });

  token = res.body.token;
  userId = res.body.userId;

  const projectRes = await request(app)
    .post("/api/projects")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test Project",
      description: "A project for testing categories",
      owner: userId,
      members: [userId],
    });

  projectId = projectRes.body._id;
});

afterEach(async () => {
  await Category.deleteMany({});
  await Project.deleteMany({});
  await User.deleteMany({});
});

const createCategory = async () => {
  const res = await request(app)
    .post("/api/categories")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test Category",
      type: "income",
      project: projectId,
    });
  return res.body;
};

describe("Category API", () => {
  it("should create a new category", async () => {
    const res = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Category",
        type: "income",
        project: projectId,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Test Category");
  });

  it("should get a list of categories for a project", async () => {
    await createCategory();
    const res = await request(app)
      .get(`/api/categories?projectId=${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a category by ID", async () => {
    const category = await createCategory();

    const res = await request(app)
      .get(`/api/categories/${category._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Test Category");
  });

  it("should update a category", async () => {
    const category = await createCategory();

    const res = await request(app)
      .put(`/api/categories/${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Category",
        type: "expense",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Updated Category");
    expect(res.body).toHaveProperty("type", "expense");
  });

  it("should delete a category", async () => {
    const category = await createCategory();

    const res = await request(app)
      .delete(`/api/categories/${category._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});
