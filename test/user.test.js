const request = require('supertest')
const expect = require('chai').expect
const app = require('./../app')
const User = require('../model/userModel')

describe('Register', function () {
  it('should return ok', async function () {
    const email = 'test@test.com'
    const response = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ firstName: 'test', lastName: 'test', email: email, password: 'Password1#' })

    expect(response.status).to.eql(201)

    // eslint-disable-next-line no-unused-expressions
    expect(response.body.token).to.not.be.empty

    const user = await User.findOne({ email: email })
    expect(user.firstName).to.eql('test')
  })
})

describe('Register with existing user', function () {
  it('should return ok', async function () {
    const email = 'test@test.com'

    const user = await User.findOne({ email: email })
    expect(user.firstName).to.eql('test')

    // existing user -> conflict
    const response = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ firstName: 'test', lastName: 'test', email: email, password: 'Password1#' })

    expect(response.status).to.eql(409)
    // eslint-disable-next-line no-unused-expressions
    expect(response.body.token).to.be.undefined

    const ok = User.deleteOne({ _id: user._id })
    expect((await ok).deletedCount).to.eq(1)
  })
})

describe('Register with missing required information', function () {
  it('should return ok', async function () {
    let email = 'baduser@com'
    // invalid email
    let response = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ firstName: 'y', lastName: 'test', email: email, password: 'Password1#' })

    expect(response.status).to.eql(422)
    // eslint-disable-next-line no-unused-expressions
    expect(response.body.token).to.be.undefined
    let user = await User.findOne({ email: email })
    // eslint-disable-next-line no-unused-expressions
    expect(user).to.be.null

    email = 'baduser@test.com'
    // invalid firstName
    response = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ firstName: 'y', lastName: 'test', email: email, password: 'Password1#' })

    expect(response.status).to.eql(422)
    // eslint-disable-next-line no-unused-expressions
    expect(response.body.token).to.be.undefined

    user = await User.findOne({ email: email })
    // eslint-disable-next-line no-unused-expressions
    expect(user).to.be.null

    // short password
    response = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ firstName: 'y', lastName: 'test', email: 'user@test.com', password: 'Pass' })

    expect(response.status).to.eql(422)
    // eslint-disable-next-line no-unused-expressions
    expect(response.body.token).to.be.undefined
    user = await User.findOne({ email: email })
    // eslint-disable-next-line no-unused-expressions
    expect(user).to.be.null
  })
})
