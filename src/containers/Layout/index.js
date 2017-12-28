import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { applicationHeader } from '../../config';

/**
 * Layout
 *
 * This container is in charge of displaying
 * root wrapper of application
 * @param {node} children
 *
 * @return {jsx}
 */

const Layout = ({ children }) => (
  <div style={{ height: '100%' }}>
    <main role="main" style={{ height: '100%' }}>
      <MuiThemeProvider>
        {children}
      </MuiThemeProvider>
    </main>
  </div>
 );

/**
 * PropTypes Validation
 * @param {node} children
 */
const { node } = PropTypes;
Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
