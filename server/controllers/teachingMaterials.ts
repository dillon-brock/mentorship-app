import { type Request, type Response, type NextFunction, Router } from 'express';
import authenticateTeacher from '../middleware/authenticateTeacher.js';
import TeachingMaterial from '../models/TeachingMaterial.js';
import authorizeTeacher from '../middleware/authorizeTeacherForMaterialInteraction.js';

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
  .delete('/:id', [authenticateTeacher, authorizeTeacher], async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.params.id) {
        const deletedMaterial = TeachingMaterial.delete(req.params.id);
        res.json(deletedMaterial);
      }
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', [authenticateTeacher, authorizeTeacher], async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedMaterial = await TeachingMaterial.updateById({ ...req.body, id: req.params.id });
      res.json(updatedMaterial);
    } catch (e) {
      next(e);
    }
  })