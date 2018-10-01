'use strict';

const Authentication = require('../auth/authentication');
const passport = require('passport');
require('../auth/strategies');

const jwtAuth = passport.authenticate('jwt', { session: false });
const localAuth = passport.authenticate('local', { session: false });

module.exports = app => {
  app.post('/signin', localAuth, Authentication.signin);

  app.post('/signup', Authentication.signup);

  app.post('/refresh', jwtAuth, Authentication.refresh);
};
