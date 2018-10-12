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
  preAuth: function(token) {
    STORE.view = 'kanban';
    render.page(STORE);
    // api
    //   .getAll(token)
    //   .then(result => {
    //     STORE.list = result.data.todos;
    //     STORE.view = 'list';
    //     // render.list(STORE);
    //     render.page(STORE);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  },

  /* HEADER */
  /* Add board form */
  addBoardFormSubmit: function(event) {
    event.preventDefault();

    alert('handling new board form');
  },
  /* Sign Out */
  signout: function(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    const state = event.data;
    state.view = 'welcome';
    state.list = [];
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
        state.list = result.data.todos;
        console.dir(state);
        render.displayBoards(state);

        render.page(state);
      })
      .catch(err => {
        state.action = null;
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
    const itemObj = {};
    const state = event.data;
    const token = state.token;
    const itemDescription = $('#itemDescription')
      .val()
      .trim();
    const sanitized = $(itemDescription).text();
    console.log('sanitized: ', sanitized);
    if (!sanitized) {
      itemObj.text = itemDescription;
    } else {
      itemObj.text = sanitized;
    }
  },
  /* CARDS */
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
