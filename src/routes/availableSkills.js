const router = require('express').Router();
const AvailableSkillsController = require('./../controllers/AvailableSkillController');
const isAuth = require('./../middlewares/middlewares').isAuthenticated;

// get all available skills by user ID
router.route('/available-skills/:id')
    .get(isAuth, AvailableSkillsController.getAvailableSkillsByUserId);

// upgrade skill by 1 level.
router.route('/available-skills/upgrade/:skillId/:userId')
    .put(isAuth, AvailableSkillsController.upgradeSkill);

module.exports = router;