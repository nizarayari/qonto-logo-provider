import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';
import R from 'ramda';
import url from 'url';

dotenv.config();

export default class GoogleSearch {
  constructor(options) {
    const defaultOptions = R.defaultTo({
      key: process.env.GOOGLE_SEARCH_KEY,
      cx: process.env.SEARCH_ENGINE_ID,
      format: 'json',
      headers: { 'User-Agent': 'GoogleSearch' },
      host: 'www.googleapis.com',
      path: '/customsearch/v1',
      alt: 'json',
    });
    const setOptions = defaultOptions(options);

    this.config = {
      key: setOptions.key,
      cx: setOptions.cx,
      format: setOptions.format,
      headers: setOptions.headers,
      host: setOptions.host,
      path: setOptions.path,
    };
  }

  fetchDomain(queryParams) {
    return this.makeRequest(this.generateUrl(queryParams));
  }

  generateUrl(queryParams) {
    queryParams.key = this.config.key;
    queryParams.cx = this.config.cx;
    const pathname = this.config.path;
    console.log(pathname);

    const urlFormatted = url.format({
      protocol: 'https',
      hostname: this.config.host,
      query: queryParams,
      pathname,
    });
    console.log(url.parse(urlFormatted))
    return url.parse(urlFormatted);
  }

  makeRequest(requestUrl) {
    return fetch(requestUrl.href)
      .then(resp => resp.json())
      .then(data => R.pluck('displayLink', data.items).map(host => R.replace(/www./g, '', host)))
      .catch(e => console.log('something wrong with google search'));
  }

}
