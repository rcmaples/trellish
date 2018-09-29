'use strict';

require('./config/config');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(
  process.env.DATABASE_URI,
  { useNewUrlParser: true }
);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));

require('./routes/auth.route')(app);
//require('./routes/board.route')(app);
//require('./routes/card.route')(app);

app.listen(port, () => {
  console.log(
    '\n',
    `🏆  Your app is now running on port ${port} 🚀`,
    '\n'
    // 'Connecting to: \n\t', process.env.DATABASE_URI, '\n'
  );
});

module.exports = { app };
