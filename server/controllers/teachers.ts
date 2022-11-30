import { Router, type Request, type Response, type NextFunction} from 'express';
import authenticateStudent from '../middleware/authenticateStudent.js';
import authenticateTeacher from '../middleware/authenticateTeacher.js';
import checkForUserStudentId from '../middleware/checkForUserStudentId.js';
import Connection from '../models/Connection.js';
import Review from '../models/Review.js';
import Student from '../models/Student.js';
import Subject from '../models/Subject.js';
import Teacher from '../models/Teacher.js';
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
      const teacher = await Teacher.create({ ...req.body, userId: req.user.id });
      res.json(teacher);
    } catch (e) {
      next (e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      let teachers = await Teacher.findAll();
      if (typeof req.query['subject'] === 'string') {
        const subjectQuery: string = req.query['subject'];
        teachers = teachers.filter(teacher => {
            return teacher.subjects?.some(subject => subject.subject.toLowerCase().startsWith(subjectQuery.toLowerCase())
            && (req.query['lessonType'] !== 'Any' ? 
            (subject.lessonType === req.query['lessonType'] || subject.lessonType === 'Any') : subject)
            && (subject.minPrice <= Number(req.query['minPrice']) ? subject.maxPrice >= Number(req.query['minPrice']) : subject.minPrice <= Number(req.query['maxPrice'])))
            });
          }
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
      const updatedTeacher = Teacher.updateByUserId({ ...req.body, userId: req.user.id });
      res.json(updatedTeacher);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', checkForUserStudentId, async (req, res, next) => {
    try {
      if (req.params.id) {
        const teacher = await Teacher.findById(req.params.id);
        if (req.user) {
          const connection = await Connection.findByIds(req.params.id, req.user.studentId);
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
  .get('/:id/reviews', async (req: Request, res: Response, next) => {
    try {
      if (req.params.id) {
        const reviews = await Review.findByTeacherId(req.params.id);
        res.json(reviews);
      }
    } catch (e) {
      next(e);
    }
  })
  .get('/:id/students', async (req, res, next) => {
    try {
      if (req.params.id) {
        const students = await Student.findByTeacherId(req.params.id);
        res.json(students);
      }
    } catch (e) {
      next(e);
    }
  });