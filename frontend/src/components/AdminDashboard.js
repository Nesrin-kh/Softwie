import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/products', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setProducts(response.data))
      .catch(err => console.error(err));
  }, [token]);

  const handleAddProduct = () => {
    axios.post('http://localhost:5000/products', newProduct, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  

  return (
    <div className="admin-dashboard">
  <h2>Admin Dashboard</h2>

  <div className="product-form">
    <input
      type="text"
      className="form-control"
      placeholder="Product Name"
      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
    />
    <input
      type="number"
      className="form-control"
      placeholder="Price"
      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
    />
    <textarea
      className="form-control"
      placeholder="Description"
      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
    />
     <button className="btn btn-danger"  onClick={handleAddProduct}>Add Product</button>
  </div>

  <div className="products-list">
    {products.map(product => (
      <div key={product.id}>
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <div>
        <Link to={`/admin/edit/${product.id}`}>
                <button className="btn btn-warning">Edit</button>
        </Link>  
        </div>
        <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
        
      </div>
    ))}
  </div>
</div>

  );
};

export default AdminDashboard;
