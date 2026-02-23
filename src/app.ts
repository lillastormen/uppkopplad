import express from "express";
import userRoutes from "./routes/userRoutes.ts";
import quizRoutes from "./routes/quizRoutes.ts";
import lessonRoutes from "./routes/moduleRoutes.ts";
import "dotenv/config";
import router from "./routes/moduleRoutes.ts";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Users Routes
app.use("/users", userRoutes);

//Lessons Routes
app.use("/api/lessons", router);

//Quiz Routes
app.use("/quiz", quizRoutes);

export default app;
