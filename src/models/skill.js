const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SkillUpgradeSchema = new Schema({
    // upgade to this level
    skillLevel: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    // TODO data on improving skills
});

const SkillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requiredLevel: {
        type: Number,
        required: true
    },
    upgrades: {
        type: [SkillUpgradeSchema],
        required: true
    },
    // TODO skill actions and data
});

module.exports = mongoose.model('Skill', SkillSchema);