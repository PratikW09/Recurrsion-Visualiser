import React, { useState } from 'react';
import './Temp.css'; // Import the CSS file

const FactorialVisualizer = () => {
  let functionCalls = [];
  let recursionCalls = [];
  const [currentStep, setCurrentStep] = useState(0);
  const [finalFunctionCalls, setFinalFunctionCalls] = useState([]);
  const [finalRecursionCalls, setFinalRecursionCalls] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [inputValue, setInputValue] = useState(5); // Default value for Factorial input

  const getColorByN = (n) => {
    const colors = ['#FF6347', '#4682B4', '#32CD32', '#FF4500', '#6A5ACD', '#FFD700'];
    return colors[n % colors.length];
  };

  const factorial = (n, y, depth, parentIndex = null) => {
    const currentIndex = functionCalls.length;
    const x = window.innerWidth / 2; // Keep the nodes horizontally centered
    const verticalSpacing = 150; // Adjust vertical spacing

    functionCalls.push({ x, y, n, depth, parentIndex });

    if (n === 0 || n === 1) {
      recursionCalls.push({ x, y, n, depth, parentIndex, action: 'exit', result: 1, baseCase: true });
      return 1;
    }

    recursionCalls.push({ x, y, n, depth, parentIndex, action: 'enter' });

    const result = n * factorial(n - 1, y + verticalSpacing, depth + 1, currentIndex);
    recursionCalls.push({ x, y, n, depth, parentIndex, action: 'exit', result });
    return result;
  };

  const startVisualization = () => {
    const n = parseInt(inputValue, 10); // Get user input for Factorial number
    if (isNaN(n) || n < 0) return; // Validate input
    functionCalls = [];
    recursionCalls = [];
    setCompletedSteps([]);
    factorial(n, 50, 0);
    setFinalFunctionCalls([...functionCalls]);
    setFinalRecursionCalls([...recursionCalls]);
    setCurrentStep(0);
  };

  const drawBranches = (fromX, fromY, toX, toY) => {
    return (
      <div
        className="branch"
        style={{
          position: 'absolute',
          left: `${fromX}px`,
          top: `${fromY}px`,
          width: '2px',
          height: `${toY - fromY}px`,
          backgroundColor: 'black',
        }}
      />
    );
  };

  const nextStep = () => {
    if (currentStep < finalRecursionCalls.length) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      if (finalRecursionCalls[newStep].action === 'exit') {
        setCompletedSteps([...completedSteps, newStep]);
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStatusMessage = () => {
    if (currentStep < finalRecursionCalls.length) {
      const currentCall = finalRecursionCalls[currentStep];
      if (currentCall.action === 'enter') {
        return `Calling ${currentCall.n}! at depth ${currentCall.depth}`;
      } else if (currentCall.action === 'exit') {
        return `Returning ${currentCall.n}! = ${currentCall.result}`;
      } else if (currentCall.baseCase) {
        return `Base case reached: ${currentCall.n}! = ${currentCall.result}`;
      }
    }
    return '';
  };

  return (
    <div className="main">
      <h1>Factorial Recursion Visualizer</h1>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          min="0"
          style={{ width: '60px', marginRight: '10px' }}
        />
        <button onClick={startVisualization}>Start Visualization</button>
        <button onClick={previousStep} disabled={currentStep === 0}>
          Previous Step
        </button>
        <button onClick={nextStep} disabled={currentStep >= finalRecursionCalls.length}>
          Next Step
        </button>
      </div>

      <div className="status-box" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <p>{getStatusMessage()}</p>
      </div>

      <div className="visualizer-container" style={{ position: 'relative', width: '100%', height: '600px' }}>
        {finalFunctionCalls.map((call, index) => {
          if (call.parentIndex !== null) {
            const parentCall = finalFunctionCalls[call.parentIndex];
            return drawBranches(parentCall.x, parentCall.y, call.x, call.y);
          }
          return null;
        })}

        {finalRecursionCalls.map((call, index) => {
          const isCurrentStep = currentStep === index;
          const isEntering = call.action === 'enter';
          const isExiting = call.action === 'exit';
          const isBaseCase = call.baseCase;
          const isCompleted = completedSteps.includes(index);
          const bgColor = isBaseCase ? 'yellow' : getColorByN(call.n);

          return (
            <div
              key={`rec-${index}`}
              className="recursion-container"
              style={{
                position: 'absolute',
                left: `${call.x}px`,
                top: `${call.y}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <div
                className={`recursion-visualization 
                  ${isBaseCase ? 'base-case' : ''} 
                  ${isCurrentStep ? (isEntering ? 'entering' : isExiting ? 'exiting' : '') : ''} 
                  ${isCompleted ? 'completed' : ''}`}
                style={{
                  backgroundColor: bgColor,
                }}
              >
                {isExiting && isCompleted ? (
                  <span>{`F(${call.n}) = ${call.result}`}</span>
                ) : (
                  <span>{`F(${call.n})`}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      
    </div>
  );
};

export default FactorialVisualizer;
