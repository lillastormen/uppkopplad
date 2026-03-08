import {
    createLesson,
    getAllLessons,
    getSpecificLesson,
    createMainModule,
    getAllMainModules,
    getSubModulesForMainModule
} from '../services/moduleServices.ts';

import { type Request, type Response } from 'express';

// CRUD for Main Modules
export const mainModuleCreate = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMainModule = await createMainModule(req.body);
        res.status(201).json(newMainModule);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: 'Internal server error' });
        console.error('Error creating Main Module: ', error.message, error.stack);
    }
}

export const mainModulesGet = async (req: Request, res: Response): Promise<void> => {
    try {
        const getMainModules = await getAllMainModules();
        res.status(200).json(getMainModules);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: 'Internal server error' });
        console.error('Error fetching Main Modules: ', error.message, error.stack);
    }
}

export const allSubModulesForMainModuleGet = async (req: Request, res: Response): Promise<void> => {
    try {
        const {nameOfModule} = req.params;

        const subModules = await getSubModulesForMainModule(
            nameOfModule as 'mobil' | 'dator' | 'internet'
        );

        res.status(200).json(subModules);
    } catch (err) {
        const error = err as Error;
        res.status(500).json('Internal server error');
        console.error('Error fetching submodules: ', error.message, error.stack);
    }
}

// CRUD for Lessons Modules
export const LessonCreate = async (req: Request, res: Response): Promise<void> => {
    try {
        const newLesson = await createLesson(req.body);
        res.status(201).json(newLesson);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: 'Internal server error'});
        console.error('Error creating Lesson: ', error.message, error.stack);
    }
}

export const lessonGet = async (req: Request, res: Response): Promise<void> => {
    try {
        const getLessons = await getAllLessons();
        res.status(200).json(getLessons);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({error: 'Internal server error'});
        console.error('Error fetching lesson modules:', error.message, error.stack);
    }
}

export const specificLessonGet = async (req: Request, res: Response): Promise<void> => {
    try {
        const {module} = req.params;

        if (typeof module !== "string") {
            res.status(400).json({ error: 'Ogiltigt modulnamn' });
            return;
        }

        const lesson = await getSpecificLesson(module);

        res.status(200).json(lesson);
    } catch (err) {
        const error = err as Error;
        console.error('Fail getting specific lesson', error.message, error.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
}