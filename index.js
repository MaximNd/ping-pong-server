const app = require('./src/app');
const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
    socket.on('createGameRoom', gameRoom => {
        socket.emit('newGameRoomCreated', gameRoom);
    });

    socket.on('connectToGameRoom', gameRoomId => {
        socket.emit('connectedToGameRoom', gameRoomId);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.listen(app.get('port'), () => console.log(`Server started on port ${app.get('port')}`));