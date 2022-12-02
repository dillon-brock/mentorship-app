import express, { type Router } from 'express'
import teacherRouter from './controllers/teachers.js';
import studentRouter from './controllers/students.js';
import userRouter from './controllers/users.js';
import connectionRouter from './controllers/connections.js';
import reviewRouter from './controllers/reviews.js';
import subjectRouter from './controllers/subjects.js';
import teachingMaterialsRouter from './controllers/teachingMaterials.js';

const app = express();

export default (): Router => { 
  const prefixRouter = express.Router()
  prefixRouter.use('/teachers', teacherRouter);
  prefixRouter.use('/students', studentRouter);
  prefixRouter.use('/users', userRouter);
  prefixRouter.use('/connections', connectionRouter);
  prefixRouter.use('/reviews', reviewRouter);
  prefixRouter.use('/subjects', subjectRouter);
  prefixRouter.use('/teaching-materials', teachingMaterialsRouter);
  return prefixRouter;
}
