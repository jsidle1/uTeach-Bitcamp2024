import React from 'react';
import Link from 'next/link';
import styles from "./generate-powerpoint.module.css";
import TextInput from '@/components/TextInput';

const Home = () => {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Generate a Powerpoint</h1>
        <p className={styles.paragraph}>Enter a prompt to generate a powerpoint framework</p>
        <div className = {styles.containerCenter}>
          <TextInput className={styles.textInput} />
        </div>
      </div>
    );
  };
  
  export default Home;