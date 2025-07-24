import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Deal = () => {
  return (
    <>
      <div className="container text-center py-5 mb-5">
        <h2 className='pb-3'>Never Miss a Deal!</h2>
        <p className="mb-4">Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>

        <form className="row justify-content-center g-0">
          <div className="col-12 col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email ID"
              required
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#000000", color: "white" }}
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Deal;
