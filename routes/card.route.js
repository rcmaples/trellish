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
const { Card } = require('./models/card');

module.exports = app => {
  //C
  //R
  //U
  //D
};
