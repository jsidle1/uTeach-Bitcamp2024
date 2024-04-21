import React, { useState, useEffect } from 'react';
import styles from './scoresheet.module.css';
import Link from 'next/link';

const Scoresheet = () => {
  const [userInfo, setUserInfo] = useState({});
  const [slideValues, setSlideValues] = useState([
    [[24, "Explanation for correctness 1"], [45, "Explanation for relevancy 1"], [65, "Explanation for clarity 1"], [85, "Explanation for grammar 1"]],
    [[84, "Explanation for correctness 2"], [32, "Explanation for relevancy 2"], [1, "Explanation for clarity 2"], [55, "Explanation for grammar 2"]],
    [[24, "Explanation for correctness 3"], [45, "Explanation for relevancy 3"], [65, "Explanation for clarity 3"], [85, "Explanation for grammar 3"]],
  ]);
  const [speechValues, setSpeechValues] = useState([
    [[0, "EXPLANTION FOR CORRECTNESS 1"], [50, "EXPLANATION FOR Depth of topics"], [70, "EXPLANATION FOR GRAMMER"]]
  ])
  // let slideValues = [
  //   [[24, "Explanation for correctness 1"], [45, "Explanation for relevancy 1"], [65, "Explanation for clarity 1"], [85, "Explanation for grammar 1"]],
  //   [[84, "Explanation for correctness 2"], [32, "Explanation for relevancy 2"], [1, "Explanation for clarity 2"], [55, "Explanation for grammar 2"]],
  //   [[24, "Explanation for correctness 3"], [45, "Explanation for relevancy 3"], [65, "Explanation for clarity 3"], [85, "Explanation for grammar 3"]],
  // ];
  //const slideValues = [];
  useEffect(() => {
    const data = localStorage.getItem('userInfo');
    if (data) {
      setUserInfo(JSON.parse(data))
      console.log(JSON.parse(data))
      console.log(JSON.parse(data)['scores_pptx'].length)
      let temp_slide_array = []
      for (let i = 1; i < JSON.parse(data)['scores_pptx'].length; i++) {
        console.log(JSON.parse(data)['scores_pptx'][i])
        let tempArray = []
        for (let x = 0; x < JSON.parse(data)['scores_pptx'][i].length; x++) {
          tempArray.push([JSON.parse(data)['scores_pptx'][i][x][0], JSON.parse(data)['scores_pptx'][i][x][1]])
        }
        console.log("HELLO")
        console.log(tempArray)
        temp_slide_array.push(tempArray)
        setSlideValues(temp_slide_array)

      }
      let tempArray = []

      for (let i = 0; i < JSON.parse(data)['scores_speech'][0].length; i++) {
        tempArray.push([JSON.parse(data)['scores_speech'][0][i][0], JSON.parse(data)['scores_speech'][0][i][1]])
      }
      console.log(tempArray)
      setSpeechValues(tempArray)


    } else {
      console.log('FAIL')
    }
  }, []);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [values, setValues] = useState(slideValues[currentSlideIndex]);
  const [values_speech, setValues_speech] = useState(speechValues[0])

  const labels = ['Correctness', 'Relevancy', 'Clarity', 'Grammar'];
  const labels_speech = ['Correctness', 'Depth of topics', 'Grammar']

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
    setValues_speech(speechValues)


  };

  const previousSlide = () => {
    const prevIndex = currentSlideIndex - 1;
    if (prevIndex >= 0) {
      setCurrentSlideIndex(prevIndex);
      setValues(slideValues[prevIndex]);
    }
  };




  // useEffect(() => {
  //   if (Object.keys(userInfo).length !== 0) {
  //     updateSlideValues();  // Call this function when userInfo updates
  //   }
  // }, [userInfo]);  // Dependency array includes userInfo, ensuring it runs on userInfo changes


  return (
    <div className={styles.container}>
      <div className={styles.container_speech}>
        <h1 className={styles.h1}>Score Report: Speech</h1>
        <div className={styles.quadrants}>
          {labels_speech.map((label, index) => (
            <div className={styles.quadrant} key={label}>
              <svg height={radius * 2} width={radius * 2}>
                <circle
                  stroke={getColor(values_speech[index][0])} // Use the score value for the color
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset: circumference - (values_speech[index][0] / 100) * circumference }}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />

                <text x="50%" y="50%" textAnchor="middle" stroke="#000" strokeWidth="1px" dy=".3em" fill="#000">
                  {`${values_speech[index][0]}%`}
                </text>
              </svg>
              <div className={styles.square}>
                {label}
                <p className={`${styles.expandedText} ${styles.expandedTextLeft}`}>
                  {values_speech[index][1]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>




      <div className={styles.container_slides}>
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
    </div>
  );
};

export default Scoresheet;
