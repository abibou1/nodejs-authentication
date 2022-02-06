const express = require('express')
const helloController = require('./controllers/helloController')

require('dotenv').config()
require('./config/database').connect()

const app = express()
const router = require('./routes/helloRoute')

app.use(express.json())
app.use('/', router)

app.get('/hello', helloController.helloWorld)

module.exports = app
