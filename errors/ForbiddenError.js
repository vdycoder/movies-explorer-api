const {
  FORBIDDEN_ERROR,
} = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message || 'Отказано в доступе.');
    this.statusCode = FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
