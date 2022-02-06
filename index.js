const http = require('http')
const app = require('./app')
const server = http.createServer(app)

const port = process.env.PORT || 4001

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
