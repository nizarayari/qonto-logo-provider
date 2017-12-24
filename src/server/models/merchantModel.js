import db from '../db/schema.js';
import GoogleSearch from '../scraper/googleSearch';
import ClearbitLogo from '../scraper/clearbitLogo';

const Merchant = module.exports;

Merchant.createMerchant = merchant => db.Merchant.create(merchant);
Merchant.findMerchantById = ({ merchant_id }) => {
  const search = new GoogleSearch();

  return search.fetchDomain({
    q: 'AIR FRANCE',
    gl: 'fr',
    cr: 'france',
    googlehost: 'google.com',
    lr: 'lang_fr',
    num: 3,
  }).then((domains) => {
    console.log('domains', domains)
    const domainPromises = domains.map((domain) => {
      return new ClearbitLogo(domain).getLogo();
    });

    return Promise.all(domainPromises);
  });
};

