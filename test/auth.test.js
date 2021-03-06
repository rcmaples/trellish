'use strict';
const mongoose = require('mongoose');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const faker = require('faker');
const { app, runServer, closeServer } = require('../server');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/config');
const { User } = require('../models/user');

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

function createFakeUser() {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

describe('\n========================\nAuthentication Endpoints\n========================\n', function() {
  let testUser, jwtToken;

  before(async () => {
    await runServer();
  });

  after(async () => {
    await tearDownDB();
    await closeServer();
  });

  describe('\n----------\nPOST /signup\n----------\n', () => {
    // Create a user for our tests

    testUser = createFakeUser();

    // test signup route
    it('Should fail if no email is presented', () => {
      return chai
        .request(app)
        .post('/signup')
        .send({
          email: '',
          password: 'Password123!'
        })
        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.keys('code', 'message', 'reason');
          expect(res.body.message).to.equal(
            'You must provide a username and password.'
          );
          expect(res.body.reason).to.equal('ValidationError');
        });
    });

    it('Should fail if no password is presented', function() {
      return chai
        .request(app)
        .post('/signup')
        .send({
          email: 'email@tests.com',
          password: ''
        })
        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.keys('code', 'message', 'reason');
          expect(res.body.message).to.equal(
            'You must provide a username and password.'
          );
          expect(res.body.reason).to.equal('ValidationError');
        });
    });

    it('Should create a user for a proper request', function() {
      return chai
        .request(app)
        .post('/signup')
        .send(testUser)
        .then(res => {
          jwtToken = res.body.token;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.key('token');
        });
    });

    it('Should fail is the email addess is already in use', function() {
      return chai
        .request(app)
        .post('/signup')
        .send(testUser)
        .then(res => {
          expect(res).to.have.status(422);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.keys('code', 'message', 'reason');
          expect(res.body.message).to.equal('Email address is already in use.');
          expect(res.body.reason).to.equal('ValidationError');
        });
    });
  });

  describe('\n----------\nPOST /signin\n----------\n', () => {
    //test signin route
    const signInBadEmail = {
      email: 'not@good.com',
      password: testUser.password
    };

    const signInBadPass = {
      email: testUser.email,
      password: 'pumpernickle'
    };

    const goodUser = {
      email: testUser.email,
      password: testUser.password
    };

    it('Should fail if email is incorrect', function() {
      return chai
        .request(app)
        .post('/signin')
        .send(signInBadEmail)
        .then(res => {
          expect(res).to.have.status(401);
        });
    });

    it('Should fail is password is incorrect', function() {
      return chai
        .request(app)
        .post('/signin')
        .send(signInBadPass)
        .then(res => {
          expect(res).to.have.status(401);
        });
    });

    it('Should succeed if credientals are correct', function() {
      return chai
        .request(app)
        .post('/signin')
        .send(testUser)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.key('token');
        });
    });
  });

  describe('\n----------\nPOST /refresh\n----------\n', () => {
    // test refresh route
    it('Should succeed in providing a new token', function() {
      return chai
        .request(app)
        .post('/refresh')
        .set('Authorization', `Bearer ${jwtToken}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.key('token');
        });
    });
  });
});
