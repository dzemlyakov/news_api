const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const { INVALID_MAIL, WRONG_MAIL_OR_PASS, NOT_UNIQUE_MAIL } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});
userSchema.plugin(uniqueValidator, { message: NOT_UNIQUE_MAIL });
userSchema.path('email').validate(validator.isEmail, INVALID_MAIL);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(WRONG_MAIL_OR_PASS));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(WRONG_MAIL_OR_PASS));
          }

          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
