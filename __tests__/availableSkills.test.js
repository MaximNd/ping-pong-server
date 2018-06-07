const mongoose = require('mongoose');
const AvailableSkill = require('./../src/models/availableSkill');
const User = require('./../src/models/user');
const Skill = require('./../src/models/skill');
const AvailableSkillController = require('./../src/controllers/AvailableSkillController');

describe('Available Skills Tests', () => {
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
            await Promise.all([
                AvailableSkill.remove({}),
                Skill.remove({}),
                User.remove({})
            ]);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    });
    
    test('Get User Available Skills', async () => {
        const userId = '507f1f77bcf86cd799439011';
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

        const availableSkill_1 = new AvailableSkill({
            userId,
            skill: skill1._id,
            currentLevel: 1
        });
        const availableSkill_2 = new AvailableSkill({
            userId,
            skill: skill2._id,
            currentLevel: 2
        });
        const availableSkill_3 = new AvailableSkill({
            userId,
            skill: skill3._id,
            currentLevel: 3
        });

        await Promise.all([
            availableSkill_1.save(),
            availableSkill_2.save(),
            availableSkill_3.save(),
        ]);
        let allAvailableSkills = [];
        const req = {
            params: {
                id: userId
            }
        };
        const res = {
            send({ availableSkills }) {
                allAvailableSkills = availableSkills;
            }
        };
        await AvailableSkillController.getAvailableSkillsByUserId(req, res);
        
        allAvailableSkills = allAvailableSkills
            .map(availableSkill => ({
                userId: availableSkill.userId.toString(),
                skill: availableSkill.skill.id.toString(),
                currentLevel: availableSkill.currentLevel
            }));
        
        expect(allAvailableSkills.length).toBe(3);
        expect(allAvailableSkills[0].userId.toString()).toBe(userId);
        expect(allAvailableSkills[1].userId.toString()).toBe(userId);
        expect(allAvailableSkills[2].userId.toString()).toBe(userId);
        expect(allAvailableSkills).toContainEqual({
            userId,
            skill: skill1.id.toString(),
            currentLevel: 1
        });
        expect(allAvailableSkills).toContainEqual({
            userId,
            skill: skill2.id.toString(),
            currentLevel: 2
        });
        expect(allAvailableSkills).toContainEqual({
            userId,
            skill: skill3.id.toString(),
            currentLevel: 3
        });
    }, timeout);

    test('Upgrade Skill', async () => {
        const user = new User({
            account: {
                username: 'userName_1',
                level: 1,
                experience: 0,
                coins: 0,
                battles: [],
                activeSkills: []
            },
            facebook: {
                id: '123142213',
                email: 'email@mail.com',
                name: {
                    familyName: 'fam_name',
                    givenName: 'giv_name',
                    middleName: 'mid_name'
                }
            }
        });
        await user.save();
        const skill = new Skill({
            name: 'skill_1',
            description: 'skill_1 description',
            requiredLevel: 5,
            upgrades: []
        });
        await skill.save();

        let userAvailableSkill = {};
        const req = {
            params: {
                skillId: skill.id,
                userId: user.id
            }
        };
        const res = {
            send({ availableSkill }) {
                userAvailableSkill = availableSkill;
            }
        };
        await AvailableSkillController.upgradeSkill(req, res);

        expect(userAvailableSkill.currentLevel).toBe(1);
        expect(userAvailableSkill.skill.id.toString()).toBe(skill.id.toString());
        expect(userAvailableSkill.userId.toString()).toBe(user.id.toString());
        
        await AvailableSkillController.upgradeSkill(req, res);
        
        expect(userAvailableSkill.currentLevel).toBe(2);
        expect(userAvailableSkill.skill.id.toString()).toBe(skill.id.toString());
        expect(userAvailableSkill.userId.toString()).toBe(user.id.toString());

        await AvailableSkillController.upgradeSkill(req, res);
        
        expect(userAvailableSkill.currentLevel).toBe(3);
        expect(userAvailableSkill.skill.id.toString()).toBe(skill.id.toString());
        expect(userAvailableSkill.userId.toString()).toBe(user.id.toString());

        await AvailableSkillController.upgradeSkill(req, res);
        
        expect(userAvailableSkill.currentLevel).toBe(4);
        expect(userAvailableSkill.skill.id.toString()).toBe(skill.id.toString());
        expect(userAvailableSkill.userId.toString()).toBe(user.id.toString());
    }, timeout);
});