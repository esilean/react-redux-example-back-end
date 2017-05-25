const port = 3004

const bodyParser = require('body-parser')
const express = require('express')
const allowCors = require('./cors')
const queryParser = require('express-query-int')

const server = express()

server.use(bodyParser.urlencoded({ extended: true, defer: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())
server.use(express.static('../'))

server.listen(port, function () {
    console.log(`BACKEND is running on port ${port}`)
})

module.exports = server