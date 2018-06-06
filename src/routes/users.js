const router = require('express').Router();
const passport = require('passport');
const UserController = require('./../controllers/UserController');
const isAuth = require('./../middlewares/middlewares').isAuthenticated;

// id - user id for update, request body contains updated user
router.route('/users/:id')
    .put(isAuth, UserController.updateUser);

// get all battles by user id
router.route('/users/:id/battles')
    .get(isAuth, UserController.userBattles);

// id - user id for battles update, request body contains new battle
router.route('/users/:id/battles')
    .put(isAuth, UserController.pushBattle);

module.exports = router;