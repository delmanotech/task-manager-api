import request from "supertest";
import Transaction, {
  CreateTransactionRequest,
} from "../src/models/Transaction";
import Project from "../src/models/Project";
import User from "../src/models/User";
import app from "../src/server";

let token: string;
let userId: string;
let categoryId: string;
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
      description: "A project for testing transactions",
      owner: userId,
      members: [userId],
    });

  projectId = projectRes.body._id;

  const categoryRes = await request(app)
    .post("/api/categories")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test Category",
      type: "income",
      project: projectId,
    });

  categoryId = categoryRes.body._id;
});

afterEach(async () => {
  await Transaction.deleteMany({});
  await Project.deleteMany({});
  await User.deleteMany({});
});

const createTransaction = async () => {
  const res = await request(app)
    .post("/api/transactions")
    .set("Authorization", `Bearer ${token}`)
    .send({
      project: projectId,
      category: categoryId,
      description: "Test Transaction",
      type: "income",
      amount: 100,
      paymentDate: new Date(),
      createdBy: userId,
      paid: false,
    } as CreateTransactionRequest);
  return res.body;
};

describe("Transaction API", () => {
  it("should create a new transaction", async () => {
    const res = await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        project: projectId,
        category: categoryId,
        description: "Test Transaction",
        type: "income",
        amount: 100,
        paymentDate: new Date(),
        paid: false,
      } as CreateTransactionRequest);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("description", "Test Transaction");
  });

  it("should get a list of transactions for a project", async () => {
    await createTransaction();

    const res = await request(app)
      .get(`/api/transactions?projectId=${projectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a transaction by ID", async () => {
    const transaction = await createTransaction();

    const res = await request(app)
      .get(`/api/transactions/${transaction._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("description", "Test Transaction");
  });

  it("should update a transaction", async () => {
    const transaction = await createTransaction();

    const res = await request(app)
      .put(`/api/transactions/${transaction._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Updated Transaction",
        type: "expense",
        amount: 150,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("description", "Updated Transaction");
    expect(res.body).toHaveProperty("type", "expense");
    expect(res.body).toHaveProperty("amount", 150);
  });

  it("should delete a transaction", async () => {
    const transaction = await createTransaction();

    const res = await request(app)
      .delete(`/api/transactions/${transaction._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});
