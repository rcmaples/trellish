/*
app.js
  will have access to
    - global jQuery;
    - handle
    - render

  will
    - listen for events ('click', 'submit')
    - call handler methods base on event
    - utilize and pass STORE/STATE
    - be able to change STORE

  will not
    - directly manipulate DOM
    - directly make HTTP calls to api

Notes:
Storing STORE globaly to allow acces to dev console
STORE will be passed between handle and render to control
what's shown

jQuery concepts:
  $('SELECTOR').on('ACTION', 'SUBSELECT', DATA, FUNCTION/METHOD)

  When ACTION is performed on SELECTOR[subselect],
            pass DATA into the FUNCTION/METHOD

*/

'use strict';
let STORE = {};

function jinkies() {
  STORE = {
    dev: true,
    view: 'welcome',
    backTo: null,
    list: [],
    item: {},
    token: localStorage.getItem('token'),
    emailAddress: null,
    timer: {
      status: null,
      warning: 30000,
      remaining: null,
      polling: 60000
    }
  };

  if (localStorage.getItem('token')) {
    handle.preAuth(localStorage.getItem('token'));
  } else {
    render.page(STORE);
  }

  // SIGNUP, SIGNIN
  $('#welcome').on('click', '.js-signup', STORE, handle.newSignup);
  $('#signup').on('submit', STORE, handle.signup);
  $('#signup').on('click', '.signinlink', STORE, handle.welcomeSignIn);

  $('#welcome').on('click', '.js-signin', STORE, handle.welcomeSignIn);
  $('#signin').on('submit', STORE, handle.signin);
  $('.signinlink').on('click', STORE, handle.signin);
  $('#confirmation').on('submit', STORE, handle.welcomeSignIn);

  // LIST
  $('#viewForm').on('click', handle.viewForm);
  $('#newItemForm').on('submit', STORE, handle.create);
  $('ul').on('click', 'li', STORE, handle.complete);

  // LIST MODIFICATION

  // SIGNOUT
  $('#signoutButton').on('click', STORE, handle.signout);

  // REFRESH TOKEN
  // If you're actively clicking on the page, refresh token expiry
  // $("body").on("click", STORE, handle.refresh);

  // call checkExpiry on doc ready.
  // handle.checkExpiry(STORE);

  // poll to check expiry based on STORE.timer.polling
  // setInterval(() => handle.checkExpiry(STORE), STORE.timer.polling);
} // END JINKIES

// On doc ready, run jinkies.
$(jinkies);
