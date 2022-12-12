import { type Request, type Response, type NextFunction } from 'express';
import Connection from "../models/Connection.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id) {
      const connection = await Connection.findById(req.params.id);
      if (req.user.type === 'teacher') {
        const teacher = await Teacher.findByUserId(req.user.id);
        if (teacher) req.user.teacherId = teacher.id;
        if (connection?.teacherId !== req.user.teacherId) {
          throw new Error('You are not authorized to remove this connection.');
        }
      } else if (req.user.type === 'student') {
        const student = await Student.findByUserId(req.user.id);
        if (student) req.user.studentId = student.id;
        if (connection?.studentId !== req.user.studentId) {
          throw new Error('You are not authorized to remove this connection.');
        }
      }
      else {
        throw new Error('Invalid user');
      }
    }
    next();
  } catch (err: any) {
    err.status = 403;
    next(err);
  }
};