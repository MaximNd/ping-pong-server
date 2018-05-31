const router = require('express').Router();
const passport = require('passport');
const UserController = require('./../controllers/UserController');
const isAuthenticated = require('./../middlewares/middlewares').isAuthenticated;

// id - user id for update, request body contains updated user
router.route('/users/:id')
    .put(UserController.updateUser);

// get all battles by user id
router.route('/users/:id/battles')
    .get(UserController.userBattles);

// id - user id for battles update, request body contains new battle
router.route('/users/:id/battles')
    .put(UserController.pushBattle);

module.exports = router;