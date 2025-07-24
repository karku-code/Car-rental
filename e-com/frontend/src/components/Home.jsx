import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './Home.css';
import Car from "../assets/carss.jpg";
import Featured from './Featured';
import LuxuryCard from './LuxuryCard';
import Customer from './Customer';
import Deal from "./Deal"
import Cars from './Cars';
import 'aos/dist/aos.css';
import AOS from 'aos';

import { useEffect } from 'react';


const Home = () => {
   useEffect(() => {
    AOS.init({ once: true }); 
  }, []);

  return (
<>
    <div className="home text-center">
      {/* Heading & Search Card */}
      <Container className="py-5 d-flex flex-column align-items-center">
        <h3 className="fw-bold mb-4 pb-3">Luxury cars on Rent</h3>

        <Card style={{backgroundColor:'#000000'}} className="p-4 border-0 rounded-5 shadow custom-search-card w-100">
          <Form>
            <Row className="g-3 align-items-center justify-content-center">
              <Col xs={12} md={3}>
                <Form.Label className="fw-semibold ps-2 text-light">Pickup Location</Form.Label>
                <Form.Select className="input-no-border rounded-4 py-2">
                  <option>Please select location</option>
                  <option value="chennai">Chennai</option>
                  <option value="bangalore">Bangalore</option>
                </Form.Select>
              </Col>

              <Col xs={12} md={3}>
                <Form.Label className="fw-semibold ps-2 text-light">Pick-up Date</Form.Label>
                <Form.Control type="date" className="input-no-border rounded-4 py-2" />
              </Col>

              <Col xs={12} md={3}>
                <Form.Label className="fw-semibold ps-2 text-light">Return Date</Form.Label>
                <Form.Control type="date" className="input-no-border rounded-4 py-2" />
              </Col>

              <Col xs={12} md={2} className="d-grid align-self-end">
                <Button style={{ backgroundColor: "#ffffff" ,color:"#000000"}} className="rounded-5 btn-dark py-2 fw-semibold">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>

      <div className="car-image-container mt-2"
      data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="1500"
     >
        <img src={Car} className="img-fluid car-image" alt="car" />
      </div>
    </div>
    <Featured/>
    <LuxuryCard/>
    <Customer/>
    <Deal/>
    <Cars/>
    </>
  );
};

export default Home;
