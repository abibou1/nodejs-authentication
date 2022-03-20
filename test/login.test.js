const request = require('supertest')
const expect = require('chai').expect
const app = require('./../app')

describe('Login', function () {
  it('Successful login', async function () {
    const email = 'john@gmail.com'
    const response = await request(app)
      .post('/api/login')
      .set('content-Type', 'application/json')
      .send({ email, password: '123456' })

    expect(response.status).to.equal(200)

    expect(response.body).contains('token')
  })

  it('Unsuccessful login', async function () {
    const email = 'notexistingemail@gmail.com'
    const response = await request(app)
      .post('/api/login')
      .set('content-Type', 'application/json')
      .send({ email, password: '123456' })

    expect(response.status).to.eql(400)

    expect(response.body.error).to.eql('The email or password is incorrect')
  })
})
