import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/addProduct.css";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // TEXT INPUTS
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGE INPUT
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("stock", form.stock);
    data.append("image", image);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
      body: data,
    });

    if (res.ok) {
      navigate("/admin/products");
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div className="add-product-container">

      <form className="add-product-card" onSubmit={handleSubmit}>

        <h2>Add Product</h2>
        <p>Upload product with image</p>

        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleChange}
          required
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          required
        />

        {/* PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="preview-img"
          />
        )}

        <button type="submit" className="submit-btn">
          + Add Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;