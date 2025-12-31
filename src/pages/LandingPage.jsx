import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Track Your Expenses Smartly</h1>
        <p>
          Manage your income and expenses easily with our secure and fast
          expense tracker application.
        </p>

        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline">
            Register
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Use Expense Tracker?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📊 Easy Tracking</h3>
            <p>Track daily income and expenses in just a few clicks.</p>
          </div>

          <div className="feature-card">
            <h3>🔐 Secure</h3>
            <p>JWT-based authentication ensures your data stays safe.</p>
          </div>

          <div className="feature-card">
            <h3>📈 Insights</h3>
            <p>Analyze your spending habits with detailed records.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <h5>All rights reserved © Harsh_Jaiswal_Project</h5>
      </footer>
    </div>
  );
};

export default LandingPage;
