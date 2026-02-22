import "dotenv/config";
import { mongoDBConnect } from "./db/mongo.ts";
import app from "./app.ts";
import { connectMySQL } from "./db/mysql.ts";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await Promise.all([mongoDBConnect(), connectMySQL()]);
    console.log("Connected to MongoDB.");
    console.log("Connected to MySQL.");

    app.listen(PORT, () => {
      console.log(`Server started and listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Server could not not start: ", error);
    process.exit(1);
  }
}

startServer();
