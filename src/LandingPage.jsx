import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css'; // CSS file for styling

const LandingPage = () => {
  const history = useHistory();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      history.push(selectedValue);
    }
  };

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
          <select className="dropdown" onChange={handleSelectChange}>
            <option value="/">Select Function</option>
            <option value="/fibonacci">Fibonacci Function</option>
            <option value="/factorial">Factorial Function</option>
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
