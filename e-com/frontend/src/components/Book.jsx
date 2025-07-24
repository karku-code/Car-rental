
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import './Book.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserFriends, FaGasPump, FaCarSide, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const Book = () => {
  const [pickup, setPickup] = useState("");
  const [returnTo, setReturnTo] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const car = location.state;
  const navigate = useNavigate();

  const handleClick = async (carData) => {
    const username = localStorage.getItem("username");
    try {
      const res = await axios.post("http://localhost:6969/book", {
        pickup,
        returnTo,
        carData,
        booking: {
          date: new Date().toISOString(),
          username: username || "Guest"
        }
      });

      toast.success(res.data.message || "Booking Successfully");

      const existing = JSON.parse(localStorage.getItem("allBookings")) || [];
      const updatedBookings = [...existing, res.data];
      localStorage.setItem("allBookings", JSON.stringify(updatedBookings));

      setTimeout(() => navigate("/book"), 1000);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!car) return <div className="text-center mt-5">Car data not available.</div>;

  return (
    <>
      <div className="container py-5 mb-5">
        <div className="row g-5">
          <div className="col-lg-7">
          
          
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="img-fluid rounded mb-4"
              style={{ height: '300px', objectFit: 'cover', width: '100%' }}
            />

            <div className="d-flex flex-wrap justify-content-between gap-0 mb-5 mt-5">
              {[
                { icon: <FaUserFriends size={25} />, label: `${car.sheat} Seats` },
                { icon: <FaGasPump size={25} />, label: car.fuel },
                { icon: <FaCarSide size={25} />, label: car.run },
                { icon: <FaMapMarkerAlt size={25} />, label: car.location },
              ].map((item, idx) => (
                <div key={idx} className="info-box d-flex flex-column align-items-center justify-content-center text-center">
                  {item.icon}
                  <span className="mt-3">{item.label}</span>
                </div>
              ))}
            </div>

            <h4 className="fw-bold mt-4">{car.brand} {car.model}</h4>
            <p className="text-muted">{car.desc}</p>

            <h4 className="mt-4 mb-3 mt-4">Features</h4>
            <div className="row mt-4">
              {Array.isArray(car.features) && car.features.length > 0 ? (
                car.features.map((feature, idx) => (
                  <div className="col-6 mb-2" key={idx}>
                    <FaCheckCircle className="text-primary me-2" /> {feature}
                  </div>
                ))
              ) : (
                <p className="text-muted">No features listed</p>
              )}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card shadow-sm p-4 sticky-top" style={{ top: '100px' }}>
              <h4 className="mb-3">₹{car.rent} <small className="text-muted">/day</small></h4>

              <Form onSubmit={(e) => {
                e.preventDefault();
                if (!pickup || !returnTo) {
                  toast.error("Please fill in both pickup and return dates.");
                  return;
                }

                const pickupDate = new Date(pickup);
                const returnDate = new Date(returnTo);
                if (returnDate < pickupDate) {
                  toast.error("Return date cannot be earlier than pickup date.");
                  return;
                }

                handleClick(car);
              }}>
                <Form.Group className="mb-3">
                  <Form.Label>Pickup Date</Form.Label>
                  <Form.Control type="date" value={pickup} onChange={(e) => setPickup(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Return Date</Form.Label>
                  <Form.Control type="date" value={returnTo} onChange={(e) => setReturnTo(e.target.value)} required />
                </Form.Group>

                <button
                  type="submit"
                  className="btn text-light w-100 mt-2"
                  style={{ backgroundColor: "#000000" }}
                >
                  Book Now
                </button>
              </Form>

              <p className="text-center mt-3 text-muted small">
                No credit card required to reserve
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Book;
