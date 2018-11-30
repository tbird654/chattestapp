/**
 * Created by dustin on 11/28/18.
 */
//This is the server js

var express = require('express');
var socket = require('socket.io');

// App setup

var app = express();
var server = app.listen(4000, function(){
    console.log('listening to requests on port 4000');
});

//Static Files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
   console.log('made socket connection', socket.id);

   //listen for socket chat from front
   socket.on('chat', function(data){
       io.sockets.emit('chat', data);
   });

    socket.on('buzz', function(data){
        io.sockets.emit('buzz', data);
    });

    socket.on('chatClear', function(data){
        io.sockets.emit('chatClear', data);
    });

    socket.on('chatEnable', function(data){
        io.sockets.emit('chatEnable', data);
    });

    socket.on('chatDisable', function(data){
        io.sockets.emit('chatDisable', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});