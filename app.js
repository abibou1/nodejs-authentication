const express = require('express')
const helloController = require('./controllers/helloController')
const userController = require('./controllers/userController')
const validateUser = require('./middleware/userValidation')

require('dotenv').config()
require('./config/database').connect()
const apiUrl = '/api/'

const app = express()
const router = require('./routes/helloRoute')

app.use(express.json())
app.use('/', router)

app.get('/hello', helloController.helloWorld)
app.post(apiUrl + 'register', validateUser, userController.register)

module.exports = app
