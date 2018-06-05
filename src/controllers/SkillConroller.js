const Skill = require('./../models/skill');

module.exports = {
    getAllSkils(req, res) {
        return Skill.find({})
            .then(skills => {
                res.send({ skills });
            })
            .catch(err => console.log(err));
    }
};