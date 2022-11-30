/* @jest-environment node */
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
  subjects: [{ subject: 'Drawing', minPrice: 10, maxPrice: 30, lessonType: 'In person' }],
  bio: 'I am a teacher',
  zipCode: '97214',
  phoneNumber: '5555555555',
  contactEmail: 'teacher@test.com',
  city: 'Portland',
  state: 'OR'
}

describe('teaching materials controller', () => {
  beforeEach(() => {
    return setupDb();
  })
  it('creates new teaching materials on POST /teaching-materials', async () => {
    const agent = request.agent(app);
    const teacherRes = await agent.post('/teachers').send(testTeacher);
    const subjects = await agent.get(`/subjects/${teacherRes.body.teacher.id}`);
    const subjectId = subjects.body[0].id;

    const newTeachingMaterial = {
      subjectId,
      type: 'link',
      url: 'fakelink.com',
      name: 'new stuff'
    }

    const res = await agent.post('/teaching-materials').send(newTeachingMaterial);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ ...newTeachingMaterial }));
  })
})