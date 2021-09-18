const express = require('express');
const cors = require('cors');
const RestaurantDB = require('./modules/restaurantDB.js');
const db = new RestaurantDB();
const app = express();
const HTTP_PORT = process.env.PORT || 6060;

// Add support for incoming JSON entities
app.use(express.json());
// Add support for CORS
app.use(cors());

// Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  res.json({ message: 'API Listening' });
});

app.get('/api/restaurants', (req, res) => {
  // MUST return HTTP 201
  res.status(201).json(RestaurantDB.addNewRestaurant(req.body));
});

app.post('/api/restaurants', (req, res) => {
  // MUST return HTTP 201
  res.status(201).json(RestaurantDB.addNewRestaurant(req.body));
});

// Tell the app to start listening for requests
// app.listen(HTTP_PORT, () => {
//   console.log('Ready to handle requests on port ' + HTTP_PORT);
// });

db.initialize(
  'mongodb+srv://ass6User:AmirHS1380@cluster0.wbukp.mongodb.net/sample_restaurants?retryWrites=true&w=majority'
)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
