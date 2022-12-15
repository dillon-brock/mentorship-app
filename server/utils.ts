import Teacher from "./models/Teacher";
import { type Request } from 'express';

export function filterResults(teachers: Array<Teacher>, req: Request) {
  if (typeof req.query['subject'] === 'string') {
    const subjectQuery: string = req.query['subject'];
    return teachers.filter(teacher => {
      return teacher.subjects?.some(subject => (
        subject.subject.toLowerCase()
          .startsWith(subjectQuery.toLowerCase())
      )
      && (req.query['lessonType'] !== 'Any' ? 
      (subject.lessonType === req.query['lessonType'] || subject.lessonType === 'Any') : subject)
      && (subject.minPrice <= Number(req.query['minPrice']) ? 
        subject.maxPrice >= Number(req.query['minPrice']) 
        : subject.minPrice <= Number(req.query['maxPrice'])))
      });
  }
  else {
    return teachers;
  }
}