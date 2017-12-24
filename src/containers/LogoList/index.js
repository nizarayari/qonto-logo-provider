import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

export default class LogoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const processStatus = response => { // process status
    //   if (response.status === 200 || response.status === 0) {
    //     return Promise.resolve(response);
    //   }
    //   return Promise.reject(new Error('Error loading: '));
    // };
    
    // const parseBlob = response => response.blob();

    // const parseJson = response => response.json();
    
    // // download/upload
    // const downloadFile = url => fetch(url, { mode: 'no-cors' })
    //     .then(processStatus)
    //     .then(parseBlob);
    
    // downloadFile('https://www.ecb.europa.eu/fav.ico')
    //   .then(blob => {
    //     debugger
    //   })

    // (async () => {
    //   try {
    //     var response = await fetch('https://transferwise.com/gb/swift-codes/favicon-b84dbba08c59b795a8efba405fe9ea56.ico');
    //     var data = await response.blob();
    //     console.log(data);
    //   } catch (e) {
    //     console.log('Booo');
    //   }
    // })();

    fetch('/api/icon', {
      method: 'POST',
      headers: {
        Accept: 'application.json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        merchant_name: 'AIR FRANCE',
        merchant_id: 200000029687,
        merchant_country: 'FRA',
        category: 'Transport',
      }),
    })
    .then(resp => resp.json())
    .then(data => console.log(data));
  }

  render() {
    return (
      <div className={styles.logoList}>
        <input type="file" />
      </div>
    );
  }
}