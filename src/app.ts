import express from "express";
import userRoutes from "./routes/userRoutes.ts";
import quizRoutes from "./routes/quizRoutes.ts";
import lessonRoutes from "./routes/moduleRoutes.ts";
import "dotenv/config";
import router from "./routes/moduleRoutes.ts";
import cors from "cors";
import modulesRoutes from "./routes/moduleRoutes.ts";
import { createSession } from "./config/session.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(createSession());
app.use(express.static("public"));
app.use(cors());


//Users Routes
app.use("/users", userRoutes);

// Main modules Routes
app.use("/api/mainModules", modulesRoutes);

//Lessons Routes
app.use("/api/lessons", modulesRoutes);

//Quiz Routes
app.use("/quiz", quizRoutes);

export default app;
