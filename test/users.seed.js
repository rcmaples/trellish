const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const faker = require('faker');
const config = require('../config/config');

function createFakeUser() {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

//let seedUser = createFakeUser();

function seedUsers() {
  const { email, password, name } = createFakeUser();
  const newUser = new User({
    email: email,
    password: password,
    name: name
  });

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    } else if (existingUser) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Email address is already in use.'
      });
    } else {
      const user = new User(newUser);
      console.log(user);
      user.save(function(err) {
        return next(err);
      });
      console.log(user);
      // res.json({ token: generateToken(user) });
      return user;
    }
  });
}

module.exports = { seedUsers, createFakeUser };
