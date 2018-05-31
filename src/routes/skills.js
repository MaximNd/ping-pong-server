const router = require('express').Router();
const passport = require('passport');
const SkillsController = require('./../controllers/SkillConroller');

router.route('/skills')
    .get(SkillsController.getAllSkils);

module.exports = router;