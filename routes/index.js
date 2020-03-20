const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const users = require('./users');
const articles = require('./articles');
const auth = require('../middlewares/auth');
const { SOURCE_NOT_FOUND } = require('../constants/constants');


router.use('/articles', auth, articles);
router.use('/users', auth, users);
router.use('*', (req, res, next) => next(new NotFoundError(SOURCE_NOT_FOUND)));


module.exports = router;
