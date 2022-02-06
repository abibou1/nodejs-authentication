const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All input are required' })
    }
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }

  res.status(201).json({ token: 'yourtokenhere' })
}

module.exports = {
  register
}
