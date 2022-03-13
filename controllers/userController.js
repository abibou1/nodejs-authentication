const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const emailLowerCase = email.toLowerCase()

  const encryptedPassword = await bcrypt.hash(password, 10)

  const token = jwt.sign(
    { email: emailLowerCase },
    process.env.TOKEN_KEY,
    {
      expiresIn: '2h'
    }
  )

  await User.create({
    firstName,
    lastName,
    email: emailLowerCase,
    password: encryptedPassword
  })
    .then(() => {
      return res.status(201).json({ token })
    })
    .catch(err => {
      if (err.keyValue && err.keyValue.email) {
        return res.status(409).json({ error: 'User Already Exist. Please Login' })
      } else {
        return res.status(500).json({ error: err.message })
      }
    })
}

module.exports = {
  register
}
