import { Router } from 'express';
import authenticateTeacher from '../middleware/authenticateTeacher.js';
import Subject from '../models/Subject.js';

export default Router()
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
      const newSubject = await Subject.create({ ...req.body, teacherId: req.user.teacherId});
      res.json(newSubject);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authenticateTeacher, async (req, res, next) => {
    try {
      const updatedSubject = await Subject.updateById({ ...req.body, id: req.params.id });
      res.json(updatedSubject);
    } catch (e) {
      next(e);
    }
  })