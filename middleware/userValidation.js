
const validateUser = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All input are required' })
  }

  const nameMinSize = 2
  const passwordMinSize = 6
  if (firstName.length < nameMinSize || lastName.length < nameMinSize || password.length < passwordMinSize) {
    const errors = {}
    if (firstName.length < nameMinSize) {
      errors.firstNameError = 'FirstName should contain 2 to 20 characters'
    }

    if (lastName.length < nameMinSize) {
      errors.lastNameError = 'lastName should contain 2 to 20 characters'
    }

    if (password.length < passwordMinSize) {
      errors.passwordError = 'Password must be at least 6 characters'
    }

    return res.status(400).json(errors)
  }

  return next()
}

module.exports = validateUser
