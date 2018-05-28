module.exports = {
    isAuthenticated(req, res, next) {
        passport.authenticate('jwt', (err, user) => {
            if (err || !user) {
                res.status(403).send({
                    error: 'you do not have access to this resource'
                });
            } else {
                req.user = user;
                next();
            }
        })(req, res, next);
    }
};