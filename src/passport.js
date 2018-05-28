const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require('./models/user');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');


// JWT STRATEGY
const jwtStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (jwtPayload, next) => {
    try {
        const user = await User.findById(jwtPayload.sub);

        if(!user) {
            return next(null, false);
        }

        return next(null, user);
    } catch (error) {
        next(error, false);
    }
});

const facebookStrategy = new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, next) => {
    try {
        const user = await User.findOne({ 'facebook.id': profile.id });
        if (user) {
            return next(null, user);
        }

        const email = profile.emails[0].value === '' ? 'testemail@gmail.com' : profile.emails[0].value

        const newUser = new User({
            account: {
                username: email.split('@')[0]
            },
            facebook: {
                id: profile.id,
                email
            }
        });
        await newUser.save();

        return next(null, newUser);
    } catch (error) {
        next(error, false, error.message);
    }
});

passport.use(jwtStrategy);
passport.use(facebookStrategy);

module.exports = passport;