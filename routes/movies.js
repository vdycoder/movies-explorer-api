const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidator,
  movieIdValidator,
} = require('../middlewares/dataValidations');

// роут возвращает все сохранённые текущим пользователем фильмы
movieRouter.get('/', getMovies);

// роут создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU,
// nameEN и thumbnail, movieId
movieRouter.post('/', createMovieValidator, createMovie);

// роут удаляет сохранённый фильм по id
movieRouter.delete('/:movieId', movieIdValidator, deleteMovie);

module.exports = movieRouter;
