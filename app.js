const express = require('express')
const helloController = require('./controllers/helloController')

require('dotenv').config()
require('./config/database').connect()

const app = express()

app.use(express.json())

// app.get('/hello', async (req, res) => {
//   res.status(200).send('Hello World')
// })
app.get('/hello', helloController.helloWorld)

module.exports = app
