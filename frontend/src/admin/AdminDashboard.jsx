  import React, { useContext, useEffect, useState } from "react";
  import { AuthContext } from "../context/AuthContext";
  import { useNavigate } from "react-router-dom";
  import "../styles/admin.css";



  const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!user || user.role !== "admin") {
        navigate("/login");
      } else {
        fetchStats();
      }
    }, [user]);

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/analytics", {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            alert("Session expired. Please login again.");
            navigate("/login");
          } else {
            alert(data.message || "Failed to fetch analytics");
          }
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        {stats && (
          <div className="stats-grid">
            <div className="card">
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>

            <div className="card">
              <h3>Total Orders</h3>
              <p>{stats.totalOrders}</p>
            </div>

            <div className="card">
              <h3>Revenue</h3>
              <p>${stats.totalRevenue.toFixed(2)}</p>
            </div>

            <div className="card">
              <h3>Active Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default AdminDashboard;