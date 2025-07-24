
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [viewCar, setViewCar] = useState(null);
  const [editCar, setEditCar] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:6969/api/cars');
      setCars(res.data);
    } catch (err) {
      console.error('Failed to fetch cars', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      await axios.delete(`http://localhost:6969/api/cars/${id}`);
      setCars(prev => prev.filter(car => car._id !== id));
      alert("Car deleted successfully");
    } catch (err) {
      console.error('Failed to delete car', err);
      alert("Failed to delete car");
    }
  };

  const handleEditClick = (car) => {
    setEditCar(car);
    setEditFormData({ ...car, features: car.features.join(', ') });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("brand", editFormData.brand);
      formData.append("model", editFormData.model);
      formData.append("rent", editFormData.rent);
      formData.append("sheat", editFormData.sheat);
      formData.append("fuel", editFormData.fuel);
      formData.append("run", editFormData.run);
      formData.append("location", editFormData.location);
      formData.append("desc", editFormData.desc);
      formData.append("features", JSON.stringify(editFormData.features.split(',').map(f => f.trim())));
      if (editFormData.newImage) {
        formData.append("image", editFormData.newImage);
      }

      await axios.put(`http://localhost:6969/api/cars/${editCar._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      fetchCars();
      alert("Car updated successfully");
      setEditCar(null);
    } catch (err) {
      console.error("Failed to update car", err);
      alert("Failed to update car");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Manage Cars</h2>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Rent</th>
            <th>Seats</th>
            <th>Fuel</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car._id}>
              <td>{index + 1}</td>
              <td>
                <img src={car.image} alt="car" onClick={() => handleEditClick(car)} style={{ width: '80px', height: '50px', objectFit: 'cover', cursor:'pointer' }} />
              </td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.rent}</td>
              <td>{car.sheat}</td>
              <td>{car.fuel}</td>
              <td>{car.location}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => setViewCar(car)}>View</Button>{' '}
                <Button variant="warning" size="sm" onClick={() => handleEditClick(car)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(car._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={!!editCar} onHide={() => setEditCar(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editCar && editFormData && (
            <Form onSubmit={handleEditSubmit} encType="multipart/form-data">
              <Form.Group className="mb-2">
                <Form.Label>Current Image</Form.Label><br />
                <img src={editCar.image} alt="car" style={{ width: '100%', borderRadius: '8px' }} />
              </Form.Group>

              {["brand", "model", "rent", "sheat", "fuel", "run", "location", "desc", "features"].map(field => (
                <Form.Group key={field} className="mb-2">
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control
                    as={field === "desc" ? "textarea" : "input"}
                    name={field}
                    type={field === "rent" || field === "sheat" ? "number" : "text"}
                    value={editFormData[field]}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
              ))}

              <Form.Group className="mb-2">
                <Form.Label>Change Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) =>
                    setEditFormData(prev => ({ ...prev, newImage: e.target.files[0] }))
                  }
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-2">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* View Modal */}
      <Modal show={!!viewCar} onHide={() => setViewCar(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewCar && (
            <>
              <img
                src={viewCar.image}
                alt="car"
                style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
              />
              <p><strong>Brand:</strong> {viewCar.brand}</p>
              <p><strong>Model:</strong> {viewCar.model}</p>
              <p><strong>Rent:</strong> ₹{viewCar.rent}</p>
              <p><strong>Seats:</strong> {viewCar.sheat}</p>
              <p><strong>Fuel:</strong> {viewCar.fuel}</p>
              <p><strong>Run:</strong> {viewCar.run}</p>
              <p><strong>Location:</strong> {viewCar.location}</p>
              <p><strong>Description:</strong> {viewCar.desc}</p>
              <p><strong>Features:</strong> {Array.isArray(viewCar.features) ? viewCar.features.join(', ') : viewCar.features}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageCars;
