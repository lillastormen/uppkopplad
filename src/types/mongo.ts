import mongoose from "mongoose";

export interface lessons {
    title: string;
    slug: string;
    module: string;
    video: {
        youtubeId: string;
        duration: number;
        thumbnailUrl: string
    }
    steps: string[];

    // Optional
    extraVideo?: {
        youtubeId: string;
        duration: number;
        thumbnailUrl: string
    }
    extraImages?: string[];
}

export interface lessonsDocument extends lessons , mongoose.Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}