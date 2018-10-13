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
      .closest('li')
      .find('ul')
      .slideToggle();
  },

  createBoard: function(response) {
    let boardName = response.data.name;
    let boardID = response.data._id;
    $('#jq-dropdown-1').hide();
    document.forms['add-board-form'].reset();
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
    let boards = state.boards;
    boards.forEach(board => {
      $('.board-container').append(
        `<li class="board" id=${board._id}>
        <div class="board-header">
          <button class="collapse-board" aria-label="collapse board">
            <span class="collapse" aria-hidden="true" focusable="false"></span>
          </button>
          <h2>${board.name}</h2>
          <button class="add-card" data-jq-dropdown="#jq-dropdown-3" aria-label="add card" data-board-id=${
            board._id
          }>
            <span class="addCardButton" aria-hidden="true" focusable="false" ></span>
          </button>
        </div>
        <ul class="card-container">
        </ul>
      </li>`
      );
    });
  },

  emptyBoards: function() {
    $('.board-container').empty();
  },

  createACard: function(response) {
    let parentBoard = response.data.card.board;
    let cardID = response.data.card._id;
    let text = response.data.card.text;
    $('#jq-dropdown-3').hide();
    document.forms['add-card-form'].reset();
    $(`#${parentBoard}`)
      .find('ul')
      .append(
        `<li class="card" id="${cardID}">
          <div class='breakword'>${text}</div>
          <button class="edit-item" aria-label="edit card" data-card-id="${cardID}"><span class="edit-item-icon" aria-hidden="true" , focusable="false"></span></button>
          </li>`
      );
  },

  cardFormMenu: function(event) {
    console.log(event);
    /*$(body).append(
      `<div id="jq-dropdown-3" class="addCardForm jq-dropdown jq-dropdown-tip jq-dropdown-anchor-right">
      <div class="jq-dropdown-panel card-panel">
        <form id="add-card-form">
          <label for="cardName">Add card:</label>
          <input type="hidden" name="parentBoard" id="parentBoard" value="">
          <input type="text" name="cardName" id="cardName" placeholder="Don't forget..." required>
          <button type="submit">add</button>
        </form>
      </div>
    </div>`
    )*/
  },

  displayCards: function(state) {
    let cards = state.cards;
    cards.forEach(card => {
      let cardID = card._id;
      let parent = card.board;
      let text = card.text;
      $(`#${parent}`)
        .find('ul')
        .append(
          `<li class="card" id="${cardID}">
          <div class='breakword'>${text}</div>
          <button class="edit-item" aria-label="edit card" data-card-id="${cardID}"><span class="edit-item-icon" aria-hidden="true" , focusable="false"></span></button>
          </li>`
        );
    });
  }
};
