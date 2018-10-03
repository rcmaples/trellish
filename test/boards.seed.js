const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const faker = require('faker');
const { Board } = require('../models/board');
const { Card } = require('../models/card');

// Create a user
// generate token for user
// create a board for user
// return board ID to test
// return token to test

function seedBoards() {
  // seed boards
}

module.exports = { seedBoards };
