const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const routes = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const LIMITS = require('./middlewares/rateLimiter');
const { PORT, DB_URL } = require('./utils/config');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const app = express();
app.use(helmet()); // настраиваем заголовки ответов
app.use(cors); // проверяем CORS
app.use(LIMITS); // устанавливаем лимиты запросов
app.use(express.json()); // подключаем парсер только для данных формата json
app.use(requestLogger); // подключаем логгер запросов
app.use(routes); // подключаем роуты
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // подключаем хендлер ошибок Celebrate
app.use(handleErrors); // подключаем кастомный хендлер ошибок

app.listen(PORT);
