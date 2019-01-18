const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const{ isRealString } = require('./utils/validations');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));



io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, cb) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return cb('Name and room name are required');
        }

        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));

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
        
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room`))
        }
    })
});



server.listen(PORT,() => {
    console.log(`Server up on port ${PORT}`);
    
})
