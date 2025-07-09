import express from "express";
import { port, origin, jwtSecret } from "./config/env.js";
import cors from "cors";
import helmet from "helmet";
import logger from "./middlewares/logger.js";
import authRoutes from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import subTaskRoutes from "./routes/subTaskRoutes.js";
import connectDb from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
console.log(origin);

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);
app.use(cookieParser(jwtSecret));
app.use(helmet());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/project", projectRouter);
app.use("/api/task", taskRoutes);
app.use("/api/subtask", subTaskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
connectDb();

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
