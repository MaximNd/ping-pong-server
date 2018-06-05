const User = require('./../models/user');

module.exports = {
    updateUser(req, res) {
        const { user } = req.body;
        return User.update({ _id: req.params.id }, { $set: user })
            .then(data => res.sendStatus(200))
            .catch(err => console.log(err))
    },

    userBattles(req, res) {
        const { id } = req.params;
        return User.findById(id)
            .select('account.battles')
            .populate({ path: 'account.battles.enemy', select: '-facebook' })
            .then(data => res.send({ battles: data.account.battles }))
            .catch(err => console.log(err));
    },

    pushBattle(req, res) {
        const { battle } = req.body;
        return User.update({ _id: req.params.id }, { $push: { 'account.battles': battle } })
            .then(data => res.sendStatus(200))
            .catch(err => console.log(err))
    }
};