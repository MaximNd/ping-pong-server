const AvailableSkill = require('./../models/availableSkill');

module.exports = {
    getAvailableSkillsByUserId(req, res) {
        const { id } = req.params;

        AvailableSkill.find({ userId: id })
            .populate('skill')
            .then(availableSkills => res.send({ availableSkills }))
            .catch(err => console.log(err));
    },

    upgradeSkill(req, res) {
        const { skillId, userId } = req.params;
        AvailableSkill.findOneAndUpdate(
            { userId, skill: skillId },
            { $set: { userId, skill: skillId }, $inc: { currentLevel: 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
        .populate('skill')
        .then(availableSkill => res.send({ availableSkill }))
        .catch(err => console.log(err));
    }
};