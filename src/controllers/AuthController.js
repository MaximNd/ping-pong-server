const jwt = require('jsonwebtoken');

function jwtSignUser(jwt, JWTsecret, expiresIn, user) {
    return jwt.sign({
        sub: user.id
    }, JWTsecret, {
        expiresIn
    });
}

module.exports = {
    async login(req, res) {
        const { user } = req;
        const ONE_WEEK = 60 * 60 * 24 * 7;
        const access_token = jwtSignUser(jwt, process.env.JWT_SECRET, ONE_WEEK, user);

        res.append('access-control-allow-headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
        res.append('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.append('access-control-expose-headers', 'Authorization');

        res.append('authorization', `Bearer ${access_token}`);
        res.send({
            user,
            access_token
        });
        
    }
}