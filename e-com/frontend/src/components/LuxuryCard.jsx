import React from 'react';
import BMW from "../assets/bmw1.png";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'aos/dist/aos.css';
import AOS from 'aos';

import { useEffect } from 'react';

const LuxuryCard = () => {
     useEffect(() => {
        AOS.init({ once: true }); 
      }, []);

    return (
    <div style={{borderRadius:"40px"}} className="container bg-light mt-3 mb-5 ">
      <div className="row align-items-center" style={{ minHeight: '45vh' }}>
        <div className="col-md-7 text-center text-md-start px-5">
          <h1 className="mb-3">Do You Own a Luxury Car?</h1>
          <p className="mb-4">
            Monetize your vehicle effortlessly by listing it on <strong>CarRental</strong>
            We take care of insurance, driver verification, and secure payments — so
            you can earn passive income, stress-free.
          </p>
          <button className="btn btn-dark">List your Car</button>
        </div>

        
        <div className="col-md-5 text-center" 
             data-aos="fade-left"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine"
        >
          <img
            src={BMW}
            
            alt="Luxury Car"
            className="img-fluid"
            style={{ maxHeight: '50vh', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LuxuryCard;
