const app = require('./src/app');
const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server);

const GameRoomController = require('./src/controllers/GameRoomController');

io.on('connection', socket => {
    socket.on('createGameRoom', gameRoom => {
        socket.broadcast.emit('newGameRoomCreated', gameRoom);
    });

    socket.on('connectToGameRoom', gameRoomId => {
        console.log(gameRoomId);
        GameRoomController.deleteRoomById(gameRoomId)
            .then(() => {
                socket.broadcast.emit('gameRoomDeleted', gameRoomId);
            });
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.listen(app.get('port'), () => console.log(`Server started on port ${app.get('port')}`));