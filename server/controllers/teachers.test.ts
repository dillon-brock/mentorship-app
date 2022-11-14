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

describe('teachers controller', () => {
  beforeEach(() => {
    setupDb()
  })

  it('successfully gets /teachers', () => {
    return request(app)
      .get('/teachers')
      .then(res => expect(res.status).toBe(200))
  })

  it('serves a list of teachers on GET /teachers', () => {
    return request(app)
      .get('/teachers')
      .then((res) => {
        expect(res.body[0]).toEqual(expect.objectContaining({ firstName: 'Arlop', lastName: 'Beans', imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}))
      })
  })
})
