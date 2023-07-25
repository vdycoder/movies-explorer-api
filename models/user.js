const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  BAD_CREDENTIALS_ERROR_MESSAGE,
} = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля составляет 2 символа'],
      maxlength: [30, 'Максимальная длина поля составляет 30 символов'],
      required: [true, `Поле ${this.name} является обязательным.`],
    },
    email: {
      type: String,
      required: [true, `Поле ${this.email} является обязательным.`],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Переданная строка не является email-ом.',
      },
    },
    password: {
      type: String,
      required: [true, `Поле ${this.password} является обязательным.`],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema
  .statics
  .checkUserCredentials = function checkUserCredentials(email, password) {
    return this
      .findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(
            new UnauthorizedError(BAD_CREDENTIALS_ERROR_MESSAGE),
          );
        }
        return bcrypt.compare(password, user.password)
          .then((correctPassword) => {
            if (!correctPassword) {
              return Promise.reject(
                new UnauthorizedError(BAD_CREDENTIALS_ERROR_MESSAGE),
              );
            }
            return user;
          });
      });
  };

module.exports = mongoose.model('user', userSchema);
