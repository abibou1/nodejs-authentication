const request = require('supertest')
const expect = require('chai').expect
const app = require('./../app')

describe('POST /hello', function () {
  it('should send message \'Hello\'', async function () {
    const response = await request(app)
      .get('/hello')

    expect(response.status).to.eql(200)
    expect(response.text).to.eql('Hello')
  })
})
