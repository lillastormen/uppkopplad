import { Lesson } from "../mongoModels/lessons.ts";
import { type lessons, type lessonsDocument } from "../types/mongo.ts";

export async function addLesson (data: lessons): Promise<lessonsDocument> {
    try {
        const lesson = new Lesson(data);
        const savedLesson = await lesson.save();

        return savedLesson;
    } catch (err) {
        throw new Error(`Could not create new lesson: ${(err as Error).message}`);
    }
}