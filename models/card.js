/*
card.js

cards will contain
  - text (String, required)
  - an Owner
  - completed (boolean)
  - completed at (timestamp/number)
  - board, an object id for it's parent board

cards will
  - user Mongoose for schema
  - enforce .trim() using mongoose trim
  - keep track of timestamps

*/

'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Board = require('./board');

const CardSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    completed: { type: Boolean, default: false },
    completedAt: { type: Number, defualt: null },
    status: { type: String, default: null },
    owner: { type: String },
    board: { type: Schema.Types.ObjectId, ref: 'Board' }
  },
  { timestamps: true }
);

CardSchema.methods.serialize = function() {
  return {
    id: this._id,
    text: this.text,
    completed: completed,
    owner: this.owner,
    board: this.board._id
  };
};

const Card = mongoose.model('Card', CardSchema);
module.exports = { Card };
