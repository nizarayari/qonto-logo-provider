import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Cached from 'material-ui/svg-icons/action/cached';
import Done from 'material-ui/svg-icons/action/done';

import styles from './styles.scss';

/**
 * Home
 *
 * This container is in charge of displaying
 * Side navigation
 *
 * @return {jsx}
 */

const SideNav = () => (
  <div className={styles.sideNav}>
    <Paper className={styles.sideNav__paper}>
      <Menu className={styles.sideNav__paper__menu}>
        <MenuItem primaryText="CONFIRMED" leftIcon={<Done />} />
        <Divider />
        <MenuItem primaryText="TO CONFIRM" leftIcon={<Cached />} />
      </Menu>
    </Paper>
  </div>
 );

export default SideNav;
