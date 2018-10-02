/*
Board Route Testing Strategy:

SEED DATA can probably take care of 1 & 5

--- Initialize new Test DB ---

1 - Create a new User
  a - Save email, password, and token

2 - Use token to create a new board for user (POST / C)
  a - Should fail if not authenticated
  b - Should fail if name is null/empty
  c - Board should have an owner of type string
  d - Board should have key `cards` of type array

3 - Use token to get a list of boards for user (GET / R)
  a - Should fail if not authenticated
  b - Should return an array of objects for all boards

4 - Use token to rename board (PATCH / U)
  a - Should fail if not authenticated
  b - Should fail if new name is null/empty
  c - Should update name upon success
  d - Should return the updated board (get one) upon success

5 - Use token to create a list of cards for the board

6 - Use token to delete a board and contents (DELETE, D)
  a - Should fail if not authenticated
  b - Should delete a board if empty
  c - Should delete a board and all contents if not empty


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
