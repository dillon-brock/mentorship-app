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

describe('students controller', () => {
  beforeEach(() => {
    return setupDb();
  })
  it('signs up and signs in new student on POST /students', async () => {
    const res = await request(app).post('/students').send(testStudent);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Signed in successfully!');
  })
})