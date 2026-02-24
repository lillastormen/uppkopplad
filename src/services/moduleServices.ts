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

export async function getAllMainModules (): Promise<mainModulesDocument[]> {
    try {
        const modules = await MainModule.find()
            .sort({ order: 1 })
            .lean()
            .exec();

        return modules;
    } catch (err) {
        const error = err as Error;
        throw new Error(`Could not fetch Main Modules: ${error.message}`);
    }
}

export async function getSubModulesForMainModule (mainModuleName: 'mobil' | 'dator' | 'internet'): Promise<lessonsDocument[]> {
    try {
        const mainModule = await MainModule.findOne(
            { nameOfModule: mainModuleName })
            .lean()
            .exec();

        if (!mainModule || mainModule.subModuleSlug.length === 0) {
            return [];
        }

        // Continue building this function
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

export async function getAllLessons (): Promise<lessonsDocument[]> {
    try {
        const lessons = await Lesson.find();
        return lessons;
    } catch (err) {
        const error = err as Error;
        throw new Error(`Could not fetch lessons: ${error.message}`);
    }
}