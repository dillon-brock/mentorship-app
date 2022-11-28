import request from 'supertest'
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

describe('subjects controller', () => {
  beforeEach(() => {
    return setupDb();
  })
  it('serves a list of subjects corresponding to teacher from query params', async () => {
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
  })
})