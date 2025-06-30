import express from "express";
import { port, origin } from "./config/env.js";
import cors from "cors";
import helmet from "helmet";
import logger from "./middlewares/logger.js";
import authRoutes from "./routes/authRoutes.js";
import connectDb from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);
app.use(helmet());
app.use(logger);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
connectDb();

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
