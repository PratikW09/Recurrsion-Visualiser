import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Recursion Visualizer</h1>
        <p>Visualize complex recursive algorithms with ease!</p>
      </header>

      <section className="content">
        <p>
          Welcome to the Recursion Visualizer! This tool helps you understand the inner workings of recursive algorithms by visualizing the steps and processes involved in calculations like Fibonacci and Factorial.
        </p>

        <div className="dropdown-container">
          <label className="dropdown-label">Choose a function to visualize:</label>
          <select
            className="dropdown"
            onChange={(e) => {
              window.location.href = e.target.value;
            }}
          >
            <option value="/">Select Function</option>
            <option value="/fibonacci">
            <Link to="/fibonacci">Fibonacci Function</Link></option>
            <option value="/factorial"> <Link to="/factorial">Factorial Function</Link></option>
          </select>
        </div>
      </section>

      <footer className="footer">
        <p>Developed by Pratik Walale</p>
        <p>Explore the beauty of recursion!</p>
      </footer>
    </div>
  );
};

export default LandingPage;
