const { celebrate, Joi } = require('celebrate');

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const createArticleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(1).required(),
    title: Joi.string().min(1).required(),
    text: Joi.string().min(1).required(),
    date: Joi.string().min(1).required(),
    source: Joi.string().min(1).required(),
    link: Joi.string().uri().required().regex(/http[s]?:\/\/(((\d{1,3}\.){3}\d{1,3})|(([a-zA-Z/\d-]+\.)?[[a-zA-Z/\d-]+\.[a-zA-Z]+))(:\d{2,5})?(\/[a-zA-Z/\d-]+#?)?/),
    image: Joi.string().uri().required().regex(/http[s]?:\/\/(((\d{1,3}\.){3}\d{1,3})|(([a-zA-Z/\d-]+\.)?[[a-zA-Z/\d-]+\.[a-zA-Z]+))(:\d{2,5})?(\/[a-zA-Z/\d-]+#?)?/),
  }),
});

const deleteArticleValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  deleteArticleValidation,
  createArticleValidation,

};
