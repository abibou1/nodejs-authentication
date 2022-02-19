
const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [
    body('firstName')
      .exists()
      .withMessage('firstName is required')
      .isLength({ min: 2, max: 20 })
      .withMessage('FirstName should contain 2 to 20 characters'),
    body('lastName')
      .exists()
      .withMessage('lastName is required')
      .isLength({ min: 2, max: 20 })
      .withMessage('lastName should contain 2 to 20 characters'),
    body('email')
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('Invalid Email'),
    body('password')
      .exists()
      .withMessage('password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ]
}
const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({ errors: extractedErrors })
}

// const validate = (req, res, next) => {
//   const { firstName, lastName, email, password } = req.body

//   if (!firstName || !lastName || !email || !password) {
//     return res.status(400).json({ error: 'All input are required' })
//   }

//   const nameMinSize = 2
//   const passwordMinSize = 6
//   if (firstName.length < nameMinSize || lastName.length < nameMinSize || password.length < passwordMinSize) {
//     const errors = {}
//     if (firstName.length < nameMinSize) {
//       errors.firstNameError = 'FirstName should contain 2 to 20 characters'
//     }

//     if (lastName.length < nameMinSize) {
//       errors.lastNameError = 'lastName should contain 2 to 20 characters'
//     }

//     if (password.length < passwordMinSize) {
//       errors.passwordError = 'Password must be at least 6 characters'
//     }

//     return res.status(400).json(errors)
//   }

//   return next()
// }

module.exports = {
  userValidationRules,
  validate
}

// export default {
//   validate
// }
