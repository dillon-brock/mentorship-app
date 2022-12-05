import TeachingMaterial from "../models/TeachingMaterial";
import { type Request, type Response, type NextFunction } from 'express';
import Subject from "../models/Subject";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.method === 'DELETE') {
      if (req.params.id) {
        const material = await TeachingMaterial.findById(req.params.id);
        if (material) {
          const subject = await Subject.findById(material.subjectId);
          if (!subject || subject.teacherId !== req.user.teacherId) {
            throw new Error('You are not authorized to delete this material.')
          }
        }
      }
    }
    if (req.method === 'PUT') {
      if (req.params.id) {
        const material = await TeachingMaterial.findById(req.params.id);
        if (material) {
          const subject = await Subject.findById(material.subjectId);
          if (!subject || subject.teacherId !== req.user.teacherId) {
            throw new Error('You are not authorized to update this material.')
          }
        }
      }
    }
    next();
  } catch (err: any) {
    err.status = 403;
    next(err);
  }
};
