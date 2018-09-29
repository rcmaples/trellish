/*
user.js

  uses bcryptjs for password encryption
  uses mongoose for monogodb schemas
  will export the User mongoose model based on the UserSchema

  will purposely and explicitly call 'else' after using 'if'
  (even though it can be ignored in a few places)
*/

'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

/*
A User should have
  - a name
  - an email (lowercase and unique)
  - a username (lowercase and unique)
  - a password
*/
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

/*
A User has the following methods:
  serialize - to prevent direct DB Data from being returned
  comparePassword - to make sure passwords match
*/

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    username: this.username
  };
};

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};

/*
Mongoose middleware -
will use .pre to hash the password before storing it in database
*/

UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    } else {
      user.password = hash;
      next();
    }
  });
});

const User = mongoose.model('user', UserSchema);
module.exports = { User };
