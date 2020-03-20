const { SERVER_ERROR } = require('../constants/constants');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err);
  // eslint-disable-next-line no-constant-condition

  const { statusCode = 500, message } = err;
  // if (err.name = 'ValidationError') {
  //   res.send({ message: 'err.message' });
  // }
  res.status(statusCode).send({ message: statusCode === 500 ? SERVER_ERROR : message });
};

module.exports = {
  errorHandler,
};
