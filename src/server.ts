import 'dotenv/config';
import Express from 'express';
import { mongoDBConnect } from './db/mongo.ts';

const app = Express();
const PORT = 3000;

/* Middleware för senare
    app.use(express.json());
    app.use(cors());
    app.use('/api/lessons', lessonsRouter);
 */

async function startMongoServer() {
    try {
        await mongoDBConnect();
        console.log('Connected to mongoDB');
        app.listen(PORT, () => {
            console.log(`Server started and listening on port: ${PORT}`);
        });
    } catch (err) {
        console.error('Server could not start: ', err);
        process.exit(1);
    }
}

startMongoServer();