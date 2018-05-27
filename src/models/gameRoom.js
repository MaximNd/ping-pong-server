const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BattleDataSchema = new Schema({
    battleType: {
        type: ObjectId,
        required: true,
        ref: 'BattleType'
    },
    firstPlayerScore: {
        type: Number,
        required: true
    },
    secondPlayerScore: {
        type: Number,
        required: true
    }
});

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
        required: true,
        ref: 'User'
    },
    isOpen: {
        type: Boolean,
        required: true
    },
    battleData: {
        type: BattleDataSchema,
        required: true
    }
});

module.exports = mongoose.model('GameRoom', GameRoomSchema);