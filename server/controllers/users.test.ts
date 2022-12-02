/* @jest-environment node */
import request from 'supertest'
import app from '../app'
import {
  describe,
  expect,
  it,
} from '@jest/globals'
import setupDb from '../setup-data.js'
import { UserService } from '../services/UserService'

const testUser = {
  email: 'test@user.com',
  password: '123456',
  type: 'student'
}

const testUser2 = {
  email: 'test@teacher.com',
  password: '123456',
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
  subjects: [{ subject: 'Drawing', minPrice: 10, maxPrice: 30, lessonType: 'In person' }],
  bio: 'I am a teacher',
  zipCode: '97214',
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

const registerAndLoginTeacher = async () => {
  const agent = request.agent(app);
  await agent.post('/teachers').send(testTeacher);
  return agent;
}

describe('teachers controller', () => {
  beforeEach(() => {
    return setupDb()
  })
  it('signs in a user on POST /users/sessions', async () => {
    await UserService.create(testUser);
    const res = await request(app).post('/users/sessions').send(testUser);
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Signed in successfully!');
  })
  it('signs up a user on POST /users', async () => {
    const studentRes = await request(app).post('/users').send(testUser);
    expect(studentRes.status).toBe(200);
    expect(studentRes.body).toEqual({
      id: expect.any(String),
      email: testUser.email,
      type: testUser.type
    });
    const teacherRes = await request(app).post('/users').send(testUser2);
    expect(teacherRes.status).toBe(200);
    expect(teacherRes.body).toEqual({
      id: expect.any(String),
      email: testUser2.email,
      type: testUser2.type
    });
  });
  it('gets the current user with student information for students on GET /users/me', async () => {
    const agent = await registerAndLoginStudent();
    const res = await agent.get('/users/me');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      studentId: expect.any(String),
      email: testStudent.email,
      type: 'student',
      firstName: testStudent.firstName,
      lastName: testStudent.lastName,
      imageUrl: testStudent.imageUrl,
    })
  })
  it('gets the current user with teacher information for teachers on GET /users/me', async () => {
    const agent = await registerAndLoginTeacher();
    const res = await agent.get('/users/me');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      teacherId: expect.any(String),
      email: testTeacher.email,
      type: 'teacher',
      firstName: testTeacher.firstName,
      lastName: testTeacher.lastName,
      imageUrl: testTeacher.imageUrl,
    })
  })
  it('signs out a user on /users/sessions', async () => {
    const agent = await registerAndLoginStudent();
    const res = await agent.delete('/users/sessions');
    expect(res.status).toBe(204);
  })
  it('updates user type on PUT /users/me', async () => {
    const agent = await registerAndLoginStudent();
    const res = await agent.put('/users/me').send({ type: 'teacher' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ type: 'teacher' }));
  })
})