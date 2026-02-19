import express from 'express';
import 'dotenv/config';
import { startMongoServer } from './server.js';
import cors from 'cors';
import router from "./routes/moduleRoutes.ts";

const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/lessons', router);

(async () => {
    await startMongoServer();
    app.listen(port, () => {
        console.log(`App is listening on port: ${port}`);
    });
})();

export default app;
