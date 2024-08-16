const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('User connected:', socket.id);

    socket.on('createRoom', (data) => {
        socket.join(data.room);
        console.log(`User ${socket.id} created room ${data.room}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3001, () => console.log('Socket.io server running on port 3001'));