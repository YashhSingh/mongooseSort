const fs = require('fs');
const express = require('express');
const Tour = require('../Model/tourModel');

//request functions..

//get all tour
exports.getAllTour = async (req, res) => {
  //FILTERING
  const queryObj = { ...req.query }; // taking a copy of query object
  const queryExtra = ['page', 'limit', 'sort', 'fields'];

  queryExtra.forEach((el) => delete queryObj[el]);

  //ADVANCED FILTERING
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let quereisTours = Tour.find(JSON.parse(queryStr));

  //SORTING
  if (req.query.sort) {
    console.log(req.query.sort);
    // let sortBy = req.query.sort.split(',').join(' ');
    quereisTours = quereisTours.sort(req.query.sort);
  }

  // FIELDS
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    quereisTours = quereisTours.select(fields);
  } else {
    quereisTours = quereisTours.select('-__v');
  }

  //EXECUTE QUERY
  const tours = await quereisTours;

  res.status(200).json({
    state: 'success',
    results: tours.length,
    data: {
      tour: tours,
    },
  });
};

//CREATING THE TOUR (CREATE)
exports.createTour = async (req, res) => {
  try {
    //const newTour = new Tour({})
    // newTour.save();
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid data sent.!',
      data: err,
    });
  }
};

//GET TOUR WITH ID (READ)
exports.getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: tour,
  });
};

//UPDATE TOUR (UPDATE)
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log('this is working' + req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Update Request failed',
      data: err,
    });
  }
};

//DELETE TOUR (DELETE)
exports.deleteTour = async (req, res) => {
  try {
    const tourDel = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Delete request failed',
      data: err,
    });
  }
};
