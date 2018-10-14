/*
api.js
  uses axios to make http reqs

  will
    - have access to the API
    - be used to communicate with the API

  will not
    - directecly manipulate the DOM
    - use jQuery
    - call any render methods
*/

'use strict';

const api = {
  // Auth Methods
  signup: function(data) {
    /*  data here should be a json object -
        { "email": "email@address.com",
          "password": "password" }
    */
    return axios
      .post('/signup', data)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  signin: function(data) {
    /*  data here should be a json object -
        { "email": "email@address.com",
          "password": "password" }
    */
    return axios
      .post('/signin', data)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  refresh: function(token) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    return axios
      .post('/refresh', axiosConfig)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  getAllBoards: function(token) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return axios
      .get('/boards', axiosConfig)
      .then(response => {
        return response;
      })
      .catch(err => {
        console.error(err);
      });
  },

  getOneBoard: function(id, token) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    return axios
      .get(`/boards/${id}`, axiosConfig)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  getAllCards: function(token) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    return axios
      .get('/cards', axiosConfig)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  modifyCard: function(data, id, token) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    return axios
      .patch(`/cards/${id}`, data, axiosConfig)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  createABoard: function(data, token) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    return axios
      .post('/boards', data, axiosConfig)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  createACard: function(data, token) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    return axios
      .post('/cards', data, axiosConfig)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  getCardsForBoard: function(id, token) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    return axios
      .get(`/boards/${id}/cards`, axiosConfig)
      .then(response => {
        return response.data.cards;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  removeACard: function(id, token) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    return axios
      .delete(`/cards/${id}`, axiosConfig)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  removeABoard: function(id, token) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    return axios
      .delete(`/boards/${id}`, axiosConfig)
      .then(response => {
        return response;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
};
