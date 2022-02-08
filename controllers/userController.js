const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All input are required' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return res.status(409).json({ error: 'User Already Exist. Please Login' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword
    })

    const token = jwt.sign(
      { email: user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h'
      }
    )

    return res.status(201).json({ token })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

module.exports = {
  register
}
