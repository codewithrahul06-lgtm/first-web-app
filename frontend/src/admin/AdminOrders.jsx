import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/adminOrders.css";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/all", {
        headers: {
          Authorization: `Bearer ${user?.token}`, // ✅ FIXED
        },
      });

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchOrders(); // ✅ wait for token
    }
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // ✅ FIXED
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchOrders();
      } else {
        alert("Status update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="orders-page">

      <div className="orders-header">
        <h2>Orders</h2>
        <p>Manage customer orders</p>
      </div>

      <div className="orders-card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o._id}>

                  <td>
                    #{o._id.slice(-6).toUpperCase()}
                  </td>

                  <td>{o.user?.name || "User"}</td>

                  <td>Rs. {o.totalAmount}</td> {/* ✅ FIXED */}

                  <td>
                    <span className={`status ${o.status}`}>
                      {o.status}
                    </span>
                  </td>

                  <td>
                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(o._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No orders found</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminOrders;