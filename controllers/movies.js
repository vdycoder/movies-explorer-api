const {
  VALIDATION_DB_DATA_ERROR,
  CAST_DB_DATA_ERROR,
  INVALID_DATA_ERROR_MESSAGE,
  MOVIE_NOT_FOUND_ERROR_MESSAGE,
  PERMISSION_DENIED_ERROR_MESSAGE,
  STATUS_DELETED,
  STATUS_CREATED,
} = require('../utils/constants');

const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_DB_DATA_ERROR) {
        next(new BadRequestError(INVALID_DATA_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(MOVIE_NOT_FOUND_ERROR_MESSAGE));
      } else if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError(PERMISSION_DENIED_ERROR_MESSAGE));
      } else {
        movie.deleteOne(movie)
          .then(() => res.status(STATUS_DELETED).send(movie))
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err.name === CAST_DB_DATA_ERROR) {
        next(new BadRequestError(INVALID_DATA_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
