import React from 'react';
import Link from 'next/link';
import styles from "./index.module.css";

const Home = () => {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to the Home Page</h1>
        <p className={styles.paragraph}>Click the buttons below to go to the new page:</p>
        <div>
          <Link href="/generate-powerpoint">
            <button className={styles.button}>Create new powerpoint</button>
          </Link>
          <Link href="/upload-powerpoint">
            <button className={styles.button}>Use existing powerpoint</button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default Home;