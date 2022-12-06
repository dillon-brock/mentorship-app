/* @jest-environment node */
import request, { agent } from 'supertest'
import app from '../app'
import {
  describe,
  expect,
  it,
} from '@jest/globals'
import setupDb from '../setup-data.js'

const testTeacher = {
  firstName: 'Test',
  lastName: 'Teacher',
  email: 'teacher@test.com',
  password: '123456',
  imageUrl: 'testimage.com',
  subjects: [
    { subject: 'Drawing', minPrice: 10, maxPrice: 30, lessonType: 'In person' },
    { subject: 'Coding', minPrice: 40, maxPrice: 80, lessonType: 'Remote'}
  ],
  bio: 'I am a teacher',
  zipCode: '97214',
  phoneNumber: '5555555555',
  contactEmail: 'teacher@test.com',
  city: 'Portland',
  state: 'OR'
}

const testStudent = {
  firstName: 'Test',
  lastName: 'Student',
  email: 'student@test.com',
  password: '123456',
  imageUrl: 'testimage.com'
};

const testSubject = {
  subject: 'Cooking',
  minPrice: 30,
  maxPrice: 50,
  lessonType: 'Any'
}

const testTeachingMaterial = {
  url: 'materialtest.com',
  type: 'link',
  name: 'Test Material'
}

describe('subjects controller', () => {
  beforeEach(() => {
    return setupDb();
  })
  it('serves a list of subjects corresponding to teacher from query params at GET /subjects/:teacherId', async () => {
    const agent = request.agent(app);
    const teacherRes = await agent.post('/teachers').send(testTeacher);
    const res = await agent.get(`/subjects/${teacherRes.body.teacher.id}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      subject: expect.any(String),
      minPrice: expect.any(Number),
      maxPrice: expect.any(Number),
      lessonType: expect.any(String)
    }))
  });

  it('adds a new subject corresponding to a teacher at POST /subjects', async () => {
    const agent = request.agent(app);
    await agent.post('/teachers').send(testTeacher);
    const res = await agent.post('/subjects').send(testSubject);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ ...testSubject }));
  })

  it('gives a 401 error for students at POST /subjects', async () => {
    const agent = request.agent(app);
    await agent.post('/students').send(testStudent);
    const res = await agent.post('/subjects').send(testSubject);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only teachers can perform this action.');
  })

  it('gives a 401 error for unauthenticated users at POST /subjects', async () => {
    const res = await request(app).post('/subjects').send(testSubject);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  })

  it('updates subject information at PUT /subjects/:id', async () => {
    const agent = request.agent(app);
    await agent.post('/teachers').send(testTeacher);
    const newSubjectRes = await agent.post('/subjects').send(testSubject);
    const res = await agent.put(`/subjects/${newSubjectRes.body.id}`)
      .send({
        ...testSubject,
        minPrice: 40,
        maxPrice: 60
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({
      ...testSubject,
      minPrice: 40,
      maxPrice: 60
    }))
  });

  it('gives a 401 error students at PUT /subjects/:id', async () => {
    const agent = request.agent(app);
    await agent.post('/teachers').send(testTeacher);
    const newSubjectRes = await agent.post('/subjects').send(testSubject);
    await agent.delete('/users/sessions');
    await agent.post('/students').send(testStudent);
    const res = await agent.put(`/subjects/${newSubjectRes.body.id}`)
      .send({
        ...testSubject,
        minPrice: 40,
        maxPrice: 60
      });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only teachers can perform this action.');
  })

  it('gives a 401 error for unauthenticated users at PUT /subjects/:id', async () => {
    const agent = request.agent(app);
    await agent.post('/teachers').send(testTeacher);
    const newSubjectRes = await agent.post('/subjects').send(testSubject);
    await agent.delete('/users/sessions');
    const res = await agent.put(`/subjects/${newSubjectRes.body.id}`)
      .send({
        ...testSubject,
        minPrice: 40,
        maxPrice: 60
      });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  })
})