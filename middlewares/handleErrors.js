const {
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

const handleErrors = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({
      message: err.message,
    });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({
      message: INTERNAL_SERVER_ERROR_MESSAGE,
    });
  }
  next();
};

module.exports = handleErrors;
