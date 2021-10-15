import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import queryString from 'query-string';

function Restaurants() {
  let location = useLocation();
  const [restaurants, setRestaurants] = useState('');
  const [page, setPage] = useState('');
  const perPage = 10;

  let boroughParam = queryString.parse(location.search).borough;
  let borough = boroughParam ? boroughParam : '';

  useEffect(() => {
    fetch(
      `https://enigmatic-forest-52710.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
      });
  }, [borough, page]);
}
export default Restaurants;
