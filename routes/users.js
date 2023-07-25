const userRouter = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');
const {
  userDataValidator,
} = require('../middlewares/dataValidations');

// роут возвращает информацию о пользователе (email и имя)
userRouter.get('/me', getUser);

// роут обновляет информацию о пользователе (email и имя)
userRouter.patch('/me', userDataValidator, updateUser);

module.exports = userRouter;
