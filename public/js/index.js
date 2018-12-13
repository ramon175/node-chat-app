var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    socket.on('newMessage', function(message) {
        console.log('received new message', message);
        
    });

    socket.emit('createMessage', {
        from: 'ramon',
        text:'vrau'
    });

})
socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

;
