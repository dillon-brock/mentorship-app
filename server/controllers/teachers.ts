import { Router, type Request, type Response, type NextFunction} from 'express';
import authenticateStudent from '../middleware/authenticateStudent.js';
import authenticateTeacher from '../middleware/authenticateTeacher.js';
import checkForUserStudentId from '../middleware/checkForUserStudentId.js';
import Connection from '../models/Connection.js';
import StudentSubject from '../models/StudentSubject.js';
import Subject from '../models/Subject.js';
import Teacher from '../models/Teacher.js';
import { UserService } from '../services/UserService.js';
import { filterResults } from '../utils.js';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export default Router()
  .post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        imageUrl,
        subjects,
        bio,
        zipCode,
        phoneNumber,
        contactEmail,
        city,
        state
      } = req.body;
      const newUser = await UserService.create({ email, password, type: 'teacher' });
      const teacher = await Teacher.create({ userId: newUser.id, bio, zipCode, phoneNumber, contactEmail, firstName, lastName, imageUrl, city, state });
      for (const subject of subjects) {
        await Subject.create({ ...subject, teacherId: teacher?.id });
      }
      const sessionToken = await UserService.signIn({ email, password });
      
      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully!', teacher });
    } catch (error) {
      next(error);
    }
  })
  .post('/add-account', authenticateStudent, async (req, res, next) => {
    try {
      const { subjects } = req.body;
      const teacher = await Teacher.create({ ...req.body, userId: req.user.id });
      for (const subject of subjects) {
        await Subject.create({ ...subject, teacherId: teacher.id });
      }
      res.json(teacher);
    } catch (e) {
      next (e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allTeachers = await Teacher.findAll();
      const teachers = filterResults(allTeachers, req);
      res.json(teachers);
    } catch (error) {
      next(error);
    }
  })
  .get('/me', authenticateTeacher, async (req, res, next) => {
    try {
      const teacher = await Teacher.findById(req.user.teacherId);
      res.json(teacher);
    } catch (e) {
      next(e);
    }
  })
  .put('/me', authenticateTeacher, async (req, res, next) => {
    try {
      const updatedTeacher = await Teacher.updateByUserId({ ...req.body, userId: req.user.id });
      res.json(updatedTeacher);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', checkForUserStudentId, async (req, res, next) => {
    try {
      if (req.params.id) {
        const teacher = await Teacher.findById(req.params.id);
        if (req.user && req.user.studentId) {
          const connection = await Connection.findByIds(req.params.id, req.user.studentId);
          if (connection?.connectionApproved === 'approved') {
            const { subjectId } = await StudentSubject.findByTeacherId(req.user.studentId, req.params.id);
            connection.subjectId = subjectId;
          }
          res.json({ teacher, connection });
        } else {
          res.json({ teacher, connection: null })
        }
      }
    }
    catch (e) {
      next(e);
    }
  })