import { Router } from 'express';
import authenticateStudent from '../middleware/authenticateStudent';
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