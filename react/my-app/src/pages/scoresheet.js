import React, { useState } from 'react';
import styles from './scoresheet.module.css';

const Scoresheet = () => {
  const positions = ['left', 'right', 'left', 'right']; // Alternating positions for each quadrant
  const [values, setValues] = useState([25, 45, 60, 85]); // Updated example progress values to demonstrate color changes
  const labels = ['Correctness', 'Relevancy', 'Clarity', 'Grammar'];
  const explanations = [
    'Explanation for correctness',
    'Explanation for relevancy',
    'Explanation for clarity',
    'Explanation for grammar'
  ];

  const radius = 60; // Increased radius of the circle
  const stroke = 12; // Increased thickness of the progress bar
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  // Function to determine color based on value
  const getColor = (value) => {
    if (value < 30) return 'red';
    else if (value < 50) return 'orange';
    else if (value < 60) return 'yellow';
    else if (value < 75) return 'yellowgreen';
    else return 'green';
  };

  return (
    <div className={styles.container}>  
      <h1 className={styles.h1}>Score Report:</h1>
      <div className={styles.quadrants}>
        {labels.map((label, index) => (
          <div className={styles.quadrant} key={label}>
            <svg
              height={radius * 2}
              width={radius * 2}
            >
              <circle
                stroke={getColor(values[index])} // Applying the color based on value
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset: circumference - (values[index] / 100) * circumference }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <text x="50%" y="50%" textAnchor="middle" stroke={getColor(values[index])} strokeWidth="1px" dy=".3em" fill={getColor(values[index])}>
                {`${values[index]}%`}
              </text>
            </svg>
            <div className={`${styles.square} ${styles[positions[index]]}`}>
              {label}
              <p className={`${styles.expandedText} ${styles[positions[index]]}`}>
                {explanations[index]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoresheet;
