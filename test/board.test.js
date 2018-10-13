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
  b - Should delete a board

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
  seedUserToken,
  populateBoard,
  populateCards,
  boardId
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
        console.error(err);
        reject(err);
      });
  });
}

describe('\n========================\nBoard Endpoints\n========================\n', function() {
  let fakeID = new ObjectID();
  let token = seedUserToken;

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

  describe('\n----------\nPOST /boards\n----------\n', () => {
    it('Should fail if not authenticated', () => {
      return chai
        .request(app)
        .post('/boards')
        .send({ name: 'fail board' })
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it('Should fail if name is empty', () => {
      return chai
        .request(app)
        .post('/boards')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: '' })
        .then(res => {
          expect(res).to.have.status(500);
        });
    });
    it('Should return an object on success', () => {
      return chai
        .request(app)
        .post('/boards')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'success board' })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('Object');
        });
    });
  });

  describe('\n----------\nGET /boards/\n----------\n', () => {
    it('Should fail if not authenticated', () => {
      return chai
        .request(app)
        .get('/boards')
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it('Should return an array of objects', () => {
      return chai
        .request(app)
        .get('/boards')
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.keys('boards');
          expect(res.body.boards).to.have.length.gt(0);
          expect(res.body.boards[0]).to.have.property('name');
          expect(res.body.boards[0].name).to.be.a('String');
          expect(res.body.boards[0].name).to.have.length.gt(1);
        });
    });
  });

  describe('\n----------\nGET /boards/:id\n----------\n', () => {
    it('Should fail if not authenticated', () => {
      return chai
        .request(app)
        .get(`/boards/${boardId}`)
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it('Should fail if ID is invalid', () => {
      return chai
        .request(app)
        .get(`/boards/${fakeID}`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });
    it('Should return an object', () => {
      return chai
        .request(app)
        .get(`/boards/${boardId}`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
        });
    });
  });

  describe('\n----------\nPATCH /boards/:id\n----------\n', () => {
    it('Should fail if not authenticated', () => {
      return chai
        .request(app)
        .patch(`/boards/${boardId}`)
        .send({ name: 'Not Authed' })
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it('Should fail if ID is invalid', () => {
      return chai
        .request(app)
        .patch(`/boards/${fakeID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Invalid ID' })
        .then(res => {
          expect(res).to.have.status(400);
        });
    });
    it('Should fail if name is empty', () => {
      return chai
        .request(app)
        .patch(`/boards/${boardId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: '' })
        .then(res => {
          expect(res).to.have.status(400);
        });
    });
    it('Should return an Object', () => {
      return chai
        .request(app)
        .patch(`/boards/${boardId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Test Patch' })
        .then(res => {
          expect(res).to.have.status(200);
        });
    });
  });

  describe('\n----------\nDELETE /boards/:id\n----------\n', () => {
    it('Should fail if not authenticated', () => {
      return chai
        .request(app)
        .delete(`/boards/${boardId}`)
        .then(res => {
          expect(res).to.have.status(401);
        });
    });
    it('Should fail if ID is invalid', () => {
      return chai
        .request(app)
        .delete(`/boards/${fakeID}`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(400);
        });
    });
    it('Should delete a board', () => {
      return chai
        .request(app)
        .delete(`/boards/${boardId}`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(202);
        });
    });
  });
});
