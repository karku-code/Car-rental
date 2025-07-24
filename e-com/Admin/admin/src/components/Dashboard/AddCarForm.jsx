import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './AddCarForm.css';

const AdminAddCarForm = ({ onSuccess = () => {} }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    rent: '',
    sheat: '',
    fuel: '',
    run: '',
    location: '',
    desc: '',
    features: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Trim leading whitespace
    setFormData({ ...formData, [name]: value.trimStart() });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        if (key === 'features') {
          data.append(key, JSON.stringify(formData[key].split(',').map(f => f.trim())));
        } else if (key === 'image' && formData[key]) {
          data.append(key, formData[key]);
        } else {
          data.append(key, formData[key]);
        }
      }

      await axios.post('http://localhost:6969/api/cars/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert("✅ Car added successfully");

      // Reset form
      setFormData({
        brand: '',
        model: '',
        rent: '',
        sheat: '',
        fuel: '',
        run: '',
        location: '',
        desc: '',
        features: '',
        image: null
      });
      document.querySelector('input[name="image"]').value = '';

      onSuccess(); // Safe now
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add car");
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data" className="form-wrapper">
      <h2 className="form-heading">Add New Car</h2>

      <Form.Group className="form-group">
        <Form.Label className="form-label">Brand</Form.Label>
        <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="form-label">Model</Form.Label>
        <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="form-label">Rent</Form.Label>
        <Form.Control type="number" name="rent" value={formData.rent} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="form-label">Seats</Form.Label>
        <Form.Control type="number" name="sheat" value={formData.sheat} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="form-label">Fuel</Form.Label>
        <Form.Control type="text" name="fuel" value={formData.fuel} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="form-label">Transmission</Form.Label>
        <Form.Control type="text" name="run" value={formData.run} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="form-label">Location</Form.Label>
        <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="form-label">Description</Form.Label>
        <Form.Control as="textarea" name="desc" value={formData.desc} onChange={handleChange} rows={2} required />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="form-label">Features (comma separated)</Form.Label>
        <Form.Control type="text" name="features" value={formData.features} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Label className="form-label">Image</Form.Label>
        <Form.Control type="file" name="image" accept="image/*" onChange={handleImageChange} required />
      </Form.Group>

      <Button type="submit" variant="success" size="sm" className="btn-submit">
        Add Car
      </Button>
    </Form>
  );
};

export default AdminAddCarForm;
