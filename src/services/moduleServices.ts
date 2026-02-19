import { type lessons, type lessonsDocument } from "../types/mongo.ts";
import { Lesson } from "../mongoModels/lessons.ts";

export async function createLesson (data: lessons): Promise<lessonsDocument> {
    try {
        const lesson = new Lesson(data);
        await lesson.save();

        return lesson;
    } catch (err) {
        throw new Error(`Could not create new lesson: ${(err as Error).message}`);
    }
}