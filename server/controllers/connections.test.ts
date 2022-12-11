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
  subjects: [{ subject: 'Drawing', minPrice: 10, maxPrice: 30, lessonType: 'In person' }],
  bio: 'I am a teacher',
  zipCode: '97214',
  phoneNumber: '5555555555',
  contactEmail: 'teacher@test.com',
  city: 'Portland',
  state: 'OR'
}

const createTeacherAndStudent = async () => {
  const agent = request.agent(app);
  
  const studentRes = await agent.post('/students').send(testStudent);
  const teacherRes = await agent.post('/teachers').send(testTeacher);

  return { agent, student: studentRes.body.student, teacher: teacherRes.body.teacher };
}

describe('connections controller', () => {
  beforeEach(() => {
    return setupDb();
  })
  it('creates new pending connection on POST /connections', async () => {
    const { agent, student, teacher } = await createTeacherAndStudent();
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testStudent.email, password: testStudent.password });
    const res = await agent.post('/connections').send({
      teacherId: teacher.id,
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      teacherId: teacher.id,
      studentId: student.id,
      connectionApproved: 'pending'
    });
  })
  it('gives a 401 error for a teacher creating a new connection', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const res = await agent.post('/connections').send({ teacherId: teacherAuthRes.body.teacher.id });
    expect(res.status).toBe(401);
  })
  it('gives a 401 error for an unauthenticated user creating a new connection', async () => {
    const res = await request(app).post('/connections').send({ teacherId: '1' });
    expect(res.status).toBe(401);
  })
  it('updates connection status on PUT /connections', async () => {
    const { agent, student, teacher } = await createTeacherAndStudent();
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testStudent.email, password: testStudent.password });
    await agent.post('/connections').send({
      teacherId: teacher.id
    });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testTeacher.email, password: testTeacher.password });
    const res = await agent.put('/connections').send({
      studentId: student.id,
      connectionStatus: 'approved'
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      teacherId: teacher.id,
      studentId: student.id,
      connectionApproved: 'approved'
    });
  })
  it('gives a 401 error for a student trying to update a connection', async () => {
    const { agent, student, teacher } = await createTeacherAndStudent();
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testStudent.email, password: testStudent.password });
    await agent.post('/connections').send({ teacherId: teacher.id });
    const res = await agent.put('/connections').send({
      teacherId: teacher.id,
      studentId: student.id,
      connectionStatus: 'approved'
    });
    expect(res.status).toBe(401);
  });
  it('gives a 401 error for an unauthenticated user trying to update a connection', async () => {
    const { agent, student, teacher } = await createTeacherAndStudent();
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testStudent.email, password: testStudent.password });
    await agent.post('/connections').send({ teacherId: teacher.id });
    await agent.delete('/users/sessions');
    const res = await agent.put('/connections').send({
      teacherId: teacher.id,
      studentId: student.id,
      connectionStatus: 'approved'
    });
    expect(res.status).toBe(401);
  })
  it('allows a student to delete a connection', async () => {
    const { agent, teacher } = await createTeacherAndStudent();
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testStudent.email, password: testStudent.password });
    const connectionRes = await agent.post('/connections').send({ teacherId: teacher.id });
    const res = await agent.delete(`/connections/${connectionRes.body.id}`);
    expect(res.status).toBe(200);
  })
  it('allows a teacher to delete a connection', async () => {
    const { agent, student, teacher } = await createTeacherAndStudent();
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testStudent.email, password: testStudent.password });
    const connectionRes = await agent.post('/connections').send({ teacherId: teacher.id });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testTeacher.email, password: testTeacher.password });
    const res = await agent.delete(`/connections/${connectionRes.body.id}`);
    expect(res.status).toBe(200);
  })
})