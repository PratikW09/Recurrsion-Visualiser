import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import FibonacciVisualizer from './FibonacciVisualizer';
import FactorialVisualizer from './FactorialVisualizer';
import './App.css'; // Import your CSS

const App = () => {
  return (
    <Router>
      <FibonacciVisualizer/>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/fibonacci" element={<FibonacciVisualizer />} />
          <Route path="/factorial" element={<FactorialVisualizer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
