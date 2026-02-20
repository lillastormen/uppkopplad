import { createLesson } from '../services/moduleServices.ts';
import { json, type Request, type Response } from 'express';

export const LessonCreate = async (req: Request, res: Response): Promise<void> => {
    try {
        const newLesson = await createLesson(req.body);
        res.status(201).json(newLesson);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: 'Internal server error'});
        console.error('Error creating lesson: ', error.message, error.stack);
    }
}
