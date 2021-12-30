const express = require('express')
const helloController = require('./controllers/helloController')

require('dotenv').config()
require('./config/database').connect()

const app = express()

app.use(express.json())

app.get('/hello', helloController.helloWorld)

module.exports = app
