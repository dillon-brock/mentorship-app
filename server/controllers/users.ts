import { Router, type Request, type Response } from 'express';
import { UserService } from '../services/UserService.js';
import authenticate from '../middleware/authenticate.js';
import { User } from '../models/User.js';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export default Router()
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
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
  .get('/me', authenticate, async (req, res, next) => {
    try {
      const user = await User.getByEmail(req.user.email);
      if (user && user.type) {
        const userInfo = user.getAdditionalInfo();
        res.json(userInfo);
      } else {
        res.json(user);
      }
    } catch (e) {
      next(e);
    }
  })