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
let origHtml = '';
const editMenu = `<div class="edit-menu">
    <button class="edit-card" aria-label="edit card">
      <span class="edit-icon invert" aria-hidden="true" focusable="false"></span>
    </button>
    <button class="complete-card" aria-label="complete card">
      <span class="complete-icon" aria-hidden="true" focusable="false"></span>
    </button>
    <button class="favorite-card" aria-label="favorite card">
      <span class="favorite-icon" aria-hidden="true" focusable="false"></span>
    </button>
    <button class="prioritize-card" aria-label="prioritize card">
      <span class="priority-icon" aria-hidden="true" focusable="false"></span>
    </button>
    <button class="trash-card" aria-label="delete card">
      <span class="trash-icon" aria-hidden="true" focusable="false"></span>
    </button>
  </div>`;

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

  editMenu: function(event) {
    let target = $(event.target);
    let id = $(target)
      .parent()
      .attr('data-card-id');
    origHtml = $(`#${id}`).html();
    $(`#${id}`).empty();
    $(`#${id}`).append($(editMenu));
    // $('.edit-menu').toggle('slide', { direction: 'right' }, 500);
    $('.edit-item').prop('disabled', true);
  },

  hideMenu: function() {
    let target = $(event.target);
    let id = $(target)
      .parents(':eq(2)')
      .attr('id');
    $('.edit-menu').remove();
    $(`#${id}`).append(origHtml);

    $('.edit-item').prop('disabled', false);
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
          <button class="delete-board" aria-label="delete board">
            <span class="deleteBoardbutton" aria-hidden="true" focusable="false"></span>
          </button>
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
          <button class="delete-board" aria-label="delete board">
            <span class="deleteBoardbutton" aria-hidden="true" focusable="false"></span>
          </button>
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

  removedBoard: function(state, el) {
    $(`#${el}`).remove();
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
          <button class="edit-item" aria-label="edit card" data-card-id="${cardID}">
            <span class="edit-item-icon" aria-hidden="true" focusable="false"></span>
          </button>
          </li>`
      );
  },

  displayCards: function(state) {
    let cards = state.cards;
    cards.forEach(card => {
      let cardID = card._id;
      let parent = card.board;
      let text = card.text;
      let cardStatus = card.status;
      let cardCompleted = card.completed;

      $(`#${parent}`)
        .find('ul')
        .append(
          `<li class="card" id="${cardID}">
          <div class='breakword'>${text}</div>
          <button class="edit-item" aria-label="edit card" data-card-id="${cardID}">
          <span class="edit-item-icon" aria-hidden="true" focusable="false"></span>
          </button>
          </li>`
        );

      if (cardCompleted) {
        $(`#${cardID}`).addClass(`complete`);
        $(`#${cardID}`).removeClass(`${cardStatus}`);
      } else if (cardStatus) {
        $(`#${cardID}`).removeClass(`complete`);
        $(`#${cardID}`).addClass(`${cardStatus}`);
      }
    });
  },

  cardStatus: function(response) {
    let completed = response.data.card.completed;
    let status = response.data.card.status;
    let id = response.data.card._id;
    let text = response.data.card.text;
    if (completed) {
      $(`#${id}`).addClass(`complete`);
      $(`#${id}`).removeClass(`${status}`);
    } else {
      $(`#${id}`).removeClass(`complete`);
      $(`#${id}`).addClass(`${status}`);
    }
  },

  removedCard: function(state, el) {
    $(`#${el}`).remove();
  }
};
