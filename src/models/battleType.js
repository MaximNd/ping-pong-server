const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BattleTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['classic', 'advanced']
    },
    winnerExperience: {
        type: Number,
        required: true
    },
    loserExperience: {
        type: Number,
        required: true
    },
    ballSpeedIncrease: {
        type: Number,
        required: true
    },
    barriers: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('BattleType', BattleTypeSchema, 'battletypes', process.env.NODE_ENV === 'test');