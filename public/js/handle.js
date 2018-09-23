/*
  handle.js
    will have access to
      - jQuery
      - render methods
      - axios methods

    will
      - update STATE/STORE
      - validate input
      - call render methods

    may
      - manipulate DOM

  Notes:
  const state = event.data;
  const el = $(event.target);
  calls to api._method_ => axios.js
*/

'use strict';
let debug;

const handle = {
  /* HEADER */
  /* Add board form */
  addBoardFormSubmit: function(event) {
    event.preventDefault();
    alert('handling new board form');
  },
  /* Sign Out */
  signout: function(event) {
    event.preventDefault();
    alert('handling signout');
  },

  /* MAIN */
  /* welcome sign up button*/
  newSignup: function(event) {
    event.preventDefault();
    alert('Handling New Signup');
  },
  /* welcome sign in */
  presentSignIn: function(event) {
    event.preventDefault();
    alert('Ready to present sign in form');
  },
  /* sign up form */
  submitSignupForm: function(event) {
    event.preventDefault();
    alert('handling signup form submital');
  },
  /* sign in form */
  signin: function(event) {
    event.preventDefault();
    alert('handling signin form submital');
  },

  /* BOARDS */
  /* collapse board */
  collapseBoard: function(event) {
    event.preventDefault();
    alert('handing board collapse');
  },

  /* open board */
  openBoard: function(event) {
    event.preventDefault();
    alert('handling board open');
  },

  /* add card form */
  addCardFormSubmit: function(event) {
    event.preventDefault();
    alert('ready to add cards');
  },
  /* CARDS */
  /* open edit menu */
  cardEditMenu: function(event) {
    event.preventDefault();
    alert('presenting edit menu');
  },

  /* edit */
  editCardItem: function(event) {
    event.preventDefault();
    alert('ready to edit item');
  },
  /* mark complete */
  completeCardItem: function(event) {
    event.preventDefault();
    alert('ready to mark as complete');
  },

  /* mark favorite */
  favoriteCardItem: function(event) {
    event.preventDefault();
    alert('ready to mark as favorite');
  },

  /* mark priorty */
  priorityCardItem: function(event) {
    event.preventDefault();
    alert('ready to mark as priority');
  },

  /* delete */
  deleteCardItem: function(event) {
    event.preventDefault();
    alert('ready to delete items');
  }
};
