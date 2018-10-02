/*
Card Route Testing Strategy:

SEED DATA
  - Needs to create a user (1)
  - Needs to create a board(s) (2)
  - Needs to populate boards with cards (4 & 5)

--- Initialize new Test DB ---

1 - Create a new User
  a - Save email, password, and token

2 - Use token to create a new board to store cards for user

3 - Use token to create a new card in the board (POST / C)
  a - should fail if not authenticated
  b - should fail if board doesn't exist
  c - should fail if text is empty/null
  d - should succeed otherwise

4 - Use token to get a list of cards (GET / R)
  a - should fail if not auth'd
  b - should return an array of objects

5 - Use token to get a single card (GET / R)
  a - should fail if not auth'd
  b - should return an object

6 - Use token to mark card as complete (PATCH / U)
  a - should fail if not auth'd
  b - should fail if card doesn't exist
  c - should fail if id is invalid
  d - should patch card.completed to true
  e - should return an object

7 - Use token to delete a card (DELETE / D)
  a - should fail if not auth'd
  b - should fail if card doesn't exist
  c - should fail if id is invalid

--- Tear Down Test DB---
*/

'use strict';
const mongoose = require('mongoose');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const faker = require('faker');
const { app, runServer, closeServer } = require('../server');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/config');
const { User } = require('../models/user');
const { Board } = require('../models/board');
const { Card } = require('../models/card');

chai.use(chaiHttp);

function tearDownDB() {
  console.warn('...Deleting Database...');
  return new Promise((resolve, reject) => {
    mongoose.connection
      .dropDatabase()
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        //console.error(err);
        reject(err);
      });
  });
}
