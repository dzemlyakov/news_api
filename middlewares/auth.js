const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config');
const { UnauthorizedError } = require('../errors/index-errors');
const { ERROR_AUTH, WRONG_AUTH } = require('../constants/constants');


module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError(WRONG_AUTH);
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(ERROR_AUTH);
  }

  req.user = payload;

  next();
};
