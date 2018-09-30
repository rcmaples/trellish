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
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String
  },
  name: {
    type: String
  }
});

/*
A User has the following methods:
  serialize - to prevent direct DB Data from being returned
  comparePassword - to make sure passwords match
*/

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    email: this.email || '',
    name: this.name
  };
};

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

/*
Mongoose middleware -
will use .pre to hash the password before storing it in database
*/

userSchema.pre('save', function(next) {
  const user = this; // so we can play with the data being worked with

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    } // if err pass the error on to the next ftn and exit

    // hash the password
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      // save the hashed password instead of the plaintext one
      user.password = hash;
      next(); //move along to the next call in the stack
    });
  });
});

const User = mongoose.model('User', userSchema);
module.exports = { User };
