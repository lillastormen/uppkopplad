import express from 'express';
import {LessonCreate, mainModuleCreate, mainModulesGet} from '../controllers/moduleControllers.ts';

const modulesRoutes = express.Router();

// Main modules routes
modulesRoutes.post('/', mainModuleCreate);
modulesRoutes.get('/', mainModulesGet);

// Lesson modules routes
modulesRoutes.post('/', LessonCreate);

export default modulesRoutes;
