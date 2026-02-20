import express from "express";
import userRoutes from "./routes/userRoutes.ts";
import quizRoutes from "./routes/quizRoutes.ts";
import lessonRoutes from "./routes/moduleRoutes.ts";
import "dotenv/config";
import { startMongoServer } from "./server.ts";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Routes
app.use("/users", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/api/lessons", lessonRoutes);

(async () => {
  await startMongoServer();
  app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
  });
})();

export default app;
