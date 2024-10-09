import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import setupSwagger from "./swagger"; // Importar configuração do Swagger

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

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

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
