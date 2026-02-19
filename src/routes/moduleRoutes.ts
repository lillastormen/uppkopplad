import express from 'express';
import { LessonCreate } from '../controllers/moduleControllers.ts';

const router = express.Router();

router.post('/', LessonCreate);

export default router;
