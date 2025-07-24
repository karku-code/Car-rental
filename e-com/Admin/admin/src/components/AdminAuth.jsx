
import React, { useState } from 'react';
import './AdminAuth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Port 6969 used here
    const url = isLogin
  ? 'http://localhost:6969/admin/login'
  : 'http://localhost:6969/admin/register';

    try {
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.name, email: formData.email, password: formData.password };

      const res = await axios.post(url, payload);

      if (isLogin) {
        alert("✅ Admin login successful");
        localStorage.setItem("email", formData.email);
        localStorage.setItem("username", res.data.username);
        navigate('/dashboard/add-car'); 
      } else {
        alert("✅ Admin registered successfully");
        setIsLogin(true); 
      }

    } catch (err) {
      alert(`❌ ${isLogin ? "Login" : "Register"} failed`);
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Admin Login' : 'Admin Register'}</h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

        <p className="toggle-text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default AdminAuth;
