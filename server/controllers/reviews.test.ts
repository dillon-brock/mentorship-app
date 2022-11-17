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
  subject: 'test subject',
  bio: 'I am a teacher',
  zipCode: '97214',
  phoneNumber: '5555555555',
  contactEmail: 'teacher@test.com',
  city: 'Portland',
  state: 'OR'
}

describe('reviews controller', () => {
  beforeEach(() => {
    return setupDb();
  })
  it('creates new review on POST /reviews', async () => {
    const agent = request.agent(app);
    const teacherRes = await agent.post('/teachers').send(testTeacher);
    await agent.delete('/users/sessions');
    const studentRes = await agent.post('/students').send(testStudent);
    const res = await agent.post('/reviews').send({
      teacherId: teacherRes.body.teacher.id,
      studentId: studentRes.body.student.id,
      detail: 'Great teacher!',
      stars: 5
    })
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ detail: 'Great teacher!', stars: 5 }))
  })
})