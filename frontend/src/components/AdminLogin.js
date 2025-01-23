import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('http://localhost:5000/login', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        navigate('/admin/dashboard');
      })
      .catch(err => alert('Invalid credentials!'));
  };

  return (
    <div className="login-page">
  <h2>Admin Login</h2>
  <input
    type="text"
    className="form-control"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    type="password"
    className="form-control"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button className="btn btn-danger" onClick={handleLogin}>Login</button>
</div>

  );
};

export default AdminLogin;
