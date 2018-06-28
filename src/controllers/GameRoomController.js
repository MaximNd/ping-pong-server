const GameRoom = require('./../models/gameRoom');

module.exports = {
    getAllGameRooms(req, res) {
        return GameRoom.find({})
            .populate('firstPlayer')
            .populate('battleType')
            .then(gameRooms => res.send({ gameRooms }))
            .catch(err => console.log(err))
    },

    async createRoom(req, res) {
        try {
            const gameRoom = new GameRoom({
                firstPlayer: req.user.id,
                battleType: req.body.battleTypeId
            });
    
            await gameRoom.save();
            const populatedGameRoom = await GameRoom.populate(gameRoom, { path: 'firstPlayer battleType' });
            res.send({ gameRoom: populatedGameRoom });
        } catch (err) {
            console.log(err);
        }
    },

    async deleteRoomById(req, res) {
        try {
            const id = req.params.id;
            const gameRoom = await GameRoom.findById(id).populate('battleType');
            await gameRoom.remove();
            res.send(gameRoom);
        } catch (err) {
            console.log(err);
        }
    }
};