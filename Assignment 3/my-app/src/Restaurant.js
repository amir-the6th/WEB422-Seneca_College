import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

function Restaurant() {
  //const location = useLocation();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    console.log('Hello');
    fetch(`https://enigmatic-forest-52710.herokuapp.com/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.hasOwnProperty('_id')) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Card bg={'info'} text={'white'}>
          <Card.Body>
            <Card.Title>Loading The Restaurant...</Card.Title>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    if (!restaurant) {
      return (
        <>
          <Card bg={'danger'} text={'white'}>
            <Card.Body>
              <Card.Title>No Restaurant Found with ID: {id}</Card.Title>
            </Card.Body>
          </Card>
        </>
      );
    } else {
      return (
        <>
          <Card bg={'light'} className="mb-2">
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {restaurant.address.building} {restaurant.address.street}
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <MapContainer
            style={{ height: '400px' }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
            className="mb-2"
          >
            {' '}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{' '}
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>{' '}
          </MapContainer>
          <br />
          <h3>Ratings</h3>
          <hr />
          <CardDeck className="mb-4">
            {restaurant.grades.map((grade) => {
              return (
                <Card>
                  <Card.Header>Grade: {grade.grade}</Card.Header>
                  <Card.Body>
                    <Card.Subtitle className="mb-1 text-muted">
                      Completed: {new Date(grade.date).toLocaleDateString()}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              );
            })}
          </CardDeck>
        </>
      );
    }
  }
}
export default Restaurant;
