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

    deleteRoomById(req, res) {
        const id = req.params.id;
        return GameRoom.findByIdAndRemove(id)
            .then(data => res.send(data))
            .catch(err => console.log(err));
        // return GameRoom.deleteOne({ _id: id })
        //     .then(data => res.send({ gameRoomId: id, ...data }))
        //     .catch(err => console.log(err))
    }
};