const express = require('express');
const cors = require('cors');
const RestaurantDB = require('./modules/restaurantDB.js');
const db = new RestaurantDB();
const app = express();
const HTTP_PORT = process.env.PORT || 6060;

// Add support for incoming JSON entities
app.use(express.json());

app.use(cors());

// Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  res.json({ message: 'API Listening' });
});

// Tell the app to start listening for requests
app.listen(HTTP_PORT, () => {
  console.log('Ready to handle requests on port ' + HTTP_PORT);
});
