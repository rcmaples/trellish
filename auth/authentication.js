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
    { sub: user.id, expiresIn: config.JWT_EXPIRY },
    config.JWT_SECRET
  );
}

// sign in
exports.signin = function(req, res, next) {
  res.json({ token: generateToken(req.user) });
};

// sign up
exports.signup = function(req, res, next) {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'You must provide a username and password.'
    });
  }

  // See if user already exists
  // If it doesn't make one.

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    } else if (existingUser) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Email address is already in use.'
      });
    } else {
      const user = new User({
        email: email,
        password: password,
        name: name
      });
      user.save(function(err) {
        return next(err);
      });
      res.json({ token: generateToken(user) });
    }
  });
};
