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

const testSubject = {
  subject: 'Coding',
  minPrice: 40,
  maxPrice: 60,
  lessonType: 'Remote'
}

const testTeachingMaterial = {
  url: 'materialtest.com',
  type: 'link',
  name: 'Test Material'
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
  it('creates a student profile for authenticated teacher at POST /students/add-account', async () => {
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
  it('gets student profile information at GET /students/me', async () => {
    const agent = request.agent(app);
    const studentAuthRes = await agent.post('/students').send(testStudent);
    const res = await agent.get('/students/me');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      userId: studentAuthRes.body.student.userId,
      firstName: studentAuthRes.body.student.firstName,
      lastName: studentAuthRes.body.student.lastName,
      imageUrl: studentAuthRes.body.student.imageUrl
    })
  });
  it('serves a new student subject connection at POST /students/subject', async () => {
    const agent = request.agent(app);
    await agent.post('/teachers').send(testTeacher);
    const newSubjectRes = await agent.post('/subjects').send(testSubject);
    await agent.delete('/users/sessions');
    const studentAuthRes = await agent.post('/students').send(testStudent);
    const res = await agent.post('/students/subject').send({ subjectId: newSubjectRes.body.id });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      subjectId: newSubjectRes.body.id,
      studentId: studentAuthRes.body.student.id
    })
  })
  it("serves a student's learning materials at GET /students/learning-materials", async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const teachingMaterialsRes = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId: subjectsRes.body[0].id });
    const studentAuthRes = await agent.post('/students').send(testStudent);
    await agent.post('/connections').send({
      teacherId: teacherAuthRes.body.teacher.id
    });
    await agent.put('/connections').send({
      teacherId: teacherAuthRes.body.teacher.id,
      connectionStatus: 'approved'
    });
    await agent.post('/students/subject').send({
      subjectId: subjectsRes.body[0].id
    });
    const res = await agent.get('/students/learning-materials');
    console.log(res.body[0].teachingMaterials);
    expect(res.status).toBe(200);
    expect(res.body[0].teachingMaterials[0]).toEqual(
      expect.objectContaining({
      ...testTeachingMaterial
    }))
  });
})