const mongoose = require('mongoose');
const validator = require('validator');
const { INVALID_LINK } = require('../constants/constants');


const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 1,
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: true,
  },
});

articleSchema.path('link').validate(validator.isURL, INVALID_LINK);
articleSchema.path('image').validate(validator.isURL, INVALID_LINK);

module.exports = mongoose.model('card', articleSchema);
