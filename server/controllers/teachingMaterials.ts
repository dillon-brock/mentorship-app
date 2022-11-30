import { Router } from 'express';
import authenticateTeacher from '../middleware/authenticateTeacher.js';

export default Router()
  .post('/', authenticateTeacher, async (req, res, next) => {
    
  })