import React from 'react';
import { Link } from 'react-router';
import LogoList from '../LogoList';

import styles from './styles.scss';

/**
 * Home
 *
 * This container is in charge of displaying
 * Home page
 *
 * @return {jsx}
 */

const HomePage = () => (
  <div className={styles.homePage}>
    <h1>Finpal development</h1>
    <LogoList />
  </div>
 );

export default HomePage;
