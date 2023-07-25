// SUCCESS статусы
const STATUS_CREATED = 201;
const STATUS_DELETED = 204;

// ERROR статусы
const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;

// DB_DATA_ERROR значения
const VALIDATION_DB_DATA_ERROR = 'ValidationError';
const CAST_DB_DATA_ERROR = 'CastError';
const DUPLICATE_DB_DATA_ERROR = 11000;

// MESSAGES
const SIGNIN_TOKEN_ERROR_MESSAGE = (
  'Ошибка авторизации. JWT-токен не передан или передан в некорректном формате.'
);
const SIGNUP_BAD_REQUEST_ERROR_MESSAGE = (
  'При регистрации пользователя произошла ошибка'
);

const USER_UPDATE_ERROR_MESSAGE = 'Ошибка при обновлении данных пользователя';
const INVALID_DATA_ERROR_MESSAGE = 'Переданы некорректные данные';
const UNAUTHORIZED_ERROR_MESSAGE = (
  'Для получения данных требуется пройти авторизацию'
);
const BAD_CREDENTIALS_ERROR_MESSAGE = 'Переданы некорректные почта или пароль';
const PERMISSION_DENIED_ERROR_MESSAGE = (
  'У пользователя недостаточно прав для данной операции'
);
const USER_NOT_FOUND_ERROR_MESSAGE = 'Данный пользователь не найден';
const MOVIE_NOT_FOUND_ERROR_MESSAGE = 'Данный фильм не найден';
const INTERNAL_SERVER_ERROR_MESSAGE = 'Произошла внутренняя ошибка сервера';

const USER_DUPLICATE_ERROR_MESSAGE = (
  'Не возможно создать пользователя с указанным email'
);
const BAD_ENDPOINT_ERROR_MESSAGE = 'Переданный адрес запроса не существует';

module.exports = {
  STATUS_CREATED,
  STATUS_DELETED,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
  DUPLICATE_DB_DATA_ERROR,
  CAST_DB_DATA_ERROR,
  VALIDATION_DB_DATA_ERROR,
  SIGNIN_TOKEN_ERROR_MESSAGE,
  SIGNUP_BAD_REQUEST_ERROR_MESSAGE,
  USER_UPDATE_ERROR_MESSAGE,
  INVALID_DATA_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  BAD_CREDENTIALS_ERROR_MESSAGE,
  PERMISSION_DENIED_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
  MOVIE_NOT_FOUND_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  USER_DUPLICATE_ERROR_MESSAGE,
  BAD_ENDPOINT_ERROR_MESSAGE,
};
