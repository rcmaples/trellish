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
    completed: true
  }
];

function makeToken(user) {
  return jwt.sign({ sub: user._id, expiresIn: JWT_EXPIRY }, JWT_SECRET);
}

const seedUserToken = makeToken(seedUser);

const populateUser = () => {
  const newUser = new User(seedUser).save();
  return Promise.resolve(newUser);
};

const populateBoard = () => {
  const newBoard = new Board(seedBoard).save();
  return Promise.resolve(newBoard);
};

const populateCards = () => {
  const cardOne = new Card(seedCards[0]).save();
  const cardTwo = new Card(seedCards[1]).save();
  return Promise.all([cardOne, cardTwo]);
};

module.exports = {
  populateUser,
  seedUserToken,
  boardId,
  populateBoard,
  populateCards
};
