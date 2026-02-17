import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
    throw new Error("MONGO_URI missing in the .env file");
}

export async function mongoDBConnect (): Promise<void> {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection fail', err);
        process.exit(1);
    }
}