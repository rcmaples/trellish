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
  //C
  // POST a new board
  app.post('/path/:id', jwtAuth, (req, res)=>{
    //POST a thing
  });

  //R
  // GET one board
  app.get('/path/:id', jwtAuth, (req,res) => {
    // GET a thing
  });
  // GET all boards
  app.get('/path', jwtAuth, (req,res)=>{
    // GET all the things
  });

  //U
  //PATCH one board
  app.patch('/path/:id', jwtAuth, (req, res) => {
    // PATCH a thing
  });

  //D
  //DELETE a board
  app.delete('/path/:id', jwtAuth, (req,res) => {
    // DELETE a thing; may also need to map over
    // a thing's contents and run through card delete
    // route
  });
};
