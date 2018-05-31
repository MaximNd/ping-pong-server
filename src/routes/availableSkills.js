const router = require('express').Router();
const passport = require('passport');
const AvailableSkillsController = require('./../controllers/AvailableSkillController');
const AvailableSkill = require('./../models/availableSkill');

// get all available skills by user ID
router.route('/available-skills/:id')
    .get(AvailableSkillsController.getAvailableSkillsByUserId);

// upgrade skill by 1 level.
router.route('/available-skills/upgrade/:skillId/:userId')
    .put(AvailableSkillsController.upgradeSkill);

module.exports = router;