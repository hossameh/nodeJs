const jwtstrategy = require('passport-jwt').Strategy;
const extractjwt = require('passport-jwt').ExtractJwt;
const user = require('../db/users');

module.exports = function (passport) {

    var opts = {
        jwtFromRequest: extractjwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    };
    

    passport.use(new jwtstrategy(opts, (jwt_payload, done) => {
        user.findById(jwt_payload.user._id, (err, _user) => {
            if (err)
                return done(err, null);
            if (_user)
                return done(null, _user);
        });
    }));
}