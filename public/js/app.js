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
  console.log('Jinkies');
  STORE = {
    dev: false,
    view: 'welcome', // welcome | signup | confirmtion |
    backTo: null,
    boards: [],
    cards: [],
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
  $('main').on('click', '.collapse-board', STORE, handle.collapseBoard);
  // $('.open-board').on('click', STORE, handle.openBoard);
  $('main').on('click', '.delete-board', STORE, handle.deleteBoard);

  // CARDS
  $('main').on('click', '.add-card', handle.showCardForm);
  $('main').on('click', '.edit-item', STORE, handle.cardEditMenu);
  $('main').on('click', '.edit-card', STORE, handle.editCardItem);
  $('main').on('click', '.complete-card', STORE, handle.completeCardItem);
  $('main').on('click', '.favorite-card', STORE, handle.favoriteCardItem);
  $('main').on('click', '.prioritize-card', STORE, handle.priorityCardItem);
  $('main').on('click', '.trash-card', STORE, handle.deleteCardItem);
  $('#add-card-form').on('submit', STORE, handle.addCardFormSubmit);
  // $('#jq-dropdown-3').on('hide', handle.clearCardBoardId);

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
