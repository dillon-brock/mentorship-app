import { Router } from 'express';
import authenticateStudent from '../middleware/authenticateStudent.js';
import Review from '../models/Review.js';
import Student from '../models/Student.js';

export default Router()
  .get('/:teacherId', async (req, res, next) => {
    try {
      if (req.params.teacherId) {
        const reviews = await Review.findByTeacherId(req.params.teacherId);
        res.json(reviews);
      }
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticateStudent, async (req, res, next) => {
    try {
      const { studentId } = req.body;
      const newReview = await Review.create({ ...req.body });
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