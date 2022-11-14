import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import Review from '../models/Review.js';

export default Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const {
        stars,
        detail,
        studentId,
        teacherId
      } = req.body;
      const newReview = await Review.create({ studentId, stars, detail, teacherId });
      res.json(newReview);
    } catch (e) {
      next(e);
    }
  });