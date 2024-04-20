import React from 'react';
import Link from 'next/link';
import styles from "./generate-powerpoint.module.css";
import TextInput from '@/components/TextInput';
import Image from 'next/image'
import logo from 'C:/Users/julia/Desktop/PROJECTS_JULIAN/bit_camp_2024/repo/react/my-app/public/COW.png';

const Home = () => {

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Generate a Powerpoint</h1>
        <p className={styles.paragraph}>Enter a prompt to generate a powerpoint framework</p>
        <div className = {styles.containerCenter}>
          <TextInput className={styles.textInput} />
        </div>
      <div>
        <p>BIG GUY</p>
        <Image src={logo} width={500} height={500} alt="logo" />
      </div>
      </div>
    );
  };
  
  export default Home;