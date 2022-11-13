import jwt from 'jsonwebtoken';
import { type Request, type Response } from 'express';
import { User } from '../models/User';

export default async (req: Request, res: Response, next: (e?: any) => any) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];

    if (!cookie) throw new Error('You must be signed in to continue');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (err: any) {
    err.status = 401;
    next(err);
  }
};