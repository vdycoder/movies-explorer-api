const {
  BAD_REQUEST_ERROR,
} = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message || 'Не переданы имя пользователя или пароль.');
    this.statusCode = BAD_REQUEST_ERROR;
  }
}

module.exports = BadRequestError;
