import React, { useState } from 'react';
import styles from './scoresheet.module.css';
import Link from 'next/link';

const Scoresheet = () => {
  const slideValues = [[24, 45, 60, 85], [24, 42, 58, 1], [24, 45, 2, 15]];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [values, setValues] = useState(slideValues[currentSlideIndex]);

  const labels = ['Correctness', 'Relevancy', 'Clarity', 'Grammar'];
  const explanations = [
    'Explanation for correctness',
    'Explanation for relevancy',
    'Explanation for clarity',
    'Explanation for grammar'
  ];

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
            <svg height={radius * 2.2} width={radius * 2}>
              <circle
                stroke={getColor(values[index])}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset: circumference - (values[index] / 100) * circumference, transition: 'stroke 0.5s ease-out' }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                filter=<feDropShadow dx="12" dy="14" stdDeviation="1" flood-opacity="0.7"/>
              />

              <text x="50%" y="45%" textAnchor="middle" stroke={getColor(values[index])} strokeWidth="1px" dy=".3em" fill={getColor(values[index])}>
                {`${values[index]}%`}
              </text>
            </svg>
            <div className={styles.square}>
              {label}
              <p className={`${styles.expandedText} ${getTextExpansionClass(index)}`}>
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
