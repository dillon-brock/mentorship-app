import { Router } from 'express';
import authenticateTeacher from '../middleware/authenticateTeacher.js';
import Subject from '../models/Subject.js';

export default Router()
  .get('/teaching-materials/:teacherId', async (req, res, next) => {
    try {
      const subjectsWithTeachingMaterials = await Subject.getTeachingMaterialsByTeacherId(req.params.teacherId);
      res.json(subjectsWithTeachingMaterials);
    } catch (e) {
      next(e);
    }
  })
  .get('/:teacherId', async (req, res, next) => {
    try {
      if (req.params.teacherId) {
        const subjects = await Subject.findByTeacherId(req.params.teacherId);
        res.json(subjects);
      }
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticateTeacher, async (req, res, next) => {
    try {
      const newSubject = Subject.create({ ...req.body, teacherId: req.user.teacherId});
      res.json(newSubject);
    } catch (e) {
      next(e);
    }
  })