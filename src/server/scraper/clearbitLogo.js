import fetch from 'node-fetch';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class clearbitLogo {
  constructor(domain) {
    this.host = 'https://logo.clearbit.com/';
    this.domain = domain;
  }

  getLogo() {
    const validateResponse = (response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
        return response;
    };
    const readResponseAsBlob = (response) => {
      return response.blob();
    };
    const logError = (error) => {
      console.log('Looks like there was a problem: \n', error);
    }

    console.log(`${this.host}${this.domain}?s=128`);
    return fetch(`${this.host}${this.domain}?s=128`)
      .then(validateResponse)
      .then(readResponseAsBlob)
      .catch(logError);
  }
}
