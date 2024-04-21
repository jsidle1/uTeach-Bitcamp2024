import React, { useState } from 'react';
import styles from './scoresheet.module.css';
import Link from 'next/link';

const Scoresheet = () => {
  const slideValues = [
    [[24, "Explanation for correctness 1"], [45, "Explanation for relevancy 1"], [65, "Explanation for clarity 1"], [85, "Explanation for grammar 1"]],
    [[84, "Explanation for correctness 2"], [32, "Explanation for relevancy 2"], [1, "Explanation for clarity 2"], [55, "Explanation for grammar 2"]],
    [[24, "Explanation for correctness 3"], [45, "Explanation for relevancy 3"], [65, "Explanation for clarity 3"], [85, "Explanation for grammar 3"]],
  ];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [values, setValues] = useState(slideValues[currentSlideIndex]);

  const labels = ['Correctness', 'Relevancy', 'Clarity', 'Grammar'];

  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const getColor = (value) => {
    if (value < 30) return 'red';
    else if (value < 50) return 'orange';
    else if (value < 60) return 'yellow';
    else if (value < 75) return 'yellowgreen';
    else return 'green';
  };

  const getTextExpansionClass = (index) => {
    return index % 2 === 0 ? styles.expandedTextRight : styles.expandedTextLeft;
  };

  const nextSlide = () => {
    const nextIndex = (currentSlideIndex + 1) % slideValues.length;
    setCurrentSlideIndex(nextIndex);
    setValues(slideValues[nextIndex]);
  };

  const previousSlide = () => {
    const prevIndex = currentSlideIndex - 1;
    if (prevIndex >= 0) {
      setCurrentSlideIndex(prevIndex);
      setValues(slideValues[prevIndex]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Score Report: Slide {currentSlideIndex + 1}</h1>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        {currentSlideIndex > 0 && (
          <button className={styles.button} onClick={previousSlide} style={{ marginRight: '10px' }}>Previous Slide</button>
        )}
        {currentSlideIndex < slideValues.length - 1 ? (
          <button className={styles.button} onClick={nextSlide}>Next Slide</button>
        ) : (
          <Link href="/">
            <button className={styles.restart}>Restart</button>
          </Link>
        )}
      </div>
      <div className={styles.quadrants}>
        {labels.map((label, index) => (
          <div className={styles.quadrant} key={label}>
            <svg height={radius * 2} width={radius * 2}>
              <circle
                stroke={getColor(values[index][0])} // Use the score value for the color
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset: circumference - (values[index][0] / 100) * circumference }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />

              <text x="50%" y="50%" textAnchor="middle" stroke="#000" strokeWidth="1px" dy=".3em" fill="#000">
                {`${values[index][0]}%`} 
              </text>
            </svg>
            <div className={styles.square}>
              {label}
              <p className={`${styles.expandedText} ${getTextExpansionClass(index)}`}>
                {values[index][1]} 
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoresheet;
