import { createLesson, createMainModule, getAllMainModules } from '../services/moduleServices.ts';
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

// CRUD for Lessons
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
