import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/adminMaterial.css";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });

    if (res.ok) {
      setProducts(products.filter((p) => p._id !== id));
    } else {
      alert("Delete failed");
    }
  };

  const changeStatus = async (id, status) => {
    const res = await fetch(`/api/products/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      const updated = await res.json();

      setProducts(
        products.map((p) =>
          p._id === id ? updated : p
        )
      );
    }
  };

  return (
    <div className="material-container">

      {/* Header Card */}
      <div className="material-header">
        <div>
          <h2>Products</h2>
          <p>Manage your store inventory</p>
        </div>

        <Link to="/admin/products/add" className="material-btn">
          + New Product
        </Link>
      </div>

      {/* Table Card */}
      <div className="material-card">

        <table className="material-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="product-name">{p.name}</div>
                  </td>

                  <td>
                    <span className="price-badge">
                      ${p.price}
                    </span>
                  </td>
                  
                  <td>
                  <select
                    value={p.status}
                    onChange={(e) =>
                      changeStatus(p._id, e.target.value)
                    }
                    className={`status-select ${p.status}`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="outOfStock">Out of Stock</option>
                  </select>
                </td>

                  <td className="code">
                    #{p._id.slice(-5).toUpperCase()}
                  </td>

                  <td>
                    <div className="action-group">
                      <Link
                        to={`/admin/products/edit/${p._id}`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AdminProducts;