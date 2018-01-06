import React, { Component, PropTypes }  from 'react';
import { Link } from 'react-router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/expand-more';

import styles from './styles.scss';

/**
 * Home
 *
 * This container is in charge of displaying
 * table content
 *
 * @return {jsx}
 */

export default class TableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: true,
      showCheckboxes: true,
    };
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({ height: event.target.value });
  };

  render() {
    return (
      <div className={styles.tableContent}>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="7" tooltip="Super Header" style={{ textAlign: 'center' }}>
                List of logo by merchants confirmed
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <div>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  onChange={this.handleChangeSingle}
                  value={this.state.valueSingle}
                >
                  <MenuItem value="1" primaryText="Validate" />
                  <MenuItem value="2" primaryText="Delete" />
                  <MenuItem value="3" primaryText="Update" />
                </IconMenu>
              </div>
              <TableHeaderColumn tooltip="The merchant logo">Logo</TableHeaderColumn>
              <TableHeaderColumn tooltip="The merchant name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The merchant category">Category</TableHeaderColumn>
              <TableHeaderColumn tooltip="The merchant country">Country</TableHeaderColumn>
              <TableHeaderColumn tooltip="The merchant id">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The merchant date creation">Created At</TableHeaderColumn>
              <TableHeaderColumn tooltip="The merchant logo last update">Updated At</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.data.map( (row) => (
              <TableRow key={row.merchant_id}>
                <TableRowColumn>
                  <img
                    className={styles.tableContent__logo}
                    alt="merchant-logo"
                    src={row.logo}
                  />
                </TableRowColumn>
                <TableRowColumn>{row.merchant_name}</TableRowColumn>
                <TableRowColumn>{row.category}</TableRowColumn>
                <TableRowColumn>{row.merchant_country}</TableRowColumn>
                <TableRowColumn>{row.merchant_id}</TableRowColumn>
                <TableRowColumn>{row.createdAt}</TableRowColumn>
                <TableRowColumn>{row.updatedAt}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
