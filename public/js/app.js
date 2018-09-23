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
    view: 'welcome', // welcome | signup | confirmtion |
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

  // if (localStorage.getItem('token')) {
  //   handle.preAuth(localStorage.getItem('token'));
  // } else {
  render.page(STORE);
  // }

  // WELCOME
  $('#welcome').on('click', '.js-signup', STORE, handle.newSignup);
  $('#welcome').on('click', '.js-signin', STORE, handle.presentSignIn);

  // SIGNUP, SIGNIN
  $('#signup').on('submit', STORE, handle.submitSignupForm);
  $('#signup').on('click', '.signinlink', STORE, handle.presentSignIn);
  $('#confirmation').on('submit', STORE, handle.presentSignIn);
  $('#signin').on('submit', STORE, handle.signin);
  $('#signin').on('click', '.signuplink', STORE, handle.newSignup);

  // BOARDS
  $('#add-board-form').on('submit', STORE, handle.addBoardFormSubmit);
  $('.collapse-board').on('click', STORE, handle.collapseBoard);
  $('.open-board').on('click', STORE, handle.openBoard);

  // CARDS
  $('#add-card-form').on('submit', STORE, handle.addCardFormSubmit);
  // $('.edit-item').on('click', STORE, handle.cardEditMenu);
  // $('.edit-card').on('click', STORE, handle.editCardItem);
  // $('.complete-card').on('click', STORE, handle.completeCardItem);
  // $('.favorite-card').on('click', STORE, handle.favoriteCardItem);
  // $('.prioritize-card').on('click', STORE, handle.priorityCardItem);
  // $('.trash-card').on('click', STORE, handle.deleteCardItem);

  // SIGNOUT
  $('.signout').on('click', STORE, handle.signout);

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
