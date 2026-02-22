import { type mainModules, type mainModulesDocument } from "../types/mongo.ts";
import { MainModule } from "../mongoModels/mainModules.ts";
import { type lessons, type lessonsDocument } from "../types/mongo.ts";
import { Lesson } from "../mongoModels/lessons.ts";

// CRUD for Main Modules
export async function createMainModule (data: mainModules): Promise<mainModulesDocument> {
    try {
        const mainModule = new MainModule(data);
        await mainModule.save();

        return mainModule;
    } catch (err) {
        throw new Error(`Could not create new Main Module: ${(err as Error).message}`);
    }
}

// CRUD for lessons
export async function createLesson (data: lessons): Promise<lessonsDocument> {
    try {
        const lesson = new Lesson(data);
        await lesson.save();

        return lesson;
    } catch (err) {
        throw new Error(`Could not create new Lesson: ${(err as Error).message}`);
    }
}
