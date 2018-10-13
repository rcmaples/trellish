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

const handle = {
  preAuth: function(token) {
    STORE.view = 'kanban';
    // state.view = 'kanban';
    api
      .getAllBoards(token)
      .then(result => {
        for (let board of result.data.boards) {
          STORE.boards.push(board);
        }
        render.page(STORE);
        render.displayBoards(STORE);
      })
      .catch(err => {
        console.dir(err);
        let errCode = err.response.status;
        let errMessage = err.response.statusText;
        if (errMessage === 'Unauthorized') {
          alert('Invalid username or password.');
        }
        console.error(err);
      });
    // TODO: Add get all cards
  },

  /* HEADER */
  /* Add board form */
  addBoardFormSubmit: function(event) {
    event.preventDefault();
    const itemObj = {};
    const state = event.data;
    const token = state.token;
    const formData = $('#boardName')
      .val()
      .trim();
    const newBoardName = $(formData).text();

    if (!newBoardName) {
      itemObj.name = formData;
    } else {
      itemObj.name = newBoardName;
    }

    api
      .createABoard(itemObj, token)
      .then(res => {
        state.view = 'kanban';
        render.createBoard(res);
      })
      .catch(err => {
        console.error(err);
      });
  },
  /* Sign Out */
  signout: function(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    const state = event.data;
    state.view = 'welcome';
    state.boards = [];
    state.token = null;
    state.emailAddress = null;
    // render.emptylist();
    render.page(state);
  },

  /* MAIN */
  /* welcome sign up button*/
  newSignup: function(event) {
    event.preventDefault();
    const state = event.data;
    const el = $(event.target);
    state.view = 'signup';
    render.page(state);
  },
  /* welcome sign in */
  presentSignIn: function(event) {
    event.preventDefault();
    const state = event.data;
    const el = $(event.target);
    state.view = 'signin';
    render.page(state);
  },
  /* sign up form */
  submitSignupForm: function(event) {
    event.preventDefault();
    event.preventDefault();
    const state = event.data;
    const el = $(event.target);

    const newEmailAddress = el
      .find('[name=newEmailAddress]')
      .val()
      .trim();
    const newPassword = el
      .find('[name=newPassword]')
      .val()
      .trim();

    el.find('[name=emailAddress]').val('');
    el.find('[name=password]').val('');

    const signupObj = {
      email: newEmailAddress,
      password: newPassword
    };

    api
      .signup(signupObj)
      .then(() => {
        // console.log(response.response.status);
        // console.log(response.response.data.code);
        state.view = 'confirmation';
        render.page(state);
      })
      .catch(err => {
        let errCode = err.response.data.code;
        let errMsg = err.response.data.message;
        let errReason = err.response.data.reason;

        alert(errMsg);
        state.view = 'signup';
        render.page(state);
      });
  },
  /* sign in form */
  signin: function(event) {
    event.preventDefault();

    const state = event.data;
    const el = $(event.target);
    const emailAddress = el
      .find('[name=emailAddress]')
      .val()
      .trim();
    const password = el
      .find('[name=password]')
      .val()
      .trim();

    el.find('[name=emailAddress]').val('');
    el.find('[name=password]').val('');

    const signinObj = {
      email: emailAddress,
      password: password
    };

    api
      .signin(signinObj)
      .then(response => {
        state.emailAddress = emailAddress;
        state.token = response.data.token;
        localStorage.setItem('token', state.token);
        state.view = 'kanban';
        return api.getAllBoards(state.token);
      })
      .then(result => {
        for (let board of result.data.boards) {
          state.boards.push(board);
        }
        console.dir(state);
        render.page(state);
        render.displayBoards(state);
      })
      .catch(err => {
        console.dir(err);
        let errCode = err.response.status;
        let errMessage = err.response.statusText;
        if (errMessage === 'Unauthorized') {
          alert('Invalid username or password.');
        }
        console.error(err);
      });
  },

  /* BOARDS */
  /* collapse board */
  collapseBoard: function(event) {
    event.preventDefault();
    render.collapseBoard(event);
  },

  /* open board */
  // openBoard: function(event) {
  //   event.preventDefault();
  //   alert('handling board open');
  // },

  /* add card form */
  addCardFormSubmit: function(event) {
    event.preventDefault();
    console.dir(event);
    const itemObj = {};
    const state = event.data;
    const token = state.token;
    const itemDescription = $('#cardName')
      .val()
      .trim();
    console.log($('#parentBoard'));
    const parentBoard = $('#parentBoard').val();
    itemObj.board = parentBoard;
    const sanitized = $(itemDescription).text();
    console.log('sanitized: ', sanitized);
    if (!sanitized) {
      itemObj.text = itemDescription;
    } else {
      itemObj.text = sanitized;
    }
    console.dir(itemObj);
    api
      .createACard(itemObj, token)
      .then(res => {
        state.view = 'kanban';
        // render.createACard(res);
      })
      .catch(err => {
        console.error(err);
      });
    document.forms['add-card-form'].reset();
  },
  /* CARDS */

  /* reset card board id */
  clearCardBoardId: function(event) {
    $('form#add-card-form')
      .find('[name="parentBoard"]')
      .remove();
    document.forms['add-card-form'].reset();
  },

  /* pass board id to form */

  showCardForm: function(event) {
    //let parentBoardExists =
    let board_id = $(this).attr('data-board-id');
    let boardString = `<input type="hidden" name="parentBoard" id="parentBoard" value="${board_id}">`;

    console.log('This board ID: ', board_id);

    if ($('#parentBoard').length > 0) {
      $('#parentBoard').remove();
    }
      $('#add-card-form')
        .find('button')
        .before(boardString);
  },

  /* open edit menu */
  cardEditMenu: function(event) {
    event.preventDefault();
    render.editMenu();
  },

  /* edit */
  editCardItem: function(event) {
    event.preventDefault();
    render.hideMenu();
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
