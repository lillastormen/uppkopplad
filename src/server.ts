import "dotenv/config";
import { mongoDBConnect } from "./db/mongo.ts";
import app from "./app.ts";
import mySqlDbConnection from "./db/mysql.ts";

export async function startMongoServer() {
  try {
    await mongoDBConnect();
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error("Server could not start: ", err);
    process.exit(1);
  }
import 'dotenv/config';
import { mongoDBConnect } from './db/mongo.ts';
import app from './app.ts';
import { connectMySQL } from './db/mysql.ts';

const PORT = Number(process.env.PORT) || 3000;


async function startServer() {
    try {
        await Promise.all([
            mongoDBConnect(),
            connectMySQL()
        ]);
        console.log('Connected to MongoDB.');
        console.log('Connected to MySQL.');

        app.listen(PORT, () => {
            console.log(`Server started and listening on port: ${PORT}`);
        });
    } catch (error) {
        console.log('Server couldnt not start: ', error);
        process.exit(1);
    }
}
// export async function startMongoServer() {
//     try {
//         await mongoDBConnect();
//         console.log('Connected to mongoDB');
//     } catch (err) {
//         console.error('Server could not start: ', err);
//         process.exit(1);
//     }
// }

// mySqlDbConnection.connect((error) => {
//     if (error) {
//         console.log('MySQL connection failed: ', error);
//         process.exit(1);
//     }

mySqlDbConnection.connect(error => {
  if (error) {
    console.log("MySQL connection failed: ", error);
    process.exit(1);
  }

  console.log("MySQL connected successfully");

  app.listen(PORT, () => {
    console.log(`Server started and listening on port: ${PORT}`);
  });
});
//     console.log('MySQL connected successfully');

//     app.listen(PORT, () => {
//         console.log(`Server started and listening on port: ${PORT}`);
//     });
// });

startServer();
