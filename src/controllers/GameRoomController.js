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
        try {
            const gameRoom = new GameRoom({
                firstPlayer: req.body.firstPlayerId,
                battleType: req.body.battleTypeId
            });
    
            await gameRoom.save();
            const gameRoom = await GameRoom.populate(gameRoom, { path: 'firstPlayer battleType' });
            res.send({ gameRoom });
        } catch (err) {
            console.log(err);
        }
    },

    deleteRoomById(req, res) {
        const id = req.params.id;
        GameRoom.deleteOne({ _id: id })
            .then(data => res.send({ gameRoomId: id, ...data }))
            .catch(err => console.log(err))
    }
};