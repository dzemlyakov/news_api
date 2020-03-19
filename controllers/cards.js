const Card = require('../models/card');
const { ForbiddenError, NotFoundError } = require('../errors/index-errors');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};


module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Такая карточка не найдена');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить чужую карточку, отсутсвуют права!');
      }
      return Card.remove(card)
        .then(() => res.status(200).send({ data: card }));
    })
    .catch(next);
};
