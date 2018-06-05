const router = require('express').Router();
const passport = require('passport');
const BattleTypeController = require('./../controllers/BattleTypesController');

router.route('/battle-types')
    .get(isAuth, BattleTypeController.getAllBattleTypes);

module.exports = router;