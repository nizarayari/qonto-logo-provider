import React from 'react';
import { Link } from 'react-router';
import img from '../../../public/images/qonto.svg';

import styles from './styles.scss';

/**
 * Home
 *
 * This container is in charge of displaying
 * Home page
 *
 * @return {jsx}
 */

const AppBar = () => (
  <div className={styles.appBar}>
    <img className={styles.appBar__logo} alt="qonto-logo" src={img} />
    <div className={styles.appBar__title}> Logo Provider </div>
  </div>
 );

export default AppBar;
