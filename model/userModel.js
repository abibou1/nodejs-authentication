const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 20],
    message: 'Name should contain 2 to 20 characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'Name should contain alpha-numeric characters only'
  })
]

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Invalid email'
  })
]

const passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [6],
    message: 'Password must be at least 6 characters'
  })
]

const userSchema = new mongoose.Schema({
  firstName: { type: String, validate: nameValidator },
  lastName: { type: String, validate: nameValidator },
  email: { type: String, validate: emailValidator },
  password: { type: String, required: true, validate: passwordValidator }
})

module.exports = mongoose.model('user', userSchema)
