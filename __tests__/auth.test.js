const mongoose = require('mongoose');
const AuthController = require('./../src/controllers/AuthController');
const jwt = require('jsonwebtoken');

describe('Auth tests', () => {
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

    test('Login test', async () => {
        const headers = {};
        const data = {};
        const req = {
            user: {
                id: '0123456789',
                fakeData: 'fakeData'
            }
        };
        const res = {
            append(key, value) {
                headers[key] = value;
            },
            send(result) {
                data.result = result;
            }
        };
        process.env.JWT_SECRET = 'secret-for-tests';
        await AuthController.login(req, res);
        const parsedJWT = jwt.decode(data.result.access_token);
        expect(headers).toEqual({
            'access-control-allow-headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'access-control-expose-headers': 'Authorization',
            'authorization': `Bearer ${data.result.access_token}`
        });
        expect(data.result.user).toEqual(req.user);
        const d = new Date();
        const seconds = Math.round(d.getTime() / 1000) + 60 * 60 * 24 * 7;
        expect(parsedJWT.sub).toBe('0123456789');
        expect([seconds - 1, seconds, seconds + 1]).toContain(parsedJWT.exp);

    }, timeout);
});