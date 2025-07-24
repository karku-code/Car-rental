

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Featured.css';

import Logo1 from "../assets/person.png";
import Logo2 from "../assets/fuel.png";
import Logo3 from "../assets/car.png";
import Logo4 from "../assets/location.png";
import { useNavigate } from 'react-router-dom';

const Featured = () => {
  const [cars, setCars] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    AOS.init({ once: true });

    fetch('http://localhost:6969/api/cars')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched cars:", data);
        setCars(data);
      })
      .catch(err => console.error('Failed to fetch cars:', err));
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const visibleCars = cars.slice(0, visibleCount);

  return (
    <Container className="py-5">
      <Row className="g-4">
        <h2 className='text-center'>Featured Vehicles</h2>
        <p  className='text-center'>Explore our Selections of premium vehicle available for your next adventure</p>
        {visibleCars.map((car) => (
          <Col key={car._id} xs={12} md={6} lg={4}>
            <CarCard car={car} />
          </Col>
        ))}
      </Row>

      {visibleCount < cars.length && (
        <div className="py-4 text-center">
          <button
            onClick={handleLoadMore}
            className="btn text-light"
            style={{ backgroundColor: "#000000" }}
          >
            Explore more ⇨
          </button>
        </div>
      )}
    </Container>
  );
};

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/booking/${car._id}`, { state: car });
  };

  
  const imageUrl = car.image?.startsWith('http')
    ? car.image
    : `http://localhost:6969/uploads/${car.image}`;

  return (
    <div
      onClick={handleClick}
      className="car-card m-4 shadow-sm border rounded"
      style={{ cursor: "pointer", backgroundColor: "#fff" }}
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
      <div className="image-container position-relative">
        <img
          src={imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="car-img w-100"
          style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
        />
        <div
          className="position-absolute top-0 end-0 m-2 px-3 py-1 text-white bg-dark bg-opacity-75 rounded-pill"
          style={{ fontSize: '0.9rem', fontWeight: '500' }}
        >
          ${car.rent}/day
        </div>
      </div>
      <div className="car-details p-3">
        <h5 className="mb-1">{car.brand}</h5>
        <p className="text-muted mb-2">{car.model}</p>
        <div className="d-flex justify-content-between small mb-1">
          <span>
            <img src={Logo1} alt="seat" className="icon me-1" /> {car.sheat} Seats
          </span>
          <span>
            <img src={Logo2} alt="fuel" className="icon me-1" /> {car.fuel}
          </span>
        </div>
        <div className="d-flex justify-content-between small">
          <span>
            <img src={Logo3} alt="gear" className="icon me-1" /> {car.run}
          </span>
          <span>
            <img src={Logo4} alt="location" className="icon me-1" /> {car.location}
          </span>
        </div>
      </div>
    </div>
  );
};


export default Featured;
