/* @jest-environment node */
import request from 'supertest'
import app from '../app'
import {
  describe,
  expect,
  it,
} from '@jest/globals'
import setupDb from '../setup-data.js'
import Subject from '../models/Subject'

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

const testTeachingMaterial = {
  type: 'link',
  url: 'fakelink.com',
  name: 'new stuff'
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

    const res = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ ...testTeachingMaterial }));
  })
  it('deletes a teaching material on DELETE /teaching-materials/:id', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    const newMaterialRes = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId });
    const res = await agent.delete(`/teaching-materials/${newMaterialRes.body.id}`);
    expect(res.status).toBe(200);

    const teachingMaterialsRes = await agent.get(`/subjects/teaching-materials/${teacherAuthRes.body.teacher.id}`);
    expect(teachingMaterialsRes.body.find((subject: Subject) => subject.id === subjectId)).toEqual(
      expect.objectContaining({
        teachingMaterials: []
      })
    )
  })
  it('updates a teaching material on PUT /teaching-materials/:id', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    const newMaterialRes = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId });
    const res = await agent.put(`/teaching-materials/${newMaterialRes.body.id}`).send({ ...testTeachingMaterial, subjectId, url: 'updatetest.com' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({
      ...testTeachingMaterial,
      url: 'updatetest.com'
    }))
  })
})