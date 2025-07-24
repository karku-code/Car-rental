import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Mybook.css"

const Mybook = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
const currentUser = localStorage.getItem("username");


  useEffect(() => {
  const saved = localStorage.getItem("allBookings");
  if (saved) {
    const all = JSON.parse(saved);

    // Filter only the bookings that match the current logged-in user
    const userBookings = all.filter(b => b.booking?.username === currentUser);

    setBookings(userBookings);
  }
}, [currentUser]); // <— re-run effect if username changes


  if (bookings.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>No bookings found</h3>
        <button className="btn btn-dark mt-3 mb-5" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const getDateDifference = (bookingDateStr) => {
  if (!bookingDateStr) return "Date unknown";
  const booked = new Date(bookingDateStr);
  const today = new Date();

  const diffTime = today - booked;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Booked today";
  if (diffDays === 1) return "Booked 1 day ago";
  return `Booked ${diffDays} days ago`;
};

  const handleClearBookings = () => {
  localStorage.removeItem("allBookings");
  setBookings([]);
};

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Bookings</h2>
      <p className="text-center text-muted">View and manage your all car bookings</p>

      {bookings.map((data, index) => (
        <div key={index} className="card mb-4 shadow-sm p-3 border-0">
          <div className="row g-3 align-items-center">
            <div className="col-md-3 d-flex justify-content-center align-items-center">

 <img src={data.car?.image}
  alt={`${data.car?.brand} ${data.car?.model}`}
  className="img-fluid rounded booking-image"
/>

</div>
            <div className="col-md-6">
              <h5>{data.car?.brand} {data.car?.model}</h5>
              {/* <p className="mb-1">Booking #{index + 1} <span className="badge bg-danger">Pending</span></p> */}
              <p className="mb-1"><strong>Rental Period:</strong> {data.booking?.pickup} to {data.booking?.returnTo}</p>
              <p className="mb-1"><strong>Pick-up Location:</strong> {data.car?.location || "N/A"}</p>
              <p className="mb-1 text-muted">
  Booked on {data.booking?.date 
    ? new Date(data.booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) 
    : "Unknown"} by {data.booking?.username || "Unknown"}
</p>

            </div>
            <div className="col-md-3 text-md-end text-start">
              <p className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>{getDateDifference(data.booking?.date)}</p>
              <h5 className="text-primary">Total Price</h5>
              <h4 className="fw-bold text-success">₹{data.booking?.totalPrice}</h4>
            </div>
          </div>
        </div>
      ))}

      <div className="text-center mt-3">
  <button className="btn btn-danger me-2 mb-4" onClick={handleClearBookings}>
    Clear All Bookings
  </button>
  </div>

    </div>
  );
};

export default Mybook;
