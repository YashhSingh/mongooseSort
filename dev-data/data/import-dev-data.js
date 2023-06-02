const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../Model/tourModel');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

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

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully sent');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
