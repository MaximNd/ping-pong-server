const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const GameRoomSchema = new Schema({
    // creator
    firstPlayer: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    // joined player
    secondPlayer: {
        type: ObjectId,
        required: false,
        ref: 'User'
    },
    battleType: {
        type: ObjectId,
        required: true,
        ref: 'BattleType'
    }
});

module.exports = mongoose.model('GameRoom', GameRoomSchema);