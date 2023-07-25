const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  UNAUTHORIZED_ERROR_MESSAGE,
  SIGNIN_TOKEN_ERROR_MESSAGE,
} = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(SIGNIN_TOKEN_ERROR_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
