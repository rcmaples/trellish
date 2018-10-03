const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const faker = require('faker');
const { Board } = require('../models/board');
const { Card } = require('../models/card');
const { seedBoards } = require('./boards.seed');
const { seedUsers } = require('./users.seed');

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
