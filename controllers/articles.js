const Article = require('../models/article');
const { ForbiddenError, NotFoundError } = require('../errors/index-errors');
const { NOT_PERMISSION, NOT_ACTUAL_ARTICLE } = require('../constants/constants');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate('owner')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};


module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .select('+owner')
    .then((article) => {
      if (article === null) {
        throw new NotFoundError(NOT_ACTUAL_ARTICLE);
      }
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError(NOT_PERMISSION);
      }
      return Article.deleteOne(article)
        .then(() => res.status(200).send({ data: article }));
    })
    .catch(next);
};
