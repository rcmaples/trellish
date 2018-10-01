/*
card.route.js

Card routes
  will
    - use passport/jwt auth for protecting routes
    - use ObjectID from MongoDB to validate IDs in params

  CRUD methods
    - POST a new card
    - GET one card
    - GET all cards
    - PATCH one card
    - DELETE one card
    - DELETE all cards
*/

'use strict';

const _ = {
  pick: require('lodash.pick'),
  isboolean: require('lodash.isboolean')
};

const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const { ObjectID } = require('mongodb');
const { Card } = require('../models/card');

module.exports = app => {
  //C
  // POST a new card
  app.post('/path', jwtAuth, (req, res) => {
    //do stuff.
  });

  //R
  // GET all cards
  app.get('/path', jwtAuth, (req, res) => {
    // do other stuff
  });
  // GET one Card
  app.get('/path/:id', jwtAuth, (req, res) => {
    // do stuff and things
  });

  //U
  // PATCH one card
  app.patch('/path/:id', jwtAuth, (req, res) => {
    // do things
  });

  //D
  // Delete One Card
  app.delete('/path/:id', jwtAuth, (req, res) => {
    // delete a thing
  });
  /*
  For deleting all cards,
  may be best to run each card in a board
  through the singlur delete route.
  */
};
