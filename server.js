const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');
const messages = [];
let users = [];
app.use(express.static(path.join(__dirname, '/client')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});
const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000);
});
const io = socket(server);

io.on('connection', (socket) => {
    console.log('I\'ve added a listener on message event \n');

    socket.on('user', (user) => {
        users.push({ user: user.author, userId: socket.id })
        console.log('Oh, I\'ve got new user', users)
        socket.broadcast.emit('message', { author: 'Chat Bot', content: user.author + ` has joined the conversation` });
    })
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        const disconnectedUser = users.find((user) => user.userId === socket.id);
        if (disconnectedUser) {
            socket.broadcast.emit('message', { author: 'Chat Bot', content: disconnectedUser.user + ' has left the conversation' });
            console.log('Oh, socket ' + socket.id + ' has left');
        }
    });
});

app.use((req, res) => {
    res.status(404).json({ message: 'not found' });
})