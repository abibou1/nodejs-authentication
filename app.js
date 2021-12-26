const express = require('express')

require('dotenv').config()
require('./config/database').connect()

const app = express()

app.use(express.json())

app.get('/hello', async (req, res) => {
  res.status(200).send('Hello Abdoulaye')
})

module.exports = app
