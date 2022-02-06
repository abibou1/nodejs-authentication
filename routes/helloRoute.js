const router = require('express').Router()
const controller = require('../controllers/helloController')

const bodyParser = require('body-parser')

router.use(bodyParser.json())

router.get('/hello', controller.helloWorld)

module.exports = router
