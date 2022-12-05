import { Router } from 'express';
import authenticateTeacher from '../middleware/authenticateTeacher.js';
import TeachingMaterial from '../models/TeachingMaterial.js';

export default Router()
  .get('/', authenticateTeacher, async (req, res, next) => {
    try {
      const teachingMaterials = await TeachingMaterial.findByTeacherId(req.user.teacherId);
      res.json(teachingMaterials);
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticateTeacher, async (req, res, next) => {
    try {
      const newTeachingMaterial = await TeachingMaterial.create({ ...req.body });
      res.json(newTeachingMaterial);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authenticateTeacher, async (req, res, next) => {
    try {
      if (req.params.id) {
        const deletedMaterial = TeachingMaterial.delete(req.params.id);
        res.json(deletedMaterial);
      }
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authenticateTeacher, async (req, res, next) => {
    try {
      const updatedMaterial = await TeachingMaterial.updateById({ ...req.body, id: req.params.id });
      res.json(updatedMaterial);
    } catch (e) {
      next(e);
    }
  })