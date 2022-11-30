import { Router } from 'express';
import authenticateTeacher from '../middleware/authenticateTeacher.js';
import TeachingMaterial from '../models/TeachingMaterial.js';

export default Router()
  .post('/', authenticateTeacher, async (req, res, next) => {
    try {
      const newTeachingMaterial = await TeachingMaterial.create({ ...req.body });
      res.json(newTeachingMaterial);
    } catch (e) {
      next(e);
    }
  })