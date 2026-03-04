import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import userRoutes from "./routes/userRoutes.ts";
import quizRoutes from "./routes/quizRoutes.ts";
import modulesRoutes from "./routes/moduleRoutes.ts";
import "dotenv/config";
import cors from "cors";
import { createSession } from "./config/session.ts";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(createSession());
app.use(express.static("public"));

//Users Routes
app.use("/users", userRoutes);

// Main modules Routes
app.use("/api/mainModules", modulesRoutes.mainModulesRoutes);

//Lessons Routes
app.use("/api/lessons", modulesRoutes.lessonsRoutes);

//Quiz Routes
app.use("/quiz", quizRoutes);

// For global error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Global error handler: ", err.message, err.stack);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
