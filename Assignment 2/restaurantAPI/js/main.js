let restaurantData = [];

let currentRestaurant = {};

// the current page that the user is viewing
let page = 1;

// the number of restaurant items we wish to view on each page of our application
const perPage = 10;

//a reference to our current "map" object (leaflet).
let map = null;

// calculate the average score
function avg(grades) {
  let sum = 0;
  for (let i = 0; i < grades.length; i++) {
    sum += grades[i].score;
  }
  var avg = sum / grades.length;
  return avg.toFixed(2);
}

const tableRows = _.template(`
    <% _.forEach(restaurantData, function(rest) { %> /////////////////////////////////
        <tr data-id=<%- rest._id %>>
            <td><%- rest.name %></td>
            <td><%- rest.cuisine %></td>
            <td><%- rest.address.building %> <%- rest.address.street %></td>
            <td><%- avg(rest.grades) %></td>
        </tr>
    <% }); %>
`);

function loadRestaurantData() {
  fetch(
    `https://enigmatic-forest-52710.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`
  )
    .then((response) => response.json())
    .then((data) => {
      restaurantData = data;
      //let tableRowsResult = tableRows({ restaurants: data });
      let tableRowsResult = tableRows(restaurantData);
      $('#restaurant-table tbody').html(tableRowsResult); ////////// NOT SURE ///////////
      $('#current-page').html(page);
    })
    .catch((err) => console.error('Unable to load restaurants data:', err));
}

// Click event for all tr elements within the tbody of the restaurant-table
$('#restaurant-table tbody').on('click', 'tr', function () {
  currentRestaurant = restaurantData.find(
    (rest) => rest._id == $(this).attr('data-id') ////////// NOT SURE ///////////
  );
  $('.modal-title').html(`${currentRestaurant.name}`); ////////// NOT SURE ///////////
  $('#restaurant-address').html(
    `${currentRestaurant.address.building} ${currentRestaurant.address.street}`
  );
  $('#restaurant-borough').html(currentRestaurant.borough);
  $('#restaurant-modal').modal({
    // show the modal programmatically
    backdrop: 'static', // disable clicking on the backdrop to close
    keyboard: false, // disable using the keyboard to close
  });
});

// Click event for the "previous page" pagination button
$('#previous-page').on('click', function () {
  if (page > 1) {
    page--;
    loadRestaurantData();
  }
});

// Click event for the "next page" pagination button
$('#next-page').on('click', function () {
  page++;
  loadRestaurantData();
});

// shown.bs.modal event for the "Restaurant" modal window
$('#restaurant-modal').on('shown.bs.modal', function () {
  map = new L.Map('leaflet', {
    center: [
      currentRestaurant.address.coord[1],
      currentRestaurant.address.coord[0],
    ],
    zoom: 18,
    layers: [
      new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    ],
  });
  L.marker([
    currentRestaurant.address.coord[1],
    currentRestaurant.address.coord[0],
  ]).addTo(map);
});

// hidden.bs.modal event for the "Restaurant" modal window
$('#restaurant-modal').on('hidden.bs.modal', function () {
  map.remove();
});

$(function () {
  loadRestaurantData();
});
