const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
const { JWT_SECRET, JWT_EXPIRY } = require('../config/config');
const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const faker = require('faker');
const { Board } = require('../models/board');
const { Card } = require('../models/card');
const { seedUsers, createFakeUser } = require('./users.seed');

// function generateToken(user) {
//   return jwt.sign({ sub: user.id, expiresIn: JWT_EXPIRY }, JWT_SECRET);
// }

// Create a user
const user = seedUsers();
console.log(user);

// generate token for user
// create a board for user
// return board ID to test
// return token to test

function seedBoards() {
  // seed boards
}

module.exports = { seedBoards };
