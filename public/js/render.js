/*
  render.js
    will have access to
      - global jQuery

    will
      - manipulate DOM
      - read from STORE (called state)

    wlll not
      - modify state/store

  NOTES:
  state == STORE.
*/

'use strict';

const render = {
  // Render the Page:
  page: function(state) {
    $('.edit-menu').hide();
    $('.view').hide();
    // set STORE.dev to TRUE to make use of state identifying borders
    if (state.dev) {
      $('.view').show();
      $('.view').css('border', '4px dotted red');
      $(`#${state.view}`).css('border', '4px solid white');
      $('#newItemForm').hide(); // May be extranious
    } else {
      // Don't show the authed header in these states
      const unprotectedViews = ['signup', 'signin', 'confirmation', 'welcome'];
      if (unprotectedViews.includes(state.view)) {
        $('#authedHeader').hide();
        $('#newItemButton').hide();
        $('#signout').hide();
      } else {
        // only other state is 'list', we need it there.
        $('#nav').show();
      }

      // show the current state's view
      $(`#${state.view}`).show();
    }
  },

  editMenu: function() {
    // see https://repl.it/@rcmaples/RingedGrimVertex?lite=1
    $('.edit-menu')
      .show()
      .toggle('slide', { direction: 'right' }, 500);
  },

  hideMenu: function() {
    $('.edit-menu')
      .toggle('slide', { direction: 'left' }, 500)
      .hide();
  },

  collapseBoard: function(event) {
    let target = $(event.target);
    target.toggleClass('flip');
    target
      .closest('.board')
      .find('ul')
      .slideToggle();
  },

  createBoard: function(event) {
    //do stuff
  },

  displayBoards: function(event) {
    //do stuff
  },

  createCards: function(event) {
    //do stuff
  },

  displayCards: function(event) {
    //do stuff
  }
};
