import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/addProduct.css";

const EditProduct = () => {
  const { id } = useParams();
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

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      setForm({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
      });

      setPreview(data.imageUrl);
    };

    fetchProduct();
  }, [id]);

  // TEXT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGE CHANGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("stock", form.stock);

    if (image) {
      data.append("image", image);
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
      body: data,
    });

    if (res.ok) {
      navigate("/admin/products");
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="add-product-container">

      <form className="add-product-card" onSubmit={handleUpdate}>

        <h2>Edit Product</h2>
        <p>Update product details</p>

        {/* NAME */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* CATEGORY */}
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />

        {/* STOCK */}
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          required
        />

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
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
          Update Product
        </button>

      </form>
    </div>
  );
};

export default EditProduct;