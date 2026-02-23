import express from 'express';
import {LessonCreate, lessonGet, mainModuleCreate, mainModulesGet} from '../controllers/moduleControllers.ts';

const modulesRoutes = express.Router();

// Main modules routes
modulesRoutes.post('/', mainModuleCreate);
modulesRoutes.get('/', mainModulesGet);

// Lesson modules routes
modulesRoutes.post('/', LessonCreate);
modulesRoutes.get('/', lessonGet);

export default modulesRoutes;
