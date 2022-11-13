import { Router } from 'express';
import authenticate from '../middleware/authenticate';
import Connection from '../models/Connection';

export default Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newConnection = Connection.create({ teacherId: req.body.teacherId, studentId: req.user.studentId, connectionApproved: 'pending' })
      res.json(newConnection);
    }
    catch (e) {
      next(e);
    }
  });