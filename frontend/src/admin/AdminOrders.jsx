import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/adminOrders.css";

const AdminOrders = () => {
    
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  // FETCH ORDERS
  const fetchOrders = async () => {
    const res = await fetch("/api/orders", {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });

    
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      fetchOrders();
    } else {
      alert("Status update failed");
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

                  <td className="order-id">
                    #{o._id.slice(-6).toUpperCase()}
                  </td>

                  <td>{o.user?.name || "User"}</td>

                  <td>${o.totalPrice}</td>

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
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default AdminOrders;