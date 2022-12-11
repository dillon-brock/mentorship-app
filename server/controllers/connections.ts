import { Router, type Request, type Response, type NextFunction } from 'express';
import authenticateStudent from '../middleware/authenticateStudent.js';
import authenticateTeacher from '../middleware/authenticateTeacher.js';
import authenticateUser from '../middleware/authenticateUser.js';
import authorizeUserForConnection from '../middleware/authorizeUserForConnection.js';
import Connection from '../models/Connection.js';
import StudentSubject from '../models/StudentSubject.js';

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
  .put('/', authenticateTeacher, async (req, res, next) => {
    try {
      const updatedConnection = await Connection.update({ 
        teacherId: req.user.teacherId,
        studentId: req.body.studentId,
        connectionStatus: req.body.connectionStatus
      });
      res.json(updatedConnection);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', [authenticateUser, authorizeUserForConnection], async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.params.id) {
        const deletedConnection = await Connection.deleteById(req.params.id);
        if (typeof req.query['studentId'] === 'string' && typeof req.query['subjectId'] === 'string') {
          await StudentSubject.delete(req.query['studentId'], req.query['subjectId']);
        }
        res.json(deletedConnection);
      }
    } catch (e) {
      next(e);
    }
  })