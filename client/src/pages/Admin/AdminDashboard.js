import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "../../css/styles/Dashboard.css";

const AdminDashboard = () => {
  const [auth] = useAuth();
  
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="dashboard-header">
              <h1>Admin Dashboard</h1>
              <p>Welcome back, {auth?.user?.name}!</p>
            </div>

            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Products</h3>
                <div className="value">150</div>
                <div className="trend up">↑ 12%</div>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <div className="value">45</div>
                <div className="trend up">↑ 8%</div>
              </div>
              <div className="stat-card">
                <h3>Total Users</h3>
                <div className="value">89</div>
                <div className="trend up">↑ 5%</div>
              </div>
            </div>

            <div className="charts-section">
              <h2>Sales Overview</h2>
              <div className="chart-container">
                {/* Add your chart component here */}
                <div className="dashboard-loading">
                  <div className="loading-spinner"></div>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">📊</div>
                  <div className="activity-details">
                    <h4>New Order</h4>
                    <p>Order #1234 was placed</p>
                  </div>
                  <div className="activity-time">2 hours ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">👤</div>
                  <div className="activity-details">
                    <h4>New User</h4>
                    <p>A new user registered</p>
                  </div>
                  <div className="activity-time">4 hours ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📦</div>
                  <div className="activity-details">
                    <h4>Product Added</h4>
                    <p>New product added to inventory</p>
                  </div>
                  <div className="activity-time">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;