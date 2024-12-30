import request from 'supertest'
import app from '../index'

describe('Authors CRUD', () => {
  let authorId: string
  describe('POST /api/authors', () => {
    it('Should respond with status 201 and author', async () => {
      const response = await request(app).post('/api/authors').send({
        firstName: 'Maximo',
        lastName: 'Stodulsky',
        dni: '45417451',
        nationality: 'argentina'
      })
      expect(response.status).toBe(201)
      expect(response.body.author).toEqual({
        _id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        dni: expect.any(String),
        nationality: expect.any(String),
        __v: expect.any(Number)
      })
      authorId = response.body.author._id
    })
  })

  describe('GET /api/authors', () => {
    it('Should respond with authors and status 200', async () => {
      const response = await request(app).get('/api/authors')
      expect(response.status).toBe(200)
      expect(response.body.authorsList).toEqual(expect.any(Object))
    })
  })

  describe('GET /api/authors/:id', () => {
    it('Should respond with status 200 and author', async () => {
      const response = await request(app).get('/api/authors/' + authorId)
      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        _id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        dni: expect.any(String),
        nationality: expect.any(String),
        __v: expect.any(Number)
      })
    })
  })

  describe('PUT /api/authors/:id', () => {
    it('Should respond with status 200 and author', async () => {
      const response = await request(app)
        .put('/api/authors/' + authorId)
        .send({
          firstName: 'Franco',
          lastName: 'Stodulsky',
          dni: '45923056',
          nationality: 'brasil'
        })
      expect(response.status).toBe(200)
      expect(response.body.updatedAuthor).toEqual({
        _id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        dni: expect.any(String),
        nationality: expect.any(String),
        __v: expect.any(Number)
      })
    })
  })
  describe('DELETE /api/authors/:id', () => {
    it('Should respond with status 200 and Message "Author deleted successfully"', async () => {
      const response = await request(app).delete('/api/authors/' + authorId)

      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Author deleted successfully')
    })
  })
})
