import mongoose from "mongoose";

export interface mainModules {
    nameOfModule: 'mobil' | 'dator' | 'internet';
    title: string;
    order: number; // sorting order in the UI, for flexibility
    subModuleSlug: string[]; // Array of slugs referencing submodules (lessons)
    description?: string;
    icon?: string; // url or similar
    enabled?: boolean; // optional flag to hide/show modules if needed
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
