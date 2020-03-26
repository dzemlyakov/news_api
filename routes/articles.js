const articles = require('express').Router();
const {
  createArticle,
  getAllArticles,
  deleteArticle,
} = require('../controllers/articles');
const { createArticleValidation, deleteArticleValidation } = require('../middlewares/validation');


articles.get('/', getAllArticles);
articles.post('/', createArticleValidation, createArticle);
articles.delete('/:id', deleteArticleValidation, deleteArticle);

module.exports = articles;
