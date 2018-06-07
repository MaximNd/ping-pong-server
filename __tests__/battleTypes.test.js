const mongoose = require('mongoose');
const BattleType = require('./../src/models/battleType');
const BattleTypeController = require('./../src/controllers/BattleTypesController');

describe('Battle Type Tests', () => {
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
            await BattleType.remove({});
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    });

    test('Get All BattleTypes', async () => {
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
        await battleTypeClassic.save();
        await battleTypeAdvanced.save();
        let battleTypes = [];
        const req = {};
        const res = {
            send(data) {
                battleTypes = data.battleTypes;
            }
        };
        await BattleTypeController.getAllBattleTypes(req, res);
        expect(battleTypes.length).toBe(2);
        expect(battleTypes[0].name).toBe('classic');
        expect(battleTypes[0].winnerExperience).toBe(100);
        expect(battleTypes[0].loserExperience).toBe(-100);
        expect(battleTypes[0].ballSpeedIncrease).toBe(2);
        expect(battleTypes[0].barriers).toBeUndefined();
        expect(battleTypes[1].name).toBe('advanced');
        expect(battleTypes[1].winnerExperience).toBe(200);
        expect(battleTypes[1].loserExperience).toBe(-200);
        expect(battleTypes[1].ballSpeedIncrease).toBe(5);
        expect(battleTypes[1].barriers).toBe(3);
    }, timeout);
});