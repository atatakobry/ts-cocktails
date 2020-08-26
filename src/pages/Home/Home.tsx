import React from 'react';

import { Clock } from './components/Clock/Clock';

import logo from './logo.svg';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles.wrapper}>
      <img src={logo} className={styles.logo} alt="logo" />
      <p>
        <Clock label="Time: " />
      </p>
    </div>
  );
};
