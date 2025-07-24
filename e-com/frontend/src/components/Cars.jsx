
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Cars = () => {
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

  return (
    <div className='container py-4'>
      <div className='row'>
        {cars.map((car, index) => {
          <img  src={car.image}></img>
          
          console.log("Car Image:", car.image); 

          return (
            <div
              className='col-md-4 mb-4'
              key={car._id || index}
              data-aos='fade-up'
              data-aos-delay={index * 100}
            >
            
              </div>
          
          );
        })}
      </div>
    </div>
  );
};
export default Cars;
