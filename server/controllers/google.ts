import { Router, type Response, type Request, type NextFunction} from 'express';
import { User } from '../models/User';
import { exchangeCodeForToken, getGoogleProfile } from '../services/googleService';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
const ONE_DAY_IN_MS = 1000 * 24 * 60 * 60

export default Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&scope=${process.env.GOOGLE_SCOPE}&redirect_uri=${process.env.LOGIN_REDIRECT_URI}&response_type=code`)
  })
  .get('/login-callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      const stringCode: string = code as string;
      const token = await exchangeCodeForToken(stringCode, process.env.LOGIN_REDIRECT_URI);
      const googleProfile = await getGoogleProfile(token);
      if (typeof googleProfile !== 'string' && googleProfile) {
        let user = await User.getByEmail(googleProfile.email);

        if (!user) {
          user = await User.createFromGoogle({
            email: googleProfile.email,
            type: 'student'
          });

          await Student.create({ 
            userId: user.id,
            firstName: googleProfile.given_name,
            lastName: googleProfile.family_name,
            imageUrl: googleProfile.picture
          })
        }
        
        const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, {
          expiresIn: '1 day',
        });
        
        res.cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
      }
    } catch (e) {
      next(e);
    }
  })