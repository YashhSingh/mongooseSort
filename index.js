const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const app = express();

//MIDDLEWARES___
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// this is middleware function post requests me se ye nikal
// k deta hai body jo client ne send ki hai. below wala.
app.use(express.json());
app.use((req, res, next) => {
  console.log('This is middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// THIS IS ROUTE MOUNTING
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
