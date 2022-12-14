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

  it(`serves a list of user's students at GET /students`, async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    await agent.delete('/users/sessions');
    const studentAuthRes = await agent.post('/students').send(testStudent);
    await agent.post('/connections').send({ teacherId: teacherAuthRes.body.teacher.id });
    await agent.post('/students/subject').send({ subjectId });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testTeacher.email, password: testTeacher.password });
    const res = await agent.get(`/students`)
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual(expect.objectContaining({ ...studentAuthRes.body.student }))
  })

  it('gives a 401 error for student on GET /students', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    await agent.delete('/users/sessions');
    const studentAuthRes = await agent.post('/students').send(testStudent);
    await agent.post('/connections').send({ teacherId: teacherAuthRes.body.teacher.id });
    await agent.post('/students/subject').send({ subjectId });
    const res = await agent.get(`/students`)
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only teachers can perform this action.');
  })

  it('gives a 401 error for unauthenticated user on GET /students', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    const subjectId = subjectsRes.body[0].id;
    await agent.delete('/users/sessions');
    const studentAuthRes = await agent.post('/students').send(testStudent);
    await agent.post('/connections').send({ teacherId: teacherAuthRes.body.teacher.id });
    await agent.post('/students/subject').send({ subjectId });
    await agent.delete('/users/sessions');
    const res = await agent.get(`/students`)
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
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

  it('gives a 401 error for students on POST /add-account', async () => {
    const agent = request.agent(app);
    await agent.post('/students').send(testStudent);
    const res = await agent.post('/students/add-account').send(testTeacher);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only teachers can perform this action.');
  })

  it('gives a 401 error for unauthenticated users on POST /add-account', async () => {
    const res = await request(app).post('/students/add-account').send(testTeacher);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  })

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

  it('gives a 401 error for teachers at GET /students/me', async () => {
    const agent = request.agent(app);
    await agent.post('/teachers').send(testTeacher);
    const res = await agent.get('/students/me');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only students are permitted to perform this action.');
  });

  it('gives a 401 error for unauthenticated users at GET /students/me', async () => {
    const res = await request(app).get('/students/me');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  })

  it('updates a student profile at PUT /students/me', async () => {
    const agent = request.agent(app);
    await agent.post('/students').send(testStudent);
    const res = await agent.put('/students/me')
      .send({
        ...testStudent,
        firstName: 'New Name'
      });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({
      firstName: 'New Name',
      lastName: testStudent.lastName,
      imageUrl: testStudent.imageUrl
    }));
  })

  it('gives a 401 error for teachers at PUT /students/me', async () => {
    const agent = request.agent(app);
    await agent.post('/students').send(testStudent);
    await agent.delete('/users/sessions');
    await agent.post('/teachers').send(testTeacher);
    const res = await agent.put('/students/me').send({ ...testStudent, firstName: 'New Name'});
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only students are permitted to perform this action.');
  })

  it('gives a 401 error for unauthenticated users at PUT /students/me', async () => {
    const res = await request(app).put('/students/me')
      .send({
        ...testStudent,
        firstName: 'New Name'
      });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  })

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

  it('serves a 401 error for teachers at POST /students/subject', async () => {
    const agent = request.agent(app);
    await agent.post('/teachers').send(testTeacher);
    const newSubjectRes = await agent.post('/subjects').send(testSubject);
    const res = await agent.post('/students/subject').send({ subjectId: newSubjectRes.body.id });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only students are permitted to perform this action.');
  })

  it('serves a 401 error for unauthenticated users at POST /students/subject', async () => {
    const agent = request.agent(app);
    await agent.post('/teachers').send(testTeacher);
    const newSubjectRes = await agent.post('/subjects').send(testSubject);
    await agent.delete('/users/sessions');
    const res = await agent.post('/students/subject').send({ subjectId: newSubjectRes.body.id });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  })

  it("serves a student's learning materials at GET /students/learning-materials", async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    await agent.post('/teaching-materials').send({ 
      ...testTeachingMaterial, 
      subjectId: subjectsRes.body[0].id
    });
    const studentAuthRes = await agent.post('/students').send(testStudent);
    await agent.post('/connections').send({
      teacherId: teacherAuthRes.body.teacher.id
    });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({
      email: testTeacher.email,
      password: testTeacher.password
    });
    await agent.put('/connections').send({
      studentId: studentAuthRes.body.student.id,
      connectionStatus: 'approved'
    });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ email: testStudent.email, password: testStudent.password });
    await agent.post('/students/subject').send({
      subjectId: subjectsRes.body[0].id
    });
    const res = await agent.get('/students/learning-materials');
    expect(res.status).toBe(200);
    expect(res.body[0].teachingMaterials[0]).toEqual(
      expect.objectContaining({
      ...testTeachingMaterial
    }))
  });

  it('gives a 401 error for teachers at GET /students/learning-materials', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    await agent.post('/teaching-materials').send({ 
      ...testTeachingMaterial, 
      subjectId: subjectsRes.body[0].id
    });
    const studentAuthRes = await agent.post('/students').send(testStudent);
    await agent.post('/connections').send({
      teacherId: teacherAuthRes.body.teacher.id
    });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ 
      email: testTeacher.email,
      password: testTeacher.password
    });
    await agent.put('/connections').send({
      studentId: studentAuthRes.body.student.id,
      connectionStatus: 'approved'
    });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ 
      email: testStudent.email, 
      password: testStudent.password 
    });
    await agent.post('/students/subject').send({
      subjectId: subjectsRes.body[0].id
    });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ 
      email: testTeacher.email, 
      password: testTeacher.password 
    });
    const res = await agent.get('/students/learning-materials');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Only students are permitted to perform this action.');
  });

  it('gives a 401 error for unauthenticated users at GET /students/learning-materials', async () => {
    const agent = request.agent(app);
    const teacherAuthRes = await agent.post('/teachers').send(testTeacher);
    const subjectsRes = await agent.get(`/subjects/${teacherAuthRes.body.teacher.id}`);
    await agent.post('/teaching-materials').send({ 
      ...testTeachingMaterial, 
      subjectId: subjectsRes.body[0].id
    });
    const studentAuthRes = await agent.post('/students').send(testStudent);
    await agent.post('/connections').send({
      teacherId: teacherAuthRes.body.teacher.id
    });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ 
      email: testTeacher.email,
      password: testTeacher.password
    });
    await agent.put('/connections').send({
      studentId: studentAuthRes.body.student.id,
      connectionStatus: 'approved'
    });
    await agent.delete('/users/sessions');
    await agent.post('/users/sessions').send({ 
      email: testStudent.email, 
      password: testStudent.password 
    });
    await agent.post('/students/subject').send({
      subjectId: subjectsRes.body[0].id
    });
    await agent.delete('/users/sessions');
    const res = await agent.get('/students/learning-materials');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('You must be signed in to continue');
  })
})