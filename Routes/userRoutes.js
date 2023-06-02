const express = require('express');
const userFunctions = require('../controllers/UsersFunction');
const userRouter = express.Router();

userRouter
  .route('/')
  .get(userFunctions.getUsers)
  .post(userFunctions.createUser);

userRouter
  .route('/:id')
  .get(userFunctions.getUser)
  .patch(userFunctions.updateUser)
  .delete(userFunctions.deleteUser);

module.exports = userRouter;
