import { useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';

function Restaurants() {
  const location = useLocation();
  const history = useHistory();
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [loading, setLoading] = useState(true);

  let borough = queryString.parse(location.search).borough;
  let fetchURL = `https://enigmatic-forest-52710.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;
  if (borough !== undefined) {
    fetchURL += `&borough=${borough}`;
  }

  useEffect(() => {
    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, location]);

  function previousPage() {
    if (page > 1) setPage((prev) => prev - 1);
  }

  function nextPage() {
    setPage((prev) => prev + 1);
  }

  if (loading) {
    return (
      <>
        <Card bg={'info'} text={'white'}>
          <Card.Body>
            <Card.Title>Loading Restaurants...</Card.Title>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    if (!restaurants || restaurants.length === 0) {
      return (
        <>
          <Card bg={'danger'} text={'white'}>
            <Card.Body>
              <Card.Title>No Restaurants Found!</Card.Title>
            </Card.Body>
          </Card>
        </>
      );
    } else {
      return (
        <>
          <Card bg={'light'} className="mb-4">
            <Card.Body>
              <Card.Title>Restaurant List</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Full list of restaurants. Optionally sorted by borough{' '}
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    history.push(`/restaurant/${restaurant._id}`);
                  }}
                >
                  <td>{restaurant.name}</td>
                  <td>
                    {restaurant.address.building} {restaurant.address.street}
                  </td>
                  <td>{restaurant.borough}</td>
                  <td>{restaurant.cuisine}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </>
      );
    }
  }
}
export default Restaurants;
