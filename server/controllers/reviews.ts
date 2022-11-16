import { Router } from 'express';
import authenticate from '../middleware/authenticateStudent.js';
import Review from '../models/Review.js';
import Student from '../models/Student.js';

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
      if (studentId) {
        const reviewAuthor = await Student.findById(studentId);
        res.json({ ...newReview, firstName: reviewAuthor?.firstName, lastName: reviewAuthor?.lastName, imageUrl: reviewAuthor?.imageUrl });
      }
      else {
        res.json(newReview);
      }
    } catch (e) {
      next(e);
    }
  });