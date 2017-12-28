import React from 'react';
import { Link } from 'react-router';
import AppBar from '../../components/AppBar';
import SideNav from '../../components/SideNav';
import LogoList from '../LogoList';
import styles from './styles.scss';

/**
 * Home
 *
 * This container is in charge of displaying
 * App Bar
 *
 * @return {jsx}
 */

const HomePage = () => (
  <div className={styles.homePage}>
    <AppBar />
    <div className={styles.homePage__container}>
      <SideNav />
      <LogoList />
    </div>
  </div>
 );

export default HomePage;
