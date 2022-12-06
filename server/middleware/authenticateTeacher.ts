import jwt from 'jsonwebtoken';
import { type Request, type Response } from 'express';
import Teacher from '../models/Teacher.js';

export default async (req: Request, res: Response, next: (e?: any) => any) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];

    if (!cookie) throw new Error('You must be signed in to continue');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    if (typeof user !== 'string') {
      const teacher = await Teacher.findByUserId(user.id);
      if (!teacher) throw new Error('Only teachers can perform this action.');
      user.teacherId = teacher?.id;
      req.user = user;
    }
    else {
      throw new Error('Invalid user');
    }

    next();
  } catch (err: any) {
    err.status = 401;
    next(err);
  }
};