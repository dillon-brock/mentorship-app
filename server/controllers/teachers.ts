import { Router, type Request, type Response} from 'express';
import Teacher from '../models/Teacher.js';
import { UserService } from '../services/UserService.js';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export default Router()
  .post('/', async (req: Request, res: Response, next: (e?: any) => any) => {
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
        contactEmail
      } = req.body;
      const newUser = await UserService.create({ email, password, type: 'teacher' });
      await Teacher.create({ userId: newUser.id, subject, bio, zipCode, phoneNumber, contactEmail, firstName, lastName, imageUrl });
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
  });