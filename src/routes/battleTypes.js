const router = require('express').Router();
const BattleTypeController = require('./../controllers/BattleTypesController');
const isAuth = require('./../middlewares/middlewares').isAuthenticated;

router.route('/battle-types')
    .get(BattleTypeController.getAllBattleTypes);

module.exports = router;