const router = require('express').Router();

const auth = require('../middlewares/auth');
const movieRouter = require('./movies');
const userRouter = require('./users');
const {
  BAD_ENDPOINT_ERROR_MESSAGE,
} = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const {
  createUser,
  login,
} = require('../controllers/users');
const {
  signupValidator,
  signinValidator,
} = require('../middlewares/dataValidations');

// роуты регистрации и авторизации
router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);

// роуты пользователя и фильмов, защищены авторизацией
router.use('/movies', auth, movieRouter);
router.use('/users', auth, userRouter);

router.use('*', () => {
  throw new NotFoundError(BAD_ENDPOINT_ERROR_MESSAGE);
});

module.exports = router;
