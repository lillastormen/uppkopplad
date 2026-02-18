import mongoose, { Schema, model } from "mongoose";
import {} from "../types/mongo.js";
const lessonsSchema = new Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    module: { type: String, required: true },
    video: { type: {
            youtubeId: { type: String, required: true },
            duration: Number,
            thumbnailUrl: String
        },
        required: true
    },
    steps: [{ type: String, required: true }],
    extraVideo: { type: {
            youtubeId: String,
            duration: Number,
            thumbnailUrl: String
        },
        default: null
    },
    extraImages: [{ type: String }]
});
export const Lesson = model('Lesson', lessonsSchema);
//# sourceMappingURL=lessons.js.map