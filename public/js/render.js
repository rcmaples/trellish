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

  createBoard: function(response) {
    let boardName = response.data.name;
    let boardID = response.data._id;
    $('.board-container').append(
      `<li class="board" id=${boardID}>
        <div class="board-header">
          <button class="collapse-board" aria-label="collapse board">
            <span class="collapse" aria-hidden="true" focusable="false"></span>
          </button>
          <h2>${boardName}</h2>
          <button class="add-card" data-jq-dropdown="#jq-dropdown-3" aria-label="add card">
            <span class="
            addCardButton" aria-hidden="true" focusable="false"></span>
          </button>
        </div>
        <ul class="card-container">
        </ul>
      </li>`
    );
  },

  displayBoards: function(state) {
    console.dir(state);
    let boards = state.boards;
    console.dir(boards);
    boards.forEach(board => {
      $('.board-container').append(
        `<li class="board" id=${board._id}>
        <div class="board-header">
          <button class="collapse-board" aria-label="collapse board">
            <span class="collapse" aria-hidden="true" focusable="false"></span>
          </button>
          <h2>${board.name}</h2>
          <button class="add-card" data-jq-dropdown="#jq-dropdown-3" aria-label="add card">
            <span class="
            addCardButton" aria-hidden="true" focusable="false"></span>
          </button>
        </div>
        <ul class="card-container">
        </ul>
      </li>`
      );
    });
  },

  createCards: function(event) {
    //do stuff
  },

  displayCards: function(event) {
    //do stuff
  }
};
