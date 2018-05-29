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
        required: true
    }
});

module.exports = mongoose.model('AvailableSkill', AvailableSkillSchema);