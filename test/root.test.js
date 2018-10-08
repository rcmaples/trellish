'use strict';

const mongoose = require('mongoose');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const { app } = require('../server');

chai.use(chaiHttp);

function tearDownDB() {
  console.warn('...Deleting Database...');
  return mongoose.connection.dropDatabase();
}

describe('\n========================\nRoot Endpoint\n========================\n', function() {
  describe('\n----------\nGET /\n----------\n', () => {
    it('should respond with static html', () => {
      return chai
        .request(app)
        .get('/')
        .then(res => {
          // console.log(res);
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });
  });
});
