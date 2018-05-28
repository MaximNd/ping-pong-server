const User = require('./../models/user');

module.exports = {
    updateUser(req, res) {
        const { user } = req.body;
        User.update({ _id: req.params.id }, { $set: { ...user } })
            .then(data => res.sendStatus(200))
            .catch(err => console.log(err))
    },

    pushBattle(req, res) {
        const { battle } = req.body;
        User.update({ _id: req.params.id }, { $push: { 'account.battles': battle } })
            .then(data => res.sendStatus(200))
            .catch(err => console.log(err))
    }
};