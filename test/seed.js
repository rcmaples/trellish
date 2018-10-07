const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const faker = require('faker');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/config');
const { User } = require('../models/user');
const { Board } = require('../models/board');
const { Card } = require('../models/card');

/*
Seed Data
  Users have an
    email
    password
    name

  boards have an
    owner (object ID from user)
    array of cards (object IDs fromc cards)
    name

  cards have an
    owner (Mongo ID)
    text
    board (Mongo ObjectID())
    completeded (boolean)
 */

const userId = new ObjectID();
const boardId = new ObjectID();

const seedUser = {
  _id: userId,
  email: faker.internet.email(),
  password: 'password123',
  name: `${faker.name.firstName()} ${faker.name.lastName()}`
};

const seedBoard = {
  _id: boardId,
  owner: seedUser._id,
  name: 'seed board',
  cards: []
};

const seedCards = [
  {
    _id: new ObjectID(),
    owner: seedUser._id,
    board: seedBoard._id,
    text: faker.random.words(),
    completed: false
  },
  {
    _id: new ObjectID(),
    owner: seedUser._id,
    board: seedBoard._id,
    text: faker.random.words(),
    completed: false
  },
  {
    _id: new ObjectID(),
    owner: seedUser._id,
    board: seedBoard._id,
    text: faker.random.words(),
    completed: true
  },
  {
    _id: new ObjectID(),
    owner: seedUser._id,
    board: seedBoard._id,
    text: faker.random.words(),
    completed: false
  },
  {
    _id: new ObjectID(),
    owner: seedUser._id,
    board: seedBoard._id,
    text: faker.random.words(),
    completed: true
  }
];

function generateToken(user) {
  return jwt.sign(
    { sub: user.id, expiresIn: config.JWT_EXPIRY },
    config.JWT_SECRET
  );
}

const seedUserToken = generateToken(seedUser);

const populateUser = done => {
  console.info('Generating and seeding User data...');
  User.remove({})
    .then(() => {
      return User.insertOne(seedUser);
    })
    .then(() => done());
};

const populateBoard = done => {
  console.info('Generating and seeding Board data...');
  Board.remove({})
    .then(() => {
      return Board.insertOne(seedBoard);
    })
    .then(() => done());
};

const populateCards = done => {
  console.info('Generating and seeding Card data...');
  Card.remove({})
    .then(() => {
      return Card.insertMany(seedCards);
    })
    .then(() => done());
};

module.exports = { populateUser, seedUserToken, populateBoard, populateCards };
