const GameRoom = require('./../models/gameRoom');

module.exports = {
    getAllGameRooms(req, res) {
        GameRoom.find({})
            .populate('firstPlayer')
            .populate('battleType')
            .then(gameRooms => res.send({ gameRooms }))
            .catch(err => console.log(err))
    },

    async createRoom(req, res) {
        const gameRoom = new GameRoom({
            firstPlayer: req.body.firstPlayerId,
            battleType: req.body.battleTypeId
        });

        await gameRoom.save();

        res.send({ gameRoom });
    },

    deleteRoomById(req, res) {
        GameRoom.deleteOne({ _id: req.params.id })
            .then(data => res.send(data))
            .catch(err => console.log(err))
    }
};