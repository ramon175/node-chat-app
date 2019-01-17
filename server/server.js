const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const{ isRealString } = require('./utils/validations');
const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));



io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, cb) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            cb('Name and room name are required');
        }

        socket.join(params.room);

        socket.emit('newMessage', generateMessage('Admin','Welcome to the chatApp'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));

        cb();
    });

    socket.on('createMessage',(msg,cb) => {
        console.log('createMessage',msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        cb('This is from the server');
    });

    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log('client disconnected');
        
    })
});



server.listen(PORT,() => {
    console.log(`Server up on port ${PORT}`);
    
})
