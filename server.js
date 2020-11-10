//this file is for only making the server of socket and express

const express = require('express'); //need express, so import it
const app = express() // invoking express
app.use(express.static(__dirname + '/public'))//default or static directory
const socketio = require('socket.io');//bringing in socket io
const expressServer = app.listen(8080)//listening express server
const io = socketio(expressServer)//listening socketio server 
const helmet  = require('helmet')
app.use(helmet())
console.log('express and socketio are listening on port 8080')

module.exports = {
    app,
    io
}