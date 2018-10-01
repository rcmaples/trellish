'use strict';

require('./config/config');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jsonValidator = require('./middleware/jsonValidator');
let server;
const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

app.use(morgan('dev'));
app.use(express.json());
app.use(jsonValidator);
app.use(express.static('public'));

require('./routes/auth.route')(app);
require('./routes/board.route')(app);
require('./routes/card.route')(app);

function runServer() {
  const port = process.env.PORT || 3000;
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.DATABASE_URI,
      { useNewUrlParser: true },
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(
              '\n',
              `🏆  Your app is now running on port ${port} 🚀`,
              '\n'
              // 'Connecting to: \n\t', process.env.DATABASE_URI, '\n'
            );
            resolve();
          })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
