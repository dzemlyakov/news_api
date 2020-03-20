const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const users = require('./users');
const articles = require('./articles');
const auth = require('../middlewares/auth');


router.use('/articles', auth, articles);
router.use('/users', auth, users);
router.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));


module.exports = router;
