import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './MainPage.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="main-page">
      <header>
  <h1>Welcome to Glow Skin Care</h1>
  <button className="btn btn-danger" onClick={() => navigate('/admin')}>Admin Login</button>
</header>
<br></br>
<div className="products-container">
  {products.map(product => (
    <div key={product.id} className="product-card card">
      <img src="https://as1.ftcdn.net/v2/jpg/03/73/93/76/1000_F_373937605_d13Ke4rfcDZB3XCmWr7SCumhzi4iSRaw.jpg" alt="Product" className="card-img-top" />
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">{product.description}</p>
        <p className="card-text">${product.price.toFixed(2)}</p>
        <button className="btn btn-pink" onClick={() => navigate('/cart')}>Add to Cart</button>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default MainPage;
