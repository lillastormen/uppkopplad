import mongoose from 'mongoose'

function getRequiredEnvVar(name: string): string {
    const envVar = process.env[name];
    if (envVar === undefined || envVar === '') {
        throw new Error(`Environment variable ${name} is missing or is empty`);
    }
    return envVar;
}

const MONGODB_URI = getRequiredEnvVar('MONGO_URI');

export async function mongoDBConnect (): Promise<void> {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (err) {
        console.error('MongoDB connection fail', err);
        process.exit(1);
    }
}