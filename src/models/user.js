const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BattleScoreSchema = new Schema({
    selfScore: {
        type: Number,
        required: true
    },
    enemyScore: {
        type: Number,
        required: true
    }
});

const BattleSchema = new Schema({
    enemy: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    score: {
        type: BattleScoreSchema,
        required: true
    },
    battleType: {
        type: String,
        required: true,
        enum: ['classic', 'advanced']
    },
    // obtained experience (can be negative)
    experience: {
        type: Number,
        required: true
    }
});

const ActiveSkillSchema = new Schema({
    // button name
    slot: {
        type: Number,
        required: true,
        enum: ['q', 'w', 'e', 'r']
    },
    // ref from available skills
    skillData: {
        type: ObjectId,
        required: true,
        ref: 'AvailableSkills'
    }
});

const AccountSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    experience: {
        type: Number,
        required: true,
        default: 0
    },
    // current coins
    coins: {
        type: Number,
        required: true,
        default: 0
    },
    // all user battles
    battles: {
        type: [BattleSchema],
        required: false,
        default: [],
        select: false
    },
    // skills that the player chose for battles
    activeSkills: {
        type: [ActiveSkillSchema],
        required: false,
        default: [],
        select: false
    }
});

// User Schema
const UserSchema = new Schema({
    account: {
        type: AccountSchema,
        required: false
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            required: true
        }
    }
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = mongoose.model('User', UserSchema);