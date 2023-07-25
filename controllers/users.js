const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  JWT_SECRET,
  SALT_LENGTH,
} = require('../utils/config');
const {
  STATUS_CREATED,
  USER_NOT_FOUND_ERROR_MESSAGE,
  USER_UPDATE_ERROR_MESSAGE,
  INVALID_DATA_ERROR_MESSAGE,
  DUPLICATE_DB_DATA_ERROR,
  USER_DUPLICATE_ERROR_MESSAGE,
  VALIDATION_DB_DATA_ERROR,
} = require('../utils/constants');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotUniqueError = require('../errors/NotUniqueError');
const NotFoundError = require('../errors/NotFoundError');

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User
    .findById(userId)
    .orFail(() => {
      next(new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      next(new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === VALIDATION_DB_DATA_ERROR) {
        next(new BadRequestError(USER_UPDATE_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, SALT_LENGTH)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((newUser) => {
      res.status(STATUS_CREATED).send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    })
    .catch((err) => {
      if (err.name === VALIDATION_DB_DATA_ERROR) {
        next(new BadRequestError(INVALID_DATA_ERROR_MESSAGE));
      } else if (err.code === DUPLICATE_DB_DATA_ERROR) {
        next(new NotUniqueError(USER_DUPLICATE_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .checkUserCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ jwt: token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
};
