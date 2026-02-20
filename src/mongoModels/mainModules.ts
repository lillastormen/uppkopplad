import { Schema, model } from "mongoose";
import { type mainModulesDocument } from "../types/mongo.ts";

const mainModulesSchema = new Schema<mainModulesDocument>(
    {
        nameOfModule: {
            type: String,
            enum: ['mobil', 'dator', 'internet'],
            unique: true,
            lowercase: true,
            trim: true,
            required: true
        },
        title: { type: String, required: true, trim: true },
        order: { type: Number, required: true },
        subModuleSlug: {
            type: [String],
            required: true,
            default: [],
            validate: {
                validator: (array: string[]) => array.every(slug => slug.trim().length > 0),
                message: 'Slugs may not be empty strings!'
            }
        },
        description: { type: String },
        icon: { type: String },
        enabled: { type: Boolean }
    }
)

export const MainModule = model<mainModulesDocument>('MainModule', mainModulesSchema);