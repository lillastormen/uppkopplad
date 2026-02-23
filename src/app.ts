import express from "express";
import userRoutes from "./routes/userRoutes.ts";
import quizRoutes from "./routes/quizRoutes.ts";
import modulesRoutes from "./routes/moduleRoutes.ts";

const app = express();

app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//Users Routes
app.use("/users", userRoutes);

// Main modules Routes
app.use("/api/mainModules", modulesRoutes);

//Lessons Routes
app.use("/api/lessons", modulesRoutes);

//Quiz Routes
app.use("/quiz", quizRoutes);


export default app;
