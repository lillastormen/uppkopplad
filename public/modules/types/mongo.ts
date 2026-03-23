import mongoose from "mongoose";

export interface mainModules {
    nameOfModule: 'mobil' | 'dator' | 'internet';
    title: string;
    order: number;
    subModuleSlug: string[];
    description?: string;
    icon?: string;
    enabled?: boolean; 
}

export interface mainModulesDocument extends mainModules , mongoose.Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

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
