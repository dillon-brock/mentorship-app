import { Router, type Request, type Response, type NextFunction} from 'express';
import authenticate from '../middleware/authenticate.js';
import Connection from '../models/Connection.js';
import Review from '../models/Review.js';
import Student from '../models/Student.js';
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
        subject,
        bio,
        zipCode,
        phoneNumber,
        contactEmail,
        city,
        state
      } = req.body;
      const newUser = await UserService.create({ email, password, type: 'teacher' });
      await Teacher.create({ userId: newUser.id, subject, bio, zipCode, phoneNumber, contactEmail, firstName, lastName, imageUrl, city, state });
      const sessionToken = await UserService.signIn({ email, password });
      
      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Signed in successfully!' });
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      let teachers;
      if (typeof req.query['subject'] === 'string') {
        teachers = await Teacher.findAll(req.query['subject']);
      }
      else {
        teachers = await Teacher.findAll('');
      }
      res.json(teachers);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      if (req.params.id) {
        const teacher = await Teacher.findById(req.params.id);
        const connection = await Connection.findByIds(req.params.id, req.user.studentId);
        res.json({ teacher, connection });
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
      const students = await Student.findByTeacherId(req.params.id);
      res.json(students);
    } catch (e) {
      next(e);
    }
  });