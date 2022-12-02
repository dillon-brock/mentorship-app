/* @jest-environment node */
import request, { agent } from 'supertest'
import app from '../app'
import {
  describe,
  expect,
  it,
} from '@jest/globals'
import setupDb from '../setup-data.js'
import Teacher from '../models/Teacher.js'
import { User } from '../models/User.js'
import Student from '../models/Student'
import Connection from '../models/Connection'

const testTeacherUser = {
  email: 'testteacher@test.com',
  passwordHash: 'sdlkjfdslk',
  type: 'teacher'
}

const testStudentUser = {
  email: 'teststudent@test.com',
  passwordHash: 'oiewrkxlc',
  type: 'student'
}

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

const registerAndLoginStudent = async () => {
  const agent = request.agent(app);

  await agent.post('/students').send(testStudent);
  return agent;
};

describe('teachers controller', () => {
  beforeEach(() => {
    return setupDb()
  })
  it('signs up and signs in new teacher on POST /teachers', async () => {
    const res = await request(app).post('/teachers').send(testTeacher);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Signed in successfully!');
  })
  it("serves teacher info with id corresponding to params on GET /teachers/:id", async () => {
    const res = await request(app).get('/teachers/1');
    expect(res.status).toBe(200);
  })

  it('serves a list of teachers on GET /teachers', async () => {
    const res = await request(app).get('/teachers');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      userId: expect.any(String),
      zipCode: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      imageUrl: expect.any(String)
    }));
  })

  it("serves a teacher's reviews with id corresponding to params on GET /teachers/:id/reviews", async () => {
    const agent = await registerAndLoginStudent();
    const res = await agent.get('/teachers/1/reviews');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      stars: expect.any(Number),
      detail: expect.any(String),
      teacherId: '1'
    }));
  });

  it("serves a teacher's students with id corresponding to params on GET /teachers/:id/students", async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    await agent.delete('/users/sessions');
    const studentAuthRes = await agent.post('/students').send(testStudent);
    await agent.post('/connections').send({ teacherId: teacherAuthRes.body.teacher.id });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testTeacher.email, password: testTeacher.password });
    const res = await request(app).get(`/teachers/${teacherAuthRes.body.teacher.id}/students`)
    expect(res.body[0]).toEqual(expect.objectContaining({ ...studentAuthRes.body.student }))
  })
})
