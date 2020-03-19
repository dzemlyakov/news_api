const articles = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createArticle,
  getAllArticles,
  deleteArticle,
} = require('../controllers/articles');


articles.get('/', getAllArticles);

articles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(1).required(),
    title: Joi.string().min(1).required(),
    text: Joi.string().min(1).required(),
    date: Joi.string().min(1).required(),
    source: Joi.string().min(1).required(),
    link: Joi.string().uri().required().regex(/http[s]?:\/\/(((\d{1,3}\.){3}\d{1,3})|(([a-zA-Z/\d-]+\.)?[[a-zA-Z/\d-]+\.[a-zA-Z]+))(:\d{2,5})?(\/[a-zA-Z/\d-]+#?)?/),
    image: Joi.string().uri().required().regex(/http[s]?:\/\/(((\d{1,3}\.){3}\d{1,3})|(([a-zA-Z/\d-]+\.)?[[a-zA-Z/\d-]+\.[a-zA-Z]+))(:\d{2,5})?(\/[a-zA-Z/\d-]+#?)?/),
  }),
}), createArticle);

articles.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = articles;
