/*
board.route.js

Boar routes
  will
    - use passport/jwt auth for protecting routes
    - use ObjectID from MongoDB to validate IDs in params

  CRUD methods
    - POST a new board
    - GET one board
    - GET all boards
    - PATCH one board
    - DELETE one board
*/

'use strict';

const _ = {
  pick: require('lodash.pick'),
  isboolean: require('lodash.isboolean')
};

const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const { ObjectID } = require('mongodb');
const { Board } = require('../models/board');

module.exports = app => {
  //Create a board
  //Read a board / all boards
  //Update a board
  //Delet a board
};
