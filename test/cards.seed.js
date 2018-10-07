const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const faker = require('faker');
const { Board } = require('../models/board');
const { Card } = require('../models/card');
const { seedBoards } = require('./boards.seed');
const { seedUsers } = require('./users.seed');

const config = require('../config/config');

function generateToken(user) {
  return jwt.sign(
    { sub: user.id, expiresIn: config.JWT_EXPIRY },
    config.JWT_SECRET
  );
}

// Create a user
// generate token for user
// create a board for user
// create cards for user

// return board ID to test
// return token to test

function seedCards() {
  // seed cards
}

module.exports = { seedCards };
