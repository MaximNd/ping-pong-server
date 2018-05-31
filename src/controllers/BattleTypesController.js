const BattleType = require('./../models/battleType');

module.exports = {
    getAllBattleTypes(req, res) {
        BattleType.find({})
            .then(battleTypes => res.send({ battleTypes }))
            .catch(err => console.log(err));
    }
};