/*
board.js

boards will contain
  - a name (String, required)
  - an array of Strings
    - this will referrence card IDs
  - an Owner

boards will
  - user Mongoose for schema
  - enforce .trim() using mongoose trim
  - keep track of timestamps

*/

'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('./card');

const BoardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true
    },
    owner: { type: String },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
  },
  { timestamps: true }
);

const Board = mongoose.model('Board', BoardSchema);
module.exports = { Board };
