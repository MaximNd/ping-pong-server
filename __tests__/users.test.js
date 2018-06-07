const mongoose = require('mongoose');
const User = require('./../src/models/user');
const UserController = require('./../src/controllers/UserController');

describe('Users tests', () => {
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
            await User.remove({});
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    });

    test('Updating User', async () => {
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
        const users = await User.find({});
        expect(users.length).toEqual(1);
        expect(users[0].account.username).toBe('userName_1');
        expect(users[0].account.level).toBe(1);
        expect(users[0].account.experience).toBe(0);
        expect(users[0].account.coins).toBe(0);
        expect(users[0].account.battles).toBeUndefined();
        expect(users[0].account.activeSkills).toBeUndefined();
        expect(users[0].facebook.id).toBe('123142213');
        expect(users[0].facebook.email).toBe('email@mail.com');
        expect(users[0].facebook.name.familyName).toBe('fam_name');
        expect(users[0].facebook.name.givenName).toBe('giv_name');
        expect(users[0].facebook.name.middleName).toBe('mid_name');

        const req = {
            body: {
                user: {
                    account: {
                        username: 'newUserName_1',
                        coins: 10
                    }
                }
            },
            params: {
                id: user.id
            }
        };
        const res = {
            sendStatus(status) {
                return status;
            }
        };
        await UserController.updateUser(req, res);

        const updatedUsers = await User.find({});
        expect(updatedUsers.length).toEqual(1);
        expect(updatedUsers[0].account.username).toBe('newUserName_1');
        expect(updatedUsers[0].account.level).toBe(1);
        expect(updatedUsers[0].account.experience).toBe(0);
        expect(updatedUsers[0].account.coins).toBe(10);
        expect(updatedUsers[0].account.battles).toBeUndefined();
        expect(updatedUsers[0].account.activeSkills).toBeUndefined();
        expect(updatedUsers[0].facebook.id).toBe('123142213');
        expect(updatedUsers[0].facebook.email).toBe('email@mail.com');
        expect(updatedUsers[0].facebook.name.familyName).toBe('fam_name');
        expect(updatedUsers[0].facebook.name.givenName).toBe('giv_name');
        expect(updatedUsers[0].facebook.name.middleName).toBe('mid_name');
    }, timeout);

    test('Fetching User Battles', async () => {
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
        let battles;
        const req = {
            params: {
                id: user.id
            }
        };
        const res = {
            send(result) {
                battles = result.battles;
            }
        };

        await UserController.userBattles(req, res);

        expect(battles.length).toBe(0);
        user.account.battles = [{
            enemy: user.id,
            score: {
                selfScore: 11,
                enemyScore: 9
            },
            battleType: 'classic',
            experience: 1000
        }];
        await user.save();

        await UserController.userBattles(req, res);
        expect(battles.length).toBe(1);
        expect(battles[0].enemy.id).toBe(user.id);
        expect(battles[0].score.selfScore).toBe(11);
        expect(battles[0].score.enemyScore).toBe(9);
        expect(battles[0].battleType).toBe('classic');
        expect(battles[0].experience).toBe(1000);
    }, timeout);

    test('Push new battle', async () => {
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
        let battles;
        const req = {
            body: {
                battle: {
                    enemy: user.id,
                    score: {
                        selfScore: 11,
                        enemyScore: 9
                    },
                    battleType: 'classic',
                    experience: 1000
                }
            },
            params: {
                id: user.id
            }
        };
        const res = {
            sendStatus() {},
            send(result) {
                battles = result.battles;
            }
        };

        await UserController.pushBattle(req, res);
        await UserController.userBattles(req, res);
        
        expect(battles.length).toBe(1);
        expect(battles[0].enemy.id).toBe(user.id);
        expect(battles[0].score.selfScore).toBe(11);
        expect(battles[0].score.enemyScore).toBe(9);
        expect(battles[0].battleType).toBe('classic');
        expect(battles[0].experience).toBe(1000);
        req.body.battle.battleType = 'advanced';
        req.body.battle.experience = 2000;
        req.body.battle.score = {
            selfScore: 22,
            enemyScore: 20
        }
        await UserController.pushBattle(req, res);
        await UserController.userBattles(req, res);
        
        expect(battles.length).toBe(2);
        expect(battles[0].enemy.id).toBe(user.id);
        expect(battles[0].score.selfScore).toBe(11);
        expect(battles[0].score.enemyScore).toBe(9);
        expect(battles[0].battleType).toBe('classic');
        expect(battles[0].experience).toBe(1000);

        expect(battles[1].enemy.id).toBe(user.id);
        expect(battles[1].score.selfScore).toBe(22);
        expect(battles[1].score.enemyScore).toBe(20);
        expect(battles[1].battleType).toBe('advanced');
        expect(battles[1].experience).toBe(2000);
    }, timeout);
});