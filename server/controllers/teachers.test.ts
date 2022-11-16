// Note the mismatch of import name and library name. This follows the
// documentation example.
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

const registerAndLoginStudent = async () => {
  const agent = request.agent(app);

  const agentResponse = await agent.post('/students').send(testStudent);
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
    const agent = await registerAndLoginStudent();
    const res = await agent.get('/teachers/1');
    expect(res.status).toBe(200);
  })

  it('serves a list of teachers on GET /teachers', async () => {
    const res = await request(app).get('/teachers');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      userId: expect.any(String),
      subject: expect.any(String),
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
      stars: 5,
      detail: 'An absolutely incredible teacher!',
      teacherId: '1',
      studentId: '1'
    }));
  });

  it("serves a teacher's students with id corresponding to params on GET /teachers/:id/students", async () => {
    const res = await request(app).get('/teachers/1/students');
    expect(res.body).toEqual([
      {
        id: '1',
        userId: '1',
        imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        firstName: 'Dillon',
        lastName: 'Brock',
        connectionApproved: 'approved'
      },
      {
        id: '2',
        userId: '2',
        imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        firstName: 'Mo',
        lastName: 'Saladino',
        connectionApproved: 'rejected'
      }
    ])
  })
})
