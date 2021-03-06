const router = require('express').Router();
const passport = require('passport');
const AuthController = require('./../controllers/AuthController');

router.route('/oauth/facebook')
    .post(passport.authenticate('facebook-token', { session: false }), AuthController.login);

router.route('/oauth/user')
    .get(passport.authenticate('jwt', { session: false }), AuthController.login)

module.exports = router;