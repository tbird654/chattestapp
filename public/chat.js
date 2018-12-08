/**
 * Created by dustin on 11/28/18.
 */

//Make Connection

var socket = io.connect();

socket.on('connect', function(){
    var id = socket.io.engine.id;
    readyToRoll();
});


function readyToRoll(){


    // Query DOM
        var message = document.getElementById('message'),
            handle = document.getElementById('handle'),
            //   buzz = document.getElementById('buzz'),
            clear = document.getElementById('clear'),
            output = document.getElementById('output'),
            collectHandle = document.getElementById('collect-handle'),
            sendHandle = document.getElementById('send-handle'),
            feedback = document.getElementById('feedback');
            participants = document.getElementById('participants');


        var userHandle = 'No Handle Set';


    // General Stuff

    function setHandle(newHandle){
        //socket.nickname = newHandle;
        //var nickName = socket.nickname;
        var nickName = newHandle;
        participants.innerHTML += nickName + '</br>';
    }


    // Emit events

        sendHandle.addEventListener('click', function (event){
            socket.emit('chat', {
                message: message.value,
                handle: handle.value
            });

            // userHandle = handle.value;
            // collectHandle.style.display = 'none'; // This socket only
        });


        message.addEventListener('keydown',function(event){
            if (event.keyCode === 13) {
                sendHandle.click();
            }
        });




    // buzz.addEventListener('click', function (){
    //     socket.emit('buzz', {
    //         userHandle: userHandle
    //     });
    // });

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
            output.innerHTML += '<div><strong>' + data.handle + ':</strong></div><div>'+ data.message +'</div><hr>';
            // userHandle = data.handle;
            // userMessage = data.message;
            feedback.innerHTML = '';
            setHandle(data.handle);
          //  participants.innerHTML += data.handle + '</br>';
        });

    // socket.on('buzz', function(data){
    //     output.innerHTML += '<p><strong>Buzzer: ' + data.userHandle + '</strong></p>';
    //
    // });

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


    // When a socket disconnects
    // socket.on('disconnectThatSoc', function(){
    //     socket.disconnect();
    // });



} // end readyToRoll





