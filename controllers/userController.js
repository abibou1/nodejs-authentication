const register = async (req, res) => {
  res.status(201).json({ token: 'yourtokenhere' })
}

module.exports = {
  register
}
