import { Router } from 'express';
import authenticateStudent from '../middleware/authenticateStudent.js';
import Connection from '../models/Connection.js';

export default Router()
  .post('/', authenticateStudent, async (req, res, next) => {
    try {
      const newConnection = await Connection.create({ teacherId: req.body.teacherId, studentId: req.user.studentId, connectionApproved: 'pending' })
      res.json(newConnection);
    }
    catch (e) {
      next(e);
    }
  })
  .put('/', authenticateStudent, async (req, res, next) => {
    try {
      const updatedConnection = await Connection.update({ 
        studentId: req.user.studentId,
        teacherId: req.body.teacherId,
        connectionStatus: req.body.connectionStatus
      });
      res.json(updatedConnection);
    } catch (e) {
      next(e);
    }
  });