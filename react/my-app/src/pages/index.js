import React from 'react';
import Link from 'next/link';
import styles from "./index.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.splitScreen}>
        <div className={styles.left}>
          <div className={styles.description}>
            <h2>Create a New PowerPoint</h2>
            <img src="/BluePlus.png" alt="Create PowerPoint" className={styles.image}/>
            <p>Generate a slideshow template to fill out.</p>
            <Link href="/generate-powerpoint">
              <button className={styles.button}>Create New</button>
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.description}>
            <h2>Use an Existing PowerPoint</h2>
            <img src="/Slideshow.png" alt="Upload PowerPoint" className={styles.image}/>
            <p>Upload and score an existing presentation.</p>
            <Link href="/presentation-page">
              <button className={styles.button}>Upload Existing</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.titleBox}>
        <h1 className={styles.title}>uTeach</h1>
      </div>
    </div>
  );
};

export default Home;
