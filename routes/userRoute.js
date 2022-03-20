const router = require('express').Router()
const userController = require('./../controllers/userController')
const userValidation = require('./../middlewares/userValidation')

const bodyParser = require('body-parser')

router.use(bodyParser.json())
const apiUrl = '/api/'

router.post(apiUrl + 'register', userValidation.userValidationRules(), userValidation.validate, userController.register)

module.exports = router
