const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chatApp'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

    socket.on('createMessage',(msg,cb) => {
        console.log('createMessage',msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        cb('This is from the server');
        // socket.broadcast.emit('newMessage',{
        //     from:msg.from,
        //     text:msg.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', () => {
        console.log('client disconnected');
        
    })
});



server.listen(PORT,() => {
    console.log(`Server up on port ${PORT}`);
    
})
