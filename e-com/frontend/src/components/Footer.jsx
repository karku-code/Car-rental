import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarImg from '../assets/bg1.png';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-3">
      <div className="container">
        <div className="row">

          
          <div className="col-md-3 mb-4">
            <h5>CarRental</h5>
            <p>
              Drive your dreams with ease. Trusted by thousands across India. Enjoy secure, luxurious, and reliable rides every day.
            </p>
          </div>

         
          <div className="col-md-3 mb-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Home</a></li>
              <li><a href="#" className="text-white text-decoration-none">Cars</a></li>
              <li><a href="#" className="text-white text-decoration-none">Offers</a></li>
              <li><a href="#" className="text-white text-decoration-none">Book Now</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <h6>Resources</h6>
            <ul className="list-unstyled">
              <li>Help Center</li>
              <li>Term's of service</li>
              <li>Privacy Policy</li>
              <li>Insurance</li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6>Contact Us</h6>
            <ul className="list-unstyled">
              <li>Email: support@carrental.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Location: Chennai, India</li>
            </ul>
          </div>


        </div>

        <hr className="border-secondary" />

        <div className="text-center small">
          © {new Date().getFullYear()} CarRental. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
