const mongoose = require('mongoose');
const Skill = require('./../src/models/skill');
const SkillController = require('./../src/controllers/SkillConroller');

describe('Skills tests', () => {
    const timeout = 10000;

    beforeAll(async () => {
        try {
            await mongoose.connect(global.__MONGO_URI__, {
                promiseLibrary: Promise,
                autoReconnect: true,
                reconnectTries: 10,
                reconnectInterval: 100
            });
        } catch (err) {
            console.log(`Database connection error: ${err}`);
        }
    });

    afterAll(async () => {
        try {
            await mongoose.disconnect();
        } catch (err) {
            console.log(`Database disconnection error: ${err}`);
        }
    });

    afterEach(async () => {
        try {
            await Skill.remove({});
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    });

    test('Fetch all skills', async () => {
        const skill1 = new Skill({
            name: 'skill_1',
            description: 'skill_1 description',
            requiredLevel: 5,
            upgrades: []
        });
        const skill2 = new Skill({
            name: 'skill_2',
            description: 'skill_2 description',
            requiredLevel: 10,
            upgrades: []
        });
        const skill3 = new Skill({
            name: 'skill_3',
            description: 'skill_3 description',
            requiredLevel: 15,
            upgrades: []
        });
        await Promise.all([
            skill1.save(),
            skill2.save(),
            skill3.save(),
        ]);
        let allSkills = [];
        const req = {};
        const res = {
            send({ skills }) {
                allSkills = skills;
            }
        };
        await SkillController.getAllSkils(req, res);
        allSkills = allSkills.map(skill => ({description: skill.description, name: skill.name, requiredLevel: skill.requiredLevel }))
        expect(allSkills.length).toBe(3);
        expect(allSkills).toContainEqual({
            name: 'skill_1',
            description: 'skill_1 description',
            requiredLevel: 5
        });
        expect(allSkills).toContainEqual({
            name: 'skill_2',
            description: 'skill_2 description',
            requiredLevel: 10
        });
        expect(allSkills).toContainEqual({
            name: 'skill_3',
            description: 'skill_3 description',
            requiredLevel: 15
        });
    }, timeout);
});