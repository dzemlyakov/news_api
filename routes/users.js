const users = require('express').Router();
const { getUser } = require('../controllers/users');


users.get('/me', getUser);


module.exports = users;
