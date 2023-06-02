const express = require('express');
const tourFunctions = require('../controllers/tourFunctions');
const tourRouter = express.Router();

// tourRouter.param('id', tourFunctions.CheckId);

tourRouter
  .route('/')
  .get(tourFunctions.getAllTour)
  .post(tourFunctions.createTour);

tourRouter
  .route('/:id')
  .get(tourFunctions.getTour)
  .patch(tourFunctions.updateTour)
  .delete(tourFunctions.deleteTour);

module.exports = tourRouter;
