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

const secondTestTeacher = {
  firstName: 'Second',
  lastName: 'Teacher',
  email: 'second@test.com',
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

const testStudent = {
  firstName: 'Test',
  lastName: 'Student',
  email: 'student@test.com',
  password: '123456',
  imageUrl: 'testimage.com'
};

const testTeachingMaterial = {
  type: 'link',
  url: 'fakelink.com',
  name: 'new stuff'
}

describe('teaching materials controller', () => {
  beforeEach(() => {
    return setupDb();
  })
  it('serves a list of teaching materials at GET /teaching-materials', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const newMaterialRes = await agent.post('/teaching-materials')
      .send({
        ...testTeachingMaterial,
        subjectId: subjectsRes.body[0].id
      });
    const res = await agent.get('/teaching-materials');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual(
      expect.objectContaining({
        ...testTeachingMaterial
      })
    )
    expect(newMaterialRes.status).toBe(200);
  });

  it('gives a 401 error for students at GET /teaching-materials', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    await agent.post('/teaching-materials')
      .send({
        ...testTeachingMaterial,
        subjectId: subjectsRes.body[0].id
      });
    await agent.delete('/users/sessions');
    await agent.post('/students').send(testStudent);
    const res = await agent.get('/teaching-materials');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only teachers can perform this action.');
  })

  it('gives a 401 error for unauthenticated users at GET /teaching-materials', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    await agent.post('/teaching-materials')
      .send({
        ...testTeachingMaterial,
        subjectId: subjectsRes.body[0].id
      });
    await agent.delete('/users/sessions');
    const res = await agent.get('/teaching-materials');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  })

  it('creates new teaching materials on POST /teaching-materials', async () => {
    const agent = request.agent(app);
    const teacherRes = await agent.post('/teachers').send(testTeacher);
    const subjects = await agent.get(`/subjects/${teacherRes.body.teacher.id}`);
    const subjectId = subjects.body[0].id;

    const res = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ ...testTeachingMaterial }));
  });

  it('gives a 401 error for students on POST /teaching-materials', async () => {
    const agent = request.agent(app);
    const teacherRes = await agent.post('/teachers').send(testTeacher);
    const subjects = await agent.get(`/subjects/${teacherRes.body.teacher.id}`);
    const subjectId = subjects.body[0].id;
    await agent.delete('/users/sessions');
    await agent.post('/students').send(testStudent);
    const res = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only teachers can perform this action.');
  })

  it('gives a 401 error for unauthenticated users on POST /teaching-materials', async () => {
    const agent = request.agent(app);
    const teacherRes = await agent.post('/teachers').send(testTeacher);
    const subjects = await agent.get(`/subjects/${teacherRes.body.teacher.id}`);
    const subjectId = subjects.body[0].id;
    await agent.delete('/users/sessions');
    const res = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  })

  it('deletes a teaching material on DELETE /teaching-materials/:id', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    const newMaterialRes = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId });
    const res = await agent.delete(`/teaching-materials/${newMaterialRes.body.id}`);
    expect(res.status).toBe(200);

    const teachingMaterialsRes = await agent.get(`/teaching-materials`);
    expect(teachingMaterialsRes.body).toEqual([]);
  })

  it('gives a 401 error for students on DELETE /teaching-materials/:id', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    const newMaterialRes = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId });
    await agent.delete('/users/sessions');
    await agent.post('/students').send(testStudent);
    const res = await agent.delete(`/teaching-materials/${newMaterialRes.body.id}`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only teachers can perform this action.');
  });

  it('gives a 401 error for unauthenticated users on DELETE /teaching-materials/:id', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    const newMaterialRes = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId });
    await agent.delete('/users/sessions');
    const res = await agent.delete(`/teaching-materials/${newMaterialRes.body.id}`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  });

  it('gives a 403 error for an unauthorized teacher on DELETE /teaching-materials/:id', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    const newMaterialRes = await agent.post('/teaching-materials').send({ ...testTeachingMaterial, subjectId });
    await agent.delete('/users/sessions');
    await agent.post('/teachers').send(secondTestTeacher);
    const res = await agent.delete(`/teaching-materials/${newMaterialRes.body.id}`);
    expect(res.status).toBe(403);
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

  it('gives a 401 error for students on PUT /teaching-materials/:id', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    const newMaterialRes = await agent.post('/teaching-materials').send({ 
      ...testTeachingMaterial, 
      subjectId
    });
    await agent.delete('/users/sessions');
    await agent.post('/students').send(testStudent);
    const res = await agent.put(`/teaching-materials/${newMaterialRes.body.id}`)
      .send({ 
        ...testTeachingMaterial, 
        subjectId, url: 'updatetest.com' 
      });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only teachers can perform this action.');
  });

  it('gives a 401 error for unauthenticated users on PUT /teaching-materials/:id', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    const newMaterialRes = await agent.post('/teaching-materials').send({ 
      ...testTeachingMaterial, 
      subjectId
    });
    await agent.delete('/users/sessions');
    const res = await agent.put(`/teaching-materials/${newMaterialRes.body.id}`)
      .send({ 
        ...testTeachingMaterial, 
        subjectId,
        url: 'updatetest.com' 
      });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  });

  it('gives a 403 error for unauthorized teacher on PUT /teaching-materials/:id', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    const newMaterialRes = await agent.post('/teaching-materials').send({
      ...testTeachingMaterial,
      subjectId
    });
    await agent.delete('/users/sessions');
    await agent.post('/teachers').send(secondTestTeacher);
    const res = await agent.put(`/teaching-materials/${newMaterialRes.body.id}`)
      .send({
        ...testTeachingMaterial,
        subjectId,
        url: 'updatetest.com'
      })
    expect(res.status).toBe(403);
  })
})