/*********************************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Amirhossein Sabagh     Student ID: 152956199     Date: 2021-08-17
 * Heroku Link: https://enigmatic-forest-52710.herokuapp.com
 *
 * ******************************************************************************************/
const express = require('express');
const cors = require('cors');
const RestaurantDB = require('./modules/restaurantDB.js');
const db = new RestaurantDB();
const app = express();
const path = require('path');
const HTTP_PORT = process.env.PORT || 6060;
require('dotenv').config();
// query validation
const { query, validationResult } = require('express-validator');

// Add support for incoming JSON entities
app.use(express.json());
// Add support for CORS
app.use(cors());

const mongoLogin = process.env.MONGODB_CONN_STRING;
// If we don't have it, crash immediately
if (!mongoLogin) {
  console.error('missing environment variable MONGODB_CONN_STRING');
  process.exit(1);
}

// Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  //res.json({ message: 'API Listening' });
  res.sendFile(path.join(__dirname, '/index.html'));
});

/* This route uses the body of the request to add a new "Restaurant" 
 document to the collection */
app.post('/api/restaurants', (req, res) => {
  // MUST return HTTP 201
  db.addNewRestaurant(req.body)
    .then((restaurant) => {
      res.status(201).json({
        _id: restaurant._id,
        message: 'Restaurant added successfully!',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Could not add the restaurant! Error: ${err}`,
      });
    });
});

/* This route returns all "Restaurant" objects for a specific "page" to
 the client as well as optionally filtering by "borough", if provided. */
app.get(
  '/api/restaurants',
  [
    query('page')
      .isInt({ min: 1 })
      .withMessage('page param must be the whole number 1 or greater.'),
    query('perPage')
      .isInt({ min: 1 })
      .withMessage('perPage param must be the whole number 1 or greater.'),
    query('borough').isString().optional(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // let page = req.query.page;
    // let perPage = req.query.perPage;
    // let borough = req.query.borough;
    const { page, perPage, borough } = req.query;
    db.getAllRestaurants(page, perPage, borough)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          message: `No restaurant was found! Error: ${err}`,
        });
      });
  }
);

/* This route must accept a numeric route parameter that represents the 
 _id of the desired restaurant object to return a specific "Restaurant"
 object to the client. */
app.get('/api/restaurants/:id', (req, res) => {
  let id = req.params.id;
  db.getRestaurantById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: `No match was found! Error: ${err}`,
      });
    });
});

// This route will update a specific "Restaurant" document in the collection.
app.put('/api/restaurants/:id', (req, res) => {
  let id = req.params.id;
  db.updateRestaurantById(req.body, id)
    .then(() => {
      res.status(204).json({
        message: `The restaurant with id ${id} updated successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `an error occurred: ${err}`,
      });
    });
});

// This route will will use this value to delete a specific "Restaurant" document
app.delete('/api/restaurants/:id', (req, res) => {
  let id = req.params.id;
  db.deleteRestaurantById(id)
    .then(() => {
      // res.status(204).json({
      //   message: `The restaurant with id ${id} deleted successfully!`,
      // });
      res.status(204).end();
    })
    .catch((err) => {
      res.status(500).json({
        message: `an error occurred: ${err}`,
      });
    });
});

// Tell the app to start listening for requests
db.initialize(mongoLogin)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}.`);
      console.log('Link: https://localhost::6060');
    });
  })
  .catch((err) => {
    console.error(err);
  });
