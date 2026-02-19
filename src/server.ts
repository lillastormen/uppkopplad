import 'dotenv/config';
import { mongoDBConnect } from './db/mongo.ts';

export async function startMongoServer() {
    try {
        await mongoDBConnect();
        console.log('Connected to mongoDB');
    } catch (err) {
        console.error('Server could not start: ', err);
        process.exit(1);
    }
}
