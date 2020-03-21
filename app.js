require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { signupValidation, signinValidation } = require('./middlewares/validation');
const { errorHandler } = require('./middlewares/erorr-handler');
const { login, createUser } = require('./controllers/users');
const { PORT, DATABASE_URL } = require('./config/config');


const app = express();

app.use(limiter);
app.use(helmet());

app.use(cookieParser());

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);


app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

app.use(router);


app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
