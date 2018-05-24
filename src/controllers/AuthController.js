const User = require('./../models/user');
const jwt = require('jsonwebtoken');

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign({
        sub: user.id
    }, process.env.JWT_SECRET, {
        expiresIn: ONE_WEEK
    });
}

module.exports = {
    async login(req, res) {
        const { user } = req;
        const token = jwtSignUser(user);
        // TODO delete maybe
        // res.append('access-control-allow-headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
        // res.append('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // res.append('access-control-expose-headers', 'Authorization');

        // res.append('authorization', `Bearer ${token}`);
        res.send({
            user
        });
        
    }
}