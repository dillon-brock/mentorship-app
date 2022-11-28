import { Router, type Request, type Response, type NextFunction } from 'express';
import authenticateStudent from '../middleware/authenticateStudent.js';
import Student from '../models/Student.js';
import StudentSubject from '../models/StudentSubject.js';
import { UserService } from '../services/UserService.js';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export default Router()
  .post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        imageUrl
      } = req.body;
      const newUser = await UserService.create({ email, password, type: 'student' });
      const student = await Student.create({ userId: newUser.id, firstName, lastName, imageUrl });
      const sessionToken = await UserService.signIn({ email, password });

      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully!', student });
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post('/add-account', async (req, res, next) => {
    try {
      const student = Student.create({ ...req.body, userId: req.user.id });
      res.json(student);
    } catch (e) {
      next(e);
    }
  })
  .get('/me', authenticateStudent, async (req, res, next) => {
    try {
      const student = await Student.findById(req.user.studentId);
      res.json(student);
    } catch (e) {
      next (e);
    }
  })
  .put('/me', authenticateStudent, async (req, res, next) => {
    try {
      const updatedStudent = await Student.updateByUserId({ ...req.body, userId: req.user.id });
      res.json(updatedStudent);
    } catch (e) {
      next(e);
    }
  })
  .post('/subject', authenticateStudent, async (req, res, next) => {
    try {
      const { subjectId } = req.body;
      const newStudentSubject = await StudentSubject.create({ studentId: req.user.studentId, subjectId })
      res.json(newStudentSubject);
    } catch (e) {
      next(e);
    }
  })