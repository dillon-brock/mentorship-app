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
  bio: 'I am a teacher',
  zipCode: '97214',
  subjects: [{ subject: 'Drawing', minPrice: 10, maxPrice: 30, lessonType: 'In person' }],
  phoneNumber: '5555555555',
  contactEmail: 'teacher@test.com',
  city: 'Portland',
  state: 'OR'
}

describe('students controller', () => {
  beforeEach(() => {
    return setupDb();
  })
  it('signs up and signs in new student on POST /students', async () => {
    const res = await request(app).post('/students').send(testStudent);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Signed in successfully!');
  })
  it('creates a student profile for authenticated teacher', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const res = await agent.post('/students/add-account').send(testTeacher);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      userId: teacherAuthRes.body.teacher.userId,
      firstName: teacherAuthRes.body.teacher.firstName,
      lastName: teacherAuthRes.body.teacher.lastName,
      imageUrl: teacherAuthRes.body.teacher.imageUrl
    });
  });
})