/**
 * Created by dustin on 11/28/18.
 */

//Make Connection

var socket = io.connect('https://ddchatapp.herokuapp.com/');

// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    buzz = document.getElementById('buzz'),
    clear = document.getElementById('clear'),
    output = document.getElementById('output'),
    collectHandle = document.getElementById('collect-handle'),
    sendHandle = document.getElementById('send-handle'),
    feedback = document.getElementById('feedback');


var userHandle = 'No Handle Set';

// Emit events

sendHandle.addEventListener('click', function (){
   socket.emit('chat', {
       message: message.value,
       handle: handle.value,
   });
    userHandle = handle.value;
  // collectHandle.style.display = 'none'; // This socket only
});

buzz.addEventListener('click', function (){
    socket.emit('buzz', {
        userHandle: userHandle
    });
});

// clear.addEventListener('click', function (){
//     socket.emit('chatClear');
// });
//
// disable.addEventListener('click', function (){
//     socket.emit('chatDisable');
// });
//
// enable.addEventListener('click', function (){
//     socket.emit('chatEnable');
// });


message.addEventListener('keypress', function (){
   socket.emit('typing', handle.value);
});

//Listen for events
socket.on('chat', function(data){
   output.innerHTML += '<p><strong>' + data.handle + '</strong></p>';
   userHandle = data.handle;
    feedback.innerHTML = '';
});

socket.on('buzz', function(data){
    output.innerHTML += '<p><strong>Buzzer: ' + data.userHandle + '</strong></p>';

});

// socket.on('chatClear', function(data){
//     output.innerHTML = '';
// });
//
// socket.on('chatEnable', function(data){
//     send.style.display = 'inline';
//     console.log('disable send');
// });
//
// socket.on('chatDisable', function(data){
//     send.style.display = 'none';
//     console.log('disable send');
// });

//broadcast feedback
socket.on('typing', function(data){
    feedback.innerHTML = data + 'is typing';
});
