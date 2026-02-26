import express from "express";
import userRoutes from "./routes/userRoutes.ts";
import quizRoutes from "./routes/quizRoutes.ts";
import "dotenv/config";
import cors from "cors";
import modulesRoutes from "./routes/moduleRoutes.ts";
import { createSession } from "./config/session.ts";
import routes from './routes/moduleRoutes.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(createSession());
app.use(express.static("public"));
app.use(cors(
    {
        origin: 'http://localhost:63342',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));

//Users Routes
app.use("/users", userRoutes);

// Main modules Routes
app.use("/api/mainModules", routes.mainModulesRoutes);

//Lessons Routes
app.use("/api/lessons", routes.lessonsRoutes);

//Quiz Routes
app.use("/quiz", quizRoutes);

export default app;
