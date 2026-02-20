import express from "express";
import userRoutes from "./routes/userRoutes.ts";
import quizRoutes from "./routes/quizRoutes.ts";
import lessonRoutes from "./routes/moduleRoutes.ts";
import "dotenv/config";
import { startMongoServer } from "./server.ts";
import cors from "cors";
import "dotenv/config";
// import { startMongoServer } from './server.js';
import router from "./routes/moduleRoutes.ts";

const app = express();
const port = process.env.PORT;

app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

(async () => {
  await startMongoServer();
  app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
  });
})();
//Users Routes
app.use("/users", userRoutes);

//Lessons Routes
app.use("/api/lessons", router);

//Quiz Routes
app.use("/quiz", quizRoutes);

// (async () => {
//     await startMongoServer();
//     app.listen(port, () => {
//         console.log(`App is listening on port: ${port}`);
//     });
// })();

export default app;
