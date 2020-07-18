const express = require('express')
const socket = require('socket.io')

const app = express()

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})

const io = socket(server)

io.on('connection', (so) => {
  so.on('BOARD_EVENTS', (data) => {
    io.sockets.emit('BOARD_EVENTS', data)
  })
})
