import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import "../styles/home.css";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();

        const sortedData = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

                setProducts(sortedData.slice(0, 12));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="home">

            {/* HERO */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to ShopNest</h1>
                    <p>Discover the best products at unbeatable prices.</p>

                    <div className="hero-buttons">
                        <Link to="/products" className="btn primary">Shop Now</Link>
                        <Link to="/cart" className="btn outline">View Cart</Link>
                    </div>
                </div>
            </section>

            {/* PRODUCTS */}
            <section className="products">
                <h2>Featured Products</h2>

                {loading ? (
                    <p className="loading">Loading...</p>
                ) : (
                    <div className="grid">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
};

export default Home;