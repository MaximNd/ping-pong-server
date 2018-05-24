const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// User Schema
const UserSchema = new Schema({
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

const User = module.exports = mongoose.model('User', UserSchema);