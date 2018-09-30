const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const faker = require('faker');



const users = [
  {
    _id: new ObjectID(),
    name: '',
    email: '',
    password: ''
  }
]