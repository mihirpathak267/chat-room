console.log('did i load properly?')
//getting all the useful html elements
const output = document.getElementById('output');
const message = document.getElementById('message');
const send = document.getElementById('send');
const feedback = document.getElementById('feedback');
const roomMessage = document.querySelector('.room-message');
const users = document.querySelector('.users');

//socket server URL
const socket = io.connect('http://localhost:3000');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const roomname = urlParams.get('roomname');
console.log(username, roomname);

roomMessage.innerHTML = `Connected to ${roomname}`;

//Showing username and roomname of new user to server
socket.emit('joined-user', {
    username: username,
    roomname: roomname
});

//Sending data on user click
send.addEventListener('click', ()=>{
    socket.emit('chat', {
        username: username,
        message: message.value,
        roomname: roomname
    })
    message.value = '';
});

//Show username of the user that is typing
message.addEventListener('keypress', ()=>{
    socket.emit('typing', {username: username, roomname: roomname})
});

//Show name of the new user that joins
socket.on('joined-user', (data)=>{
    output.innerHTML += '<p>--> <strong><em>' + data.username + ' </strong>has Joined the Room</em></p>';
});

//Showing the message
socket.on('chat', (data)=>{
    output.innerHTML += '<p><strong>' + data.username + '</strong>: ' + data.message + '</p>';
    feedback.innerHTML = '';
    document.querySelector('.chat-message').scrollTop = document.querySelector('.chat-message').scrollHeight;

});

//Show when user is typing something
socket.on('typing', (user)=>{
    feedback.innerHTML = '<p><em>' + user + ' is typing...</em></p>';
})

//Show all online users
socket.on('online-users', (data)=>{
    users.innerHTML = '';
    data.forEach(user => {
        user.innerHTML += `<p>${user}</p>`;
    });
})