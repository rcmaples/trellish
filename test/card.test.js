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
  b - should fail if text is empty/null
  c - should succeed otherwise

4 - Use token to get a list of cards (GET / R)
  a - should fail if not auth'd
  b - should return an array of objects

5 - Use token to get a single card (GET / R)
  a - should fail if not auth'd
  b - should fail if ID is invalid
  c - should fail if user ID doesn't have access to card ID
  d - should return an object

6 - Use token to mark card as complete (PATCH / U)
  a - should fail if not auth'd
  b - should fail if card doesn't exist
  c - should fail if id is invalid
  d - should return an object

7 - Use token to delete a card (DELETE / D)
  a - should fail if not auth'd
  b - should fail if card doesn't exist
  c - should fail if id is invalid

--- Tear Down Test DB---
*/

'use strict';
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
// const faker = require('faker');
const { app, runServer, closeServer } = require('../server');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/config');
const { User } = require('../models/user');
const { Board } = require('../models/board');
const { Card } = require('../models/card');
const {
  populateUser,
  boardId,
  seedUserToken,
  populateBoard,
  populateCards,
  seedCards
} = require('./seed');

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

describe('\n========================\nCard Endpoints\n========================\n', function() {
  let fakeID = new ObjectID();
  let token = seedUserToken;
  let card = seedCards[0]._id;

  before(async () => {
    await runServer();
  });

  beforeEach(async () => {
    await populateUser();
    await populateBoard();
    await populateCards();
  });

  afterEach(async () => {
    await tearDownDB();
  });

  after(async () => {
    await closeServer();
  });

  describe('\n----------\nPOST /cards\n----------\n', () => {
    it('Should fail if not authenticated', () => {
      return chai
        .request(app)
        .post('/cards')
        .send({ text: 'fail card', board: boardId })
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it('Should fail if text is empty/null', () => {
      return chai
        .request(app)
        .post('/cards')
        .set('Authorization', `Bearer ${token}`)
        .send({ text: '', board: boardId })
        .then(res => {
          expect(res).to.have.status(400);
        });
    });
    it('Should succeed if request is correct', () => {
      return chai
        .request(app)
        .post('/cards')
        .set('Authorization', `Bearer ${token}`)
        .send({ text: 'Success Card', board: boardId })
        .then(res => {
          expect(res).to.have.status(201);
        });
    });
  });

  describe('\n----------\nGET /cards\n----------\n', () => {
    it('Should fail if not authenticated', () => {
      return chai
        .request(app)
        .get('/cards')
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it('Should return an array of objects', () => {
      return chai
        .request(app)
        .get('/cards')
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
        });
    });
  });

  describe('\n----------\nGET /cards/:id\n----------\n', () => {
    it('Should fail if not authenticated', () => {
      return chai
        .request(app)
        .get(`/cards/${card}`)
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it("Should fail if ID is not valid / doesn't exist", () => {
      return chai
        .request(app)
        .get(`/cards/${fakeID}`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });
    it("Should fail if User isn't authorized for ID", () => {
      return chai
        .request(app)
        .get(`/cards/${card}`)
        .send()
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it('Should return an object', () => {
      return chai
        .request(app)
        .get(`/cards/${card}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
        });
    });
  });

  describe('\n----------\nPATCH /cards/:id\n----------\n', () => {
    it('Should fail if not authenticated', () => {
      return chai
        .request(app)
        .patch(`/cards/${card}`)
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it("Should fail if the card ID doesn't exist / is invalid", () => {
      return chai
        .request(app)
        .patch(`/cards/${fakeID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ text: 'patch fail' })
        .then(res => {
          expect(res).to.have.status(400);
        });
    });
    it('Should return an object', () => {
      return chai
        .request(app)
        .patch(`/cards/${card}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ text: 'patch win' })
        .then(res => {
          expect(res).to.have.status(200);
        });
    });
  });

  describe('\n----------\nDELETE /cards/:id\n----------\n', () => {
    it('Should fail if not authenticated', () => {
      return chai
        .request(app)
        .delete(`/cards/${card}`)
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it("Should fail if the card ID doesn't exist", () => {
      return chai
        .request(app)
        .delete(`/cards/${fakeID}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .then(res => {
          expect(res).to.have.status(400);
        });
    });
    it('Should delete the card', () => {
      return chai
        .request(app)
        .delete(`/cards/${card}`)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .then(res => {
          expect(res).to.have.status(202);
        });
    });
  });
});
