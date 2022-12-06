/* @jest-environment node */
import request, { agent } from 'supertest'
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
  subjects: [{ 
    subject: 'Drawing',
    minPrice: 10,
    maxPrice: 30,
    lessonType: 'In person'
  }],
  phoneNumber: '5555555555',
  contactEmail: 'teacher@test.com',
  city: 'Portland',
  state: 'OR'
}

const testSubject = {
  subject: 'Cooking',
  minPrice: 30,
  maxPrice: 50,
  lessonType: 'Any'
}

const additionalTeacherInfo = {
  bio: 'test bio',
  zipCode: '97214',
  phoneNumber: '(555)555-5555',
  contactEmail: 'email@test.com',
  city: 'Portland',
  state: 'OR',
  subjects: [{ ...testSubject }]
}

const testReview = {
  stars: 5,
  detail: 'Great teacher!'
}

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
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const res = await agent.get(`/teachers/${teacherAuthRes.body.teacher.id}`);
    expect(res.status).toBe(200);
    expect(res.body.teacher).toEqual(expect.objectContaining({
      id: teacherAuthRes.body.teacher.id,
      firstName: testTeacher.firstName,
      lastName: testTeacher.lastName
    }))
  });

  it('serves connection information for student on GET /teachers/:id', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    await agent.delete('/users/sessions');
    const studentAuthRes = await agent.post('/students').send(testStudent);
    await agent.post('/connections').send({ teacherId: teacherAuthRes.body.teacher.id });
    const res = await agent.get(`/teachers/${teacherAuthRes.body.teacher.id}`);
    expect(res.status).toBe(200);
    expect(res.body.teacher).toEqual(expect.objectContaining({
      id: teacherAuthRes.body.teacher.id,
      firstName: testTeacher.firstName,
      lastName: testTeacher.lastName
    }));
    expect(res.body.connection).toEqual({
      id: expect.any(String),
      studentId: studentAuthRes.body.student.id,
      teacherId: teacherAuthRes.body.teacher.id,
      connectionApproved: 'pending'
    })
  });

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

  it("serves a teacher's profile information on GET /teachers/me", async () => {
    const agent = request.agent(app);
    await agent.post('/teachers').send(testTeacher);
    const res = await agent.get('/teachers/me');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({
      firstName: testTeacher.firstName,
      lastName: testTeacher.lastName,
      imageUrl: testTeacher.imageUrl
    }));
  })

  it('gives a 401 error for students on GET /teachers/me', async () => {
    const agent = request.agent(app);
    await agent.post('/students').send(testStudent);
    const res = await agent.get('/teachers/me');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only teachers can perform this action.');
  })

  it('gives a 401 error for unauthenticated user on GET /teachers/me', async () => {
    const res = await request(app).get('/teachers/me');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  })
  
  it("updates a teacher's profile information on PUT /teachers/me", async () => {
    const agent = request.agent(app);
    await agent.post('/teachers').send(testTeacher);
    const res = await agent.put('/teachers/me').send({ ...testTeacher, firstName: 'Fake' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({
      firstName: 'Fake',
      lastName: testTeacher.lastName,
      imageUrl: testTeacher.imageUrl
    }))
  })

  it("adds a teacher account for students on POST /teachers/add-account", async () => {
    const agent = request.agent(app);
    const studentAuthRes = await agent.post('/students').send(testStudent);
    const res = await agent.post('/teachers/add-account').send({
      firstName: studentAuthRes.body.student.firstName,
      lastName: studentAuthRes.body.student.lastName,
      imageUrl: studentAuthRes.body.student.imageUrl,
      ...additionalTeacherInfo
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({ 
        bio: additionalTeacherInfo.bio,
        zipCode: additionalTeacherInfo.zipCode,
        firstName: studentAuthRes.body.student.firstName,
        lastName: studentAuthRes.body.student.lastName,
        imageUrl: studentAuthRes.body.student.imageUrl
      })
    )
  })
})