const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const { JWT_SECRET } = require('../config/config');
const { NotFoundError, UnauthorizedError } = require('../errors/index-errors');


// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(201).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: 'Success!' });
    })
    .catch(() => next(new UnauthorizedError('Неправильная почта или пароль')));
};


module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Такой пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch(next);
};
