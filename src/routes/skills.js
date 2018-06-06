const router = require('express').Router();
const passport = require('passport');
const SkillsController = require('./../controllers/SkillConroller');
const isAuth = require('./../middlewares/middlewares').isAuthenticated;

router.route('/skills')
    .get(isAuth, SkillsController.getAllSkils);

module.exports = router;