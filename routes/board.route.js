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
  app.post('/boards/create', jwtAuth, (req, res) => {
    Board.create({
      name: req.body.name,
      owner: req.user.id,
      cards: []
    })
      .then(board => res.status(201).json(board))
      .catch(err => {
        res.status(500).send(err);
      });
  });

  //R
  // GET one board
  app.get('/boards/:id', jwtAuth, (req, res) => {
    const id = req.params.id;

    // Is the ID valid?
    if (!ObjectID.isValid(id)) {
      return res.status(400).send('Invalid ID');
    }

    Board.findById(id)
      .then(board => {
        // If the ID is valid, but doesn't exist
        if (!board) {
          return res.status(404).send('Board ID Not Found');
        }

        // Does user have access to the board?
        if (board.owner !== req.user.id) {
          return res.status(400).send('Invalid ID for user.');
        }
        // otherwise, send the board object.
        res.status(200).send({ board });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  // GET all boards
  app.get('/boards', jwtAuth, (req, res) => {
    Board.find({ owner: req.user.id })
      .populate('card')
      .then(boards => {
        res.status(200).send({ boards });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  //U
  //PATCH one board
  app.patch('/boards/update/:id', jwtAuth, (req, res) => {
    const boardID = req.params.id;
    const userID = req.user.id;
    const name = _.pick(req.body, ['name']);

    // Is the board ID Valid?
    if (!ObjectID.isValid(boardID)) {
      return res.status(400).send('Invalid Board ID');
    }

    // Find the board
    Board.findById(boardID)
      .then(board => {
        // Is the requester the board owner?
        if (board.owner !== userID) {
          return res.status(401).send('Unauthorized.');
        }

        // Actually patch the board name
        Board.findByIdAndUpdate(boardID, { $set: name }, { new: true })
          .then(board => {
            if (!board) {
              return res.status(404).send('Board ID Not Found');
            }
            return res.status(200).send({ board });
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  //D
  //DELETE a board
  app.delete('/boards/delete/:id', jwtAuth, (req, res) => {
    const boardID = req.params.id;
    const userID = req.user.id;
    const name = _.pick(req.body, ['name']);

    // Is the board ID Valid?
    if (!ObjectID.isValid(boardID)) {
      return res.status(400).send('Invalid Board ID');
    }

    // Find the board
    Board.findById(boardID)
      .then(board => {
        // Is the requester the board owner?
        if (board.owner !== userID) {
          return res.status(401).send('Unauthorized.');
        }

        // Actually delete the board
        Board.findByIdAndRemove(boardID)
          .then(board => {
            if (!board) {
              return res.status(404).send('Board ID Not Found');
            }
            return res.status(202).send({ board });
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
};
