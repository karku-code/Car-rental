import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Car from '../cars/Car';

const Available = () => {
    const[search,setSearch]=useState('')



  return (
<>
    <div style={{backgroundColor:"#dee2e6"}}>

    <div className="container py-5 mb-5 pb-5">
      <div className="text-center mb-4">
        <h2 className='mb-4'>Available Luxury Collections</h2>
        <p className='mb-4'>Browse our selection of premium vehicles available for your next adventure</p>
      </div>

      <form className="d-flex justify-content-center ">
        <div className="input-group w-75 w-md-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search by car name"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
          <span className="input-group-text bg-white">
            <FaSearch  />
          </span>
        </div>
      </form>
    </div>
            </div>
            <Car search={search}/>
            </>
  );
};

export default Available;
