import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Car.css';
import Logo1 from '../../../assets/person.png';
import Logo2 from '../../../assets/fuel.png';
import Logo3 from '../../../assets/car.png';
import Logo4 from '../../../assets/location.png';
import { useNavigate } from 'react-router-dom';

const Car = ({ search }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    AOS.init({ once: true });

    fetch('http://localhost:6969/api/cars')
      .then(res => res.json())
      .then(data => {
        console.log("Car data:", data);
        setCars(data);
      })
      .catch(err => console.error('Failed to fetch cars:', err));
  }, []);

  const filterCard = cars.filter((car) =>
    car.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-5">
      <Row className="g-4">
        {filterCard.map((car) => (
          <Col key={car._id} xs={12} md={6} lg={4}>
            <CarCard car={car} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const [isAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  const handleClick = () => {
    navigate(`/booking/${car._id}`, { state: car });
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent navigation on card click
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:6969/api/cars/${car._id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert("Car deleted successfully");
        window.location.reload(); // or lift state up and filter it instead
      } else {
        alert("Failed to delete car");
      }
    } catch (err) {
      console.error("Error deleting car:", err);
      alert("Error deleting car");
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      className="car-card m-4"
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
      <div className="image-container position-relative">
     <img
  src={car.image}

          
          alt={`${car.brand} ${car.model}`}
          className="car-img w-100"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div
          className="position-absolute top-0 end-0 m-2 px-3 py-1 text-white bg-dark bg-opacity-75 rounded-pill"
          style={{ fontSize: '0.9rem', fontWeight: '500' }}
        >
          ${car.rent}/day
        </div>
      </div>
      <div className="car-details p-3">
        <h5>{car.brand}</h5>
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
        {isAdmin && (
          <div className="text-end mt-3">
            <button className="btn btn-sm btn-danger" onClick={handleDelete}>
              remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};



export default Car;
