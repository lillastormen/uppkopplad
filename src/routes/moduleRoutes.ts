import express from 'express';
import {
    LessonCreate,
    lessonGet,
    specificLessonGet,
    mainModuleCreate,
    mainModulesGet,
    allSubModulesForMainModuleGet
} from '../controllers/moduleControllers.ts';

const mainModulesRoutes = express.Router();
const lessonsRoutes = express.Router();

// Main modules routes
mainModulesRoutes.post('/', mainModuleCreate);
mainModulesRoutes.get('/', mainModulesGet);
mainModulesRoutes.get('/:nameOfModule/subModules', allSubModulesForMainModuleGet);

// Lesson modules routes
lessonsRoutes.post('/', LessonCreate);
lessonsRoutes.get('/', lessonGet);
lessonsRoutes.get('/:module/lesson', specificLessonGet);

export default { mainModulesRoutes, lessonsRoutes };
