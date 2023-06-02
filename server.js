const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./Model/tourModel');
dotenv.config({ path: './config.env' });
const app = require('./index');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB connection successful!');
  });

//STARTING SERVER

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
