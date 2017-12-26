import fetch from 'node-fetch';

export default class clearbitLogo {
  constructor(domain) {
    this.host = 'https://logo.clearbit.com/';
    this.domain = domain;
  }

  getLogo() {
    const validateResponse = response => {
      if (!response.ok) throw Error(response.statusText);
      return response;
    };
    const readResponseAsBlob = (response) => {
      return response.buffer();
    };
    const logError = (error) => {
      console.log('Looks like there was a problem: \n', error);
      return null;
    }

    console.log(`${this.host}${this.domain}?s=128`);
    return fetch(`${this.host}${this.domain}?s=128`, { 'Content-Type': 'image/png' })
      .then(validateResponse)
      .then(readResponseAsBlob)
      .catch(logError);
  }
}
