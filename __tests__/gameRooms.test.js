const mongoose = require('mongoose');
const User = require('./../src/models/user');
const BattleType = require('./../src/models/battleType');
const GameRoom = require('./../src/models/gameRoom');
const GameRoomController = require('./../src/controllers/GameRoomController');

describe('Game Rooms Tests', () => {
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
                User.remove({}),
                BattleType.remove({}),
                GameRoom.remove({})
            ]);
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    });

    test('Create Game Room', async () => {
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
        const battleTypeClassic = new BattleType({
            name: 'classic',
            winnerExperience: 100,
            loserExperience: -100,
            ballSpeedIncrease: 2
        });
        const battleTypeAdvanced = new BattleType({
            name: 'advanced',
            winnerExperience: 200,
            loserExperience: -200,
            ballSpeedIncrease: 5,
            barriers: 3
        });

        await Promise.all([
            user.save(),
            battleTypeClassic.save(),
            battleTypeAdvanced.save()
        ]);
        let gameRoom = {};
        const req = {
            user,
            body: {
                battleTypeId: battleTypeClassic.id
            }
        };
        const res = {
            send(data) {
                gameRoom = data.gameRoom;
            }
        };
        await GameRoomController.createRoom(req, res);
        expect(gameRoom.firstPlayer.id.toString()).toBe(user.id.toString());
        expect(gameRoom.battleType.id.toString()).toBe(battleTypeClassic.id.toString());

        req.body.battleTypeId = battleTypeAdvanced.id;

        await GameRoomController.createRoom(req, res);
        expect(gameRoom.firstPlayer.id.toString()).toBe(user.id.toString());
        expect(gameRoom.battleType.id.toString()).toBe(battleTypeAdvanced.id.toString());
    }, timeout);

    test('Fetch Game Rooms', async () => {
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
        const battleTypeClassic = new BattleType({
            name: 'classic',
            winnerExperience: 100,
            loserExperience: -100,
            ballSpeedIncrease: 2
        });
        const battleTypeAdvanced = new BattleType({
            name: 'advanced',
            winnerExperience: 200,
            loserExperience: -200,
            ballSpeedIncrease: 5,
            barriers: 3
        });

        await Promise.all([
            user.save(),
            battleTypeClassic.save(),
            battleTypeAdvanced.save()
        ]);
        const req = {
            user,
            body: {
                battleTypeId: battleTypeClassic.id
            }
        };
        const res = {
            send() {}
        };
        await GameRoomController.createRoom(req, res);
        req.body.battleTypeId = battleTypeAdvanced.id;
        await GameRoomController.createRoom(req, res);
        await GameRoomController.createRoom(req, res);

        let gameRooms = []
        res.send = (data) => {
            gameRooms = data.gameRooms;
        };

        await GameRoomController.getAllGameRooms(req, res);
        expect(gameRooms.length).toBe(3);
        expect(gameRooms[0].firstPlayer.id.toString()).toBe(user.id.toString());
        expect(gameRooms[0].battleType.id.toString()).toBe(battleTypeClassic.id.toString());
        expect(gameRooms[1].firstPlayer.id.toString()).toBe(user.id.toString());
        expect(gameRooms[1].battleType.id.toString()).toBe(battleTypeAdvanced.id.toString());
        expect(gameRooms[2].firstPlayer.id.toString()).toBe(user.id.toString());
        expect(gameRooms[2].battleType.id.toString()).toBe(battleTypeAdvanced.id.toString());
    }, timeout);

    test('Delete Game Rooms', async () => {
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
        const battleTypeClassic = new BattleType({
            name: 'classic',
            winnerExperience: 100,
            loserExperience: -100,
            ballSpeedIncrease: 2
        });
        const battleTypeAdvanced = new BattleType({
            name: 'advanced',
            winnerExperience: 200,
            loserExperience: -200,
            ballSpeedIncrease: 5,
            barriers: 3
        });

        await Promise.all([
            user.save(),
            battleTypeClassic.save(),
            battleTypeAdvanced.save()
        ]);
        let req = {
            user,
            body: {
                battleTypeId: battleTypeClassic.id
            }
        };
        let res = {
            send() {}
        };
        await GameRoomController.createRoom(req, res);
        req.body.battleTypeId = battleTypeAdvanced.id;
        await GameRoomController.createRoom(req, res);
        await GameRoomController.createRoom(req, res);
        let gameRooms = [];
        res.send = data => {
            gameRooms = data.gameRooms;
        };
        await GameRoomController.getAllGameRooms(req, res);
        expect(gameRooms.length).toBe(3);
        req = {
            params: {
                id: gameRooms[1].id
            }
        };
        await GameRoomController.deleteRoomById(req, res);
        await GameRoomController.getAllGameRooms(req, res);
        expect(gameRooms.length).toBe(2);
        expect(gameRooms[0].firstPlayer.id.toString()).toBe(user.id.toString());
        expect(gameRooms[0].battleType.id.toString()).toBe(battleTypeClassic.id.toString());
        expect(gameRooms[1].firstPlayer.id.toString()).toBe(user.id.toString());
        expect(gameRooms[1].battleType.id.toString()).toBe(battleTypeAdvanced.id.toString());
    }, timeout);
});