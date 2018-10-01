/*
strategies.js
   - will use passportjs for auth
   - will import user model
   - will import config for jwt options
*/

'use strict';

const passport = require('passport');
const { User } = require('../models/user');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { JWT_SECRET } = require('../config/config');

const localOptions = { usernameField: 'email' };
const localStrategy = new LocalStrategy(
  localOptions,
  (email, password, done) => {
    User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }
);

const jwtOptions = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Berarer'),
  algorithms: ['HS256']
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  done(null, payload.user);
});

passport.use(localStrategy);
passport.use(jwtStrategy);
module.exports = { localStrategy, jwtStrategy };
