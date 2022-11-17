import { Router } from 'express';
import authenticate from '../middleware/authenticateStudent.js';
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
  })
  .put('/', authenticate, async (req, res, next) => {
    try {
      const updatedConnection = await Connection.update({ 
        studentId: req.body.studentId,
        teacherId: req.body.teacherId,
        connectionStatus: req.body.connectionStatus
      });
      res.json(updatedConnection);
    } catch (e) {
      next(e);
    }
  });