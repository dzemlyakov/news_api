const { SERVER_ERROR } = require('../constants/constants');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode = (err.name === 'ValidationError' ? 400 : 500), message = SERVER_ERROR } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? SERVER_ERROR : message });
};

module.exports = {
  errorHandler,
};
