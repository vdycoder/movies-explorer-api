const mongoose = require('mongoose');
const linkValidation = require('../utils/linkValidation');

const movieSchema = new mongoose.Schema(
  {
    country: {
      // страна создания фильма. Обязательное поле-строка.
      type: String,
      required: [true, `Значение ${this.country} должно быть заполнено.`],
    },

    director: {
      // режиссёр фильма. Обязательное поле-строка.
      type: String,
      required: [true, `Значение ${this.director} должно быть заполнено.`],
    },

    duration: {
      // длительность фильма. Обязательное поле-число.
      type: Number,
      required: [true, `Значение ${this.duration} должно быть заполнено.`],
    },

    year: {
      // год выпуска фильма. Обязательное поле-строка.
      type: String,
      required: [true, `Значение ${this.year} должно быть заполнено.`],
    },

    description: {
      // описание фильма. Обязательное поле-строка.
      type: String,
      required: [true, `Значение ${this.description} должно быть заполнено.`],
    },

    image: {
      // ссылка на постер к фильму. Обязательное поле-строка.
      // Запишите её URL-адресом.
      type: String,
      required: [true, `Значение ${this.image} должно быть заполнено.`],
      validate: {
        validator: (url) => linkValidation.test(url),
        message: 'Переданная строка не является URL.',
      },
    },

    trailerLink: {
      // ссылка на трейлер фильма. Обязательное поле-строка.
      // Запишите её URL-адресом.
      type: String,
      required: [true, `Значение ${this.trailerLink} должно быть заполнено.`],
      validate: {
        validator: (url) => linkValidation.test(url),
        message: 'Переданная строка не является URL.',
      },
    },

    thumbnail: {
      // миниатюрное изображение постера к фильму. Обязательное поле-строка.
      // Запишите её URL-адресом.
      type: String,
      required: [true, `Значение ${this.thumbnail} должно быть заполнено.`],
      validate: {
        validator: (url) => linkValidation.test(url),
        message: 'Переданная строка не является URL.',
      },
    },

    owner: {
      // id пользователя, который сохранил фильм. Обязательное поле.
      type: mongoose.Schema.Types.ObjectId,
      required: [true, `Значение ${this.owner} должно быть заполнено.`],
      reference: 'user',
      ref: 'user',
    },

    movieId: {
      // id фильма, который содержится в ответе сервиса MoviesExplorer.
      // Обязательное поле в формате number.
      type: Number,
      required: [true, `Значение ${this.movieId} должно быть заполнено.`],
    },

    nameRU: {
      // название фильма на русском языке. Обязательное поле-строка.
      type: String,
      required: [true, `Значение ${this.nameRU} должно быть заполнено.`],
    },

    nameEN: {
      // название фильма на английском языке. Обязательное поле-строка.
      type: String,
      required: [true, `Значение ${this.nameEN} должно быть заполнено.`],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
