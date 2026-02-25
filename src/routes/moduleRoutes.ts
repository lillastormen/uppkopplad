import express from 'express';
import {LessonCreate, lessonGet, mainModuleCreate, mainModulesGet} from '../controllers/moduleControllers.ts';

const mainModulesRoutes = express.Router();
const lessonsRoutes = express.Router();

// Main modules routes
mainModulesRoutes.post('/', mainModuleCreate);
mainModulesRoutes.get('/', mainModulesGet);

// Lesson modules routes
lessonsRoutes.post('/', LessonCreate);
lessonsRoutes.get('/', lessonGet);

export default { mainModulesRoutes, lessonsRoutes };
