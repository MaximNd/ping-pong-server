const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SkillsDataSchema = new Schema({
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

const AvailableSkillSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    // skills that the player has improved at least once
    skills: {
        type: [SkillsDataSchema],
        required: false,
        default: []
    }
});

module.exports = mongoose.model('AvailableSkills', AvailableSkillSchema);