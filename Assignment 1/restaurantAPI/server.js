const express = require('express');
const cors = require('cors');
const RestaurantDB = require('./modules/restaurantDB.js');
const db = new RestaurantDB();
const app = express();
const HTTP_PORT = process.env.PORT || 6060;
const dotenv = require('dotenv').config();
const mongoLogin = process.env.MONGODB_CONN_STRING;

// Add support for incoming JSON entities
app.use(express.json());
// Add support for CORS
app.use(cors());

// Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  res.json({ message: 'API Listening' });
});

/* This route returns all "Restaurant" objects for a specific "page" to
the client as well as optionally filtering by "borough", if provided. */
app.get('/api/restaurants', (req, res) => {
  let page = req.query.page;
  let perPage = req.query.perPage;
  let borough = req.query.borough;
  db.getAllRestaurants(page, perPage, borough).then((data) => {
    if (data.length != 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        message: 'No restaurant was found!',
      });
    }
  });
});

/* This route must accept a numeric route parameter that represents the 
_id of the desired restaurant object to return a specific "Restaurant"
object to the client. */
app.get('/api/restaurants/:id', (req, res) => {
  let id = req.params.id;
  db.getRestaurantById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: 'No match was found!',
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
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
      res.status(400).json({
        message: err,
      });
    });
});

// This route will will use this value to delete a specific "Restaurant" document
app.delete('/api/restaurants/:id', (req, res) => {
  let id = req.params.id;
  db.deleteRestaurantById(id)
    .then(() => {
      res.status(204).json({
        message: `The restaurant with id ${id} deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
});

/* This route uses the body of the request to add a new "Restaurant" 
document to the collection */
app.post('/api/restaurants', (req, res) => {
  // MUST return HTTP 201
  db.addNewRestaurant(req.body)
    .then(() => {
      res.status(201).json({
        message: 'Restaurant added successfully!',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not add the restaurant!',
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
    console.log(err);
  });
