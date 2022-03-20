const request = require('supertest')
const expect = require('chai').expect
const app = require('./../app')
const User = require('../model/userModel')

after('Deleting all users', async function () {
  const email = 'test@test.com'
  // console.log('delete all users...')
  console.log('deleting user with email: ' + email)
  // const ok = await User.deleteMany({})
  const ok = await User.deleteOne({ email })
  console.log(ok.deletedCount, ' user(s) deleted!')
})

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
  it('should return 409 as status', async function () {
    const email = 'test@test.com'

    // existing user -> conflict
    const response = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ firstName: 'test', lastName: 'test', email: email, password: 'Password1#' })

    expect(response.status).to.eq(409)
    expect(response.body.error).to.eq('User Already Exist. Please Login')
  })
})

describe('Register with bad email format', function () {
  it('should return 422 as status code with message', async function () {
    // invalid email
    const response = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ firstName: 'test', lastName: 'test', email: 'baduser@com', password: 'Password1#' })

    expect(response.status).to.eql(422)
    expect(response.body.errors[0].email).to.eq('Invalid Email')
  })
})

describe('Register with invalid firstname', function () {
  it('should return 422 as status code with message', async function () {
    // invalid firstName
    const response = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ firstName: 'y', lastName: 'test', email: 'baduser@test.com', password: 'Password1#' })

    expect(response.status).to.eql(422)
    expect(response.body.errors[0].firstName).to.eq('FirstName should contain 2 to 20 characters')
  })
})

describe('Register with short password', function () {
  it('should return 422 as status code with message', async function () {
    // short password
    const response = await request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send({ firstName: 'test', lastName: 'test', email: 'user@test.com', password: 'Pass' })

    expect(response.status).to.eql(422)
    expect(response.body.errors[0].password).to.eq('Password must be at least 6 characters')
  })
})
