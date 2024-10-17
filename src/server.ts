import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import setupSwagger from "./swagger";
import errorHandler from "./middlewares/errorHandlerMiddeware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Database connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes").default);
app.use("/api/projects", require("./routes/projectRoutes").default);
app.use("/api/tasks", require("./routes/taskRoutes").default);
app.use("/api/transactions", require("./routes/transactionRoutes").default);
app.use("/api/users", require("./routes/userRoutes").default);

// Swagger setup
setupSwagger(app); // Configurar Swagger

// Error handler middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
