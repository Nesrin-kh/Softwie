import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/products/${id}`, product, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        alert('Product updated successfully!');
        navigate('/admin/dashboard'); 
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Edit Product</h2>
    <div className="card p-4 shadow">
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">Product Name</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Enter product name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productPrice" className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          id="productPrice"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Enter product price"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productDescription" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="productDescription"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          placeholder="Enter product description"
          rows="4"
        />
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update Product
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/dashboard')}>
          Cancel
        </button>
      </div>
    </div>
  </div>
  );
};

export default EditProduct;
