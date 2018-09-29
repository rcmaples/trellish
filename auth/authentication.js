/*
authentication.js
  - uses jswonwebtoken to generate tokens
  - will import user models
  - will import config
*/

'use strict';

const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const config = require('../config/config');

function generateToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      expiresIn: config.JWT_EXPIRY
    },
    config.JWT_SECRET
  );
}

// sign in
exports.signin = function(req, res, next) {
  // User should already be authenticated by now
  res.json({ token: generateToken(req.user) });
};

// sign up
exports.signup = function(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'You must provide a username and password.'
    });
  }

  // See if user already exists
  // If it doesn't make one.

  User.findOne({ username: username }, function(err, existingUser) {
    if (err) {
      return next(err);
    } else if (existingUser) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Username is already in use.'
      });
    } else {
      const user = new User({
        name: req.name,
        email: req.email,
        username: req.username,
        password: req.password
      });
      user.save(err => {
        return next(err);
      });
      res.json({ token: generateToken(user) });
    }
  });
};
