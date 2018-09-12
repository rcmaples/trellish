'use strict';
const expect = require('expect');
const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../server');

function tearDownDB() {
  console.warn('...Deleting Database...');
  return mongoose.connection.dropDatabase();
}

describe('Root endpoint...', function() {
  describe('GET `/`', () => {
    it('should respond with static html', done => {
      request(app)
        .get('/')
        .expect(200)
        .expect('content-type', 'text/html; charset=UTF-8', done());
    });
  });
});
