const helloWorld = async (req, res) => {
  res.status(200).send('Hello World')
}

module.exports = {
  helloWorld
}
