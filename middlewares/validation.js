const { celebrate, Joi } = require('celebrate');
const {
  WRONG_NAME, WRONG_MAIL, WRONG_PASS, EMPTY, TEXT, KEYWORD, DATE,
  TITLE, SOURCE, LINK, IMAGE, ID,
} = require('../constants/constants');

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(new Error(WRONG_NAME)),
    email: Joi.string().required().email()
      .error(new Error(WRONG_MAIL)),
    password: Joi.string().required().min(8)
      .error(new Error(WRONG_PASS)),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(new Error(WRONG_MAIL)),
    password: Joi.string().required().min(8)
      .error(new Error(WRONG_PASS)),
  }),
});

const createArticleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(1).required()
      .error(new Error(`${EMPTY}${KEYWORD}`)),
    title: Joi.string().min(1).required()
      .error(new Error(`${EMPTY}${TITLE}`)),
    text: Joi.string().min(1).required()
      .error(new Error(`${EMPTY}${TEXT}`)),
    date: Joi.string().min(1).required()
      .error(new Error(`${EMPTY}${DATE}`)),
    source: Joi.string().min(1).required()
      .error(new Error(`${EMPTY}${SOURCE}`)),
    link: Joi.string().uri().required().regex(/http[s]?:\/\/(((\d{1,3}\.){3}\d{1,3})|(([a-zA-Z/\d-]+\.)?[[a-zA-Z/\d-]+\.[a-zA-Z]+))(:\d{2,5})?(\/[a-zA-Z/\d-]+#?)?/)
      .error(new Error(`${EMPTY}${LINK}`)),
    image: Joi.string().uri().required().regex(/http[s]?:\/\/(((\d{1,3}\.){3}\d{1,3})|(([a-zA-Z/\d-]+\.)?[[a-zA-Z/\d-]+\.[a-zA-Z]+))(:\d{2,5})?(\/[a-zA-Z/\d-]+#?)?/)
      .error(new Error(`${EMPTY}${IMAGE}`)),
  }),
});

const deleteArticleValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24)
      .error(new Error(ID)),
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  deleteArticleValidation,
  createArticleValidation,

};
