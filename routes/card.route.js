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
const { Board } = require('../models/board');

module.exports = app => {
  //C
  // POST a new card
  app.post('/card/create', jwtAuth, (req, res) => {
    Card.create({
      text: req.body.text,
      owner: req.user.id,
      board: req.body.board
    })
      .then(card => {
        if (card) {
          Board.updateOne(
            { _id: req.body.board },
            { $push: { cards: card } },
            done
          ).then(board => console.log(board));
        }
        // res.status(201).send({ card });
      })
      .catch(err => res.status(400).send(err));
  });

  //R
  // GET all cards
  app.get('/cards', jwtAuth, (req, res) => {
    Card.find({ owner: req.user.id })
      .then(cards => {
        res.status(200).send({ cards });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  // GET all cards by boardID
  app.get('/cards/:boardid', jwtAuth, (req, res) => {
    const boardID = req.params.boardid;

    // Is the ID valid?
    if (!ObjectID.isValid(boardID)) {
      return res.status(400).send('Invalid ID');
    }

    Card.find({ board: boardID })
      .then(cards => {
        if (!cards) {
          return res.status(404).send('Board ID Not Found');
        }
        res.status(200).send({ cards });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  // GET one Card
  app.get('/card/:id', jwtAuth, (req, res) => {
    const id = req.params.id;

    // Is the ID valid?
    if (!ObjectID.isValid(id)) {
      return res.status(400).send('Invalid ID');
    }

    Card.findById(id)
      .then(card => {
        // If the ID is valid, but doesn't exist
        if (!card) {
          return res.status(404).send('Card ID Not Found');
        }

        // Does user have access to the board?
        if (card.owner !== req.user.id) {
          return res.status(400).send('Invalid ID for user.');
        }
        // otherwise, send the board object.
        res.status(200).send({ card });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  //U
  // PATCH one card
  app.patch('/card/update/:id', jwtAuth, (req, res) => {
    const cardID = req.params.id;
    const userID = req.user.id;
    const text = _.pick(req.body, ['text']);

    if (!ObjectID.isValid(cardID)) {
      return res.status(400).send('Invalid Card ID');
    }

    // Find the card
    Card.findById(cardID)
      .then(card => {
        // Is the requester the board owner?
        if (card.owner !== userID) {
          return res.status(401).send('Unauthorized.');
        }

        // Actually patch the card text
        Card.findByIdAndUpdate(CardID, { $set: text }, { new: true })
          .then(card => {
            if (!card) {
              return res.status(404).send('Card ID Not Found');
            }
            return res.status(200).send({ card });
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
  // Delete One Card
  app.delete('/card/delete/:id', jwtAuth, (req, res) => {
    const cardID = req.params.id;
    const userID = req.user.id;
    const name = _.pick(req.body, ['text']);

    if (!ObjectID.isValid(cardID)) {
      return res.status(400).send('Invalid Card ID');
    }

    // Find the card
    Card.findById(cardID)
      .then(card => {
        // Is the requester the board owner?
        if (card.owner !== userID) {
          return res.status(401).send('Unauthorized.');
        }

        // Actually patch the card
        Card.findByIdAndRemove(CardID)
          .then(card => {
            if (!card) {
              return res.status(404).send('Card ID Not Found');
            }
            return res.status(200).send({ card });
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
  /*
  For deleting all cards,
  may be best to run each card in a board
  through the singlur delete route.
  */
};
