const express = require('express')

require('dotenv').config()
require('./config/database').connect()

const app = express()
const router = require('./routes/helloRoute')
const userRouter = require('./routes/userRoute')

app.use(express.json())
app.use('/', router)
app.use('/', userRouter)

module.exports = app
