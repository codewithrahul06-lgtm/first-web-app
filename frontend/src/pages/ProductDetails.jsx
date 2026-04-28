import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/productDetails.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ ...product, quantity: 1 }));
            alert(`${product.name} added to cart 🛒`);
        }
    };

    if (loading) return <div className="loading">Loading product details...</div>;
    if (!product) return <div className="error">Product not found.</div>;

    return (
        <div className="product-page">

            <div className="product-container">

                {/* LEFT IMAGE */}
                <div className="product-image-section">
                    <img
                        src={product.image || product.imageUrl}
                        alt={product.name}
                    />
                </div>

                {/* RIGHT INFO */}
                <div className="product-info-section">

                    <h1>{product.name}</h1>

                    <p className="category">{product.category}</p>

                    <h2 className="price">${product.price}</h2>

                    <p className="description">
                        {product.description || "No description available."}
                    </p>

                    <div className="badge-row">
                        <span>✔ In Stock</span>
                        <span>🚚 Fast Delivery</span>
                        <span>🔒 Secure Payment</span>
                    </div>

                    <div className="button-group">

                        <button className="add-btn" onClick={handleAddToCart}>
                           {product.name} Add to Cart 🛒
                        </button>

                        <Link to="/checkout" className="buy-btn">
                            Buy Now ⚡
                        </Link>

                    </div>

                    <Link to="/products" className="back-link">
                        ← Back to Products
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;