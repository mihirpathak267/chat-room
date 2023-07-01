const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index');
});

app.route('/room')
.get((req, res)=>{
    res.render('room')
})
.post((req, res)=>{
    username = req.body.username;
    roomname = req.body.roomname;
    res.redirect(`/room?username=${username}&roomname=${roomname}`);
})

const server = app.listen(3000, ()=>{
    console.log('Server is listening on port 3000')
});

const io = socket(server);
require('./utils/socket')(io);
