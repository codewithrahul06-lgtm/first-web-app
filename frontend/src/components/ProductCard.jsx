import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/productcard.css";
import { toast } from 'react-toastify';
    

const ProductCard = ({ product }) => {     
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        toast.success(`${product.name} added to cart!`);
    };

    return (


<div className="product-card">
  <Link to={`/products/${product._id}`} className="product-link">
    <img src={product.imageUrl} alt={product.name} className="product-image" />
    <div className="product-info">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
      <span className="view-details-link">View Details</span> {/* Optional, if you want to keep the "View Details" text */}
    </div>
  </Link>
</div>
    );
}

export default ProductCard; 