/* @jest-environment node */
import request from 'supertest'
import app from '../app'
import {
  describe,
  expect,
  it,
} from '@jest/globals'
import setupDb from '../setup-data.js'

const testStudent = {
  firstName: 'Test',
  lastName: 'Student',
  email: 'student@test.com',
  password: '123456',
  imageUrl: 'testimage.com'
};

const testTeacher = {
  firstName: 'Test',
  lastName: 'Teacher',
  email: 'teacher@test.com',
  password: '123456',
  imageUrl: 'testimage.com',
  subjects: [{ subject: 'Drawing', minPrice: 10, maxPrice: 30, lessonType: 'In person' }],
  bio: 'I am a teacher',
  zipCode: '97214',
  phoneNumber: '5555555555',
  contactEmail: 'teacher@test.com',
  city: 'Portland',
  state: 'OR'
}

const testReview = {
  detail: 'Great teacher!',
  stars: 5,
  anonymous: false
}

describe('reviews controller', () => {
  beforeEach(() => {
    return setupDb();
  })
  it('serves a list of reviews corresponding to teacher id at GET /reviews/:teacherId', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    await agent.delete('/users/sessions');
    const studentAuthRes = await agent.post('/students').send(testStudent);
    const reviewRes = await agent.post('/reviews').send({ ...testReview, teacherId: teacherAuthRes.body.teacher.id })
    const res = await agent.get(`/reviews/${teacherAuthRes.body.teacher.id}`);
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      stars: expect.any(Number),
      detail: expect.any(String),
      teacherId: teacherAuthRes.body.teacher.id
    }));
  })
  it('creates new review on POST /reviews', async () => {
    const agent = request.agent(app);
    const teacherRes = await agent.post('/teachers').send(testTeacher);
    await agent.delete('/users/sessions');
    const studentRes = await agent.post('/students').send(testStudent);
    const res = await agent.post('/reviews').send({
      ...testReview,
      teacherId: teacherRes.body.teacher.id,
    })
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ detail: 'Great teacher!', stars: 5 }))
  })
  it('gives a 401 error for teacher trying to post a review', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const res = await agent.post('/reviews').send({
      teacherId: teacherAuthRes.body.teacher.id,
      stars: 5,
      detail: 'So good!',
      anonymous: true
    });
    expect(res.status).toBe(401);
  })
  it('gives a 401 error for an unauthenticated user trying to post a review', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    await agent.delete('/users/sessions');
    const res = await agent.post('/reviews').send({
      teacherId: teacherAuthRes.body.teacher.id,
      stars: 5,
      detail: 'Amazing!',
      anonymous: false
    });
    expect(res.status).toBe(401);
  })
})