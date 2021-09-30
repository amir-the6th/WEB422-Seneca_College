let restaurantData = [];

let currentRestaurant = {};

// the current page that the user is viewing
let page = 1;

// the number of restaurant items we wish to view on each page of our application
const perPage = 10;

//a reference to our current "map".
let map = null;

// calculate the average score
function avg(grades) {}

let tableRows = _.template(`
    <% restData.forEach(function(rest) { %>
        <tr data-id="<%- rest._id %>">
            <td><%- rest.name %></td>
            <td><%- rest.cuisine %></td>
            <td><%- rest.address.building %> <%- rest.address.street %></td>
            <td> avg(grades) </td> ///////// NOT SURE ABOUT THIS ///////// 
        </tr>
    %> }); %>
`);

function loadRestauarantData() {
  fetch('/api/restaurants?page=page&perPage=perPage')
    .then((response) => response.json())
    .then((data) => {
      restaurantData = data;
      let tableRowsResult = tableRows({ restaurants: data });
      $('.restaurant-table tbody').html(tableRowsResult); ////////// NOT SURE ///////////
      $('.current-page').html(page);
    });
}

$(function () {
  loadRestauarantData();
  $('.restaurant-table tbody').on('click', 'tr', function () {});
});
