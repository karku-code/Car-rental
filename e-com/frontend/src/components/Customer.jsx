import React from 'react';
import Logo1 from "../assets/p1.png";
import Logo2 from "../assets/p2.png";
import Logo3 from "../assets/p3.png";
import Rat from "../assets/rat.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const Customer = () => {
  const reviews = [
    {
      img: Logo1,
      name: 'Emma Rodrigueuz',
      location: "Aavadi, Chennai",
      rat: Rat,
      para: "I've rented cars from various companies, but the experience with CarRental was exceptional."
    },
    {
      img: Logo2,
      name: 'John Smith',
      location: "Race Course, Coimbatore",
      rat: Rat,
      para: "CarRental made my trip so easier. The car was delivered right to my door, and the customer service was fantastic."
    },
    {
      img: Logo3,
      name: 'Sophia Johnson',
      location: "Anna Nagar, Madurai",
      rat: Rat,
      para: "I highly recommend CarRental! I always feel like I'm getting the best deal with excellent service."
    }
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-3">What Our Customers Say</h2>
      <p className="text-center mb-5">
        Discover why discerning travelers choose CarRental for their luxury travel needs across the country.
      </p>

      <div className="row">
        {reviews.map((review, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-1">
                  <img
                    src={review.img}
                    alt="Customer"
                    className="rounded-circle me-3"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <div>
                    <h5>{review.name}</h5>
                    <p className="text-muted mb-0">{review.location}</p>
                  </div>
                </div>
                <img src={review.rat} alt="rating" style={{ width: "90px" }} className="" />
                <p className="mb-0">{review.para}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
