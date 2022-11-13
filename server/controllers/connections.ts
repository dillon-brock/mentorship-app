import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import Connection from '../models/Connection.js';

export default Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newConnection = await Connection.create({ teacherId: req.body.teacherId, studentId: req.body.studentId, connectionApproved: 'pending' })
      res.json(newConnection);
    }
    catch (e) {
      next(e);
    }
  });