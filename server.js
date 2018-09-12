'use strict';
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static('public'));

app.listen(port, () => {
  console.log(
    '\n',
    `🏆  Your app is now running on port ${port} 🚀`,
    '\n'
    // 'Connecting to: \n\t', process.env.DATABASE_URI, '\n'
  );
});

module.exports = { app };
