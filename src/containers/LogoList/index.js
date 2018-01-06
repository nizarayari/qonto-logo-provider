import React, { Component, PropTypes } from 'react';
import TableContent from '../../components/TableContent';

import styles from './styles.scss';

export default class LogoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    fetch('api/logo', { headers: { Accept: 'application.json, text/plain, */*', 'Content-type': 'application/json' } })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ list: data });
      });
  }

  render() {
    return (
      <TableContent data={this.state.list} />
    );
  }
}
