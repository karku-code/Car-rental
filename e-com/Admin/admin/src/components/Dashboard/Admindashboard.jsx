
import React from 'react';
import './Admindashboard.css';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { FaCar, FaListAlt, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    navigate('/');
  };

  const navItemStyle = (path) => ({
    color: location.pathname === path ? '#00bcd4' : 'white',
    backgroundColor: location.pathname === path ? '#1c1c1c' : 'transparent',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: '0.3s',
  });

  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <div
        className="sidebar"
        style={{
          width: '240px',
          backgroundColor: '#2c3e50',
          padding: '20px',
          color: 'white',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        }}
      >
        <h4 style={{ marginBottom: '30px', color: '#ecf0f1' }}>🚗 Admin Panel</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li
            onClick={() => navigate('/dashboard/add-car')}
            style={navItemStyle('/dashboard/add-car')}
          >
            <FaCar /> Add Car
          </li>
          <li
            onClick={() => navigate('/dashboard/manage-cars')}
            style={navItemStyle('/dashboard/manage-cars')}
          >
            <FaListAlt /> Manage Cars
          </li>
          <li
            onClick={handleLogout}
            style={{ ...navItemStyle('/logout'), color: 'tomato' }}
          >
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      <div className="main-content" style={{ flex: 1, padding: '30px' }}>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '25px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            minHeight: '85vh',
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
