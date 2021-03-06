const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// skill that the player has improved at least once
const AvailableSkillSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    skill: {
        type: ObjectId,
        required: true,
        ref: 'Skill'
    },
    currentLevel: {
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model('AvailableSkill', AvailableSkillSchema, 'availableskills', process.env.NODE_ENV === 'test');