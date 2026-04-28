import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/productcard.css";

const ProductCard = ({ product }) => {     
    const { addToCart } = useContext(AuthContext);

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />        
            <div className = "product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
                <Link to={`/products/${product._id}`} className="view-details-link">
                View Details</Link>   
            </div>
        </div>
    );
}

export default ProductCard; 