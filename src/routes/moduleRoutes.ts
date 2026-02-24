import express from 'express';
import {LessonCreate, lessonGet, mainModuleCreate, mainModulesGet} from '../controllers/moduleControllers.ts';

const mainModulesRoutes = express.Router();
const lessonRoutes = express.Router();

// Main modules routes
mainModulesRoutes.post('/', mainModuleCreate);
mainModulesRoutes.get('/', mainModulesGet);

// Lesson modules routes
lessonRoutes.post('/', LessonCreate);
lessonRoutes.get('/', lessonGet);

export default { mainModulesRoutes, lessonRoutes };
