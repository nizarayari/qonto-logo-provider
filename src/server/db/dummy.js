import R from 'ramda';

const Icon = require('../models/iconModel.js');
const Merchant = require('../models/merchantModel.js');

const Dummy = module.exports;

Dummy.init = () => {
  const allIconPromises = [
    Icon.createIcon({ category: 'Transport', icon_url: 'https://avatars0.githubusercontent.com/u/17601607?v=3&s=460' }),
    Icon.createIcon({ category: 'Hotel', icon_url: 'https://avatars0.githubusercontent.com/u/17601607?v=3&s=460' }),
    Icon.createIcon({ category: 'Restaurant', icon_url: 'https://avatars0.githubusercontent.com/u/17601607?v=3&s=460' }),
  ];

  return Promise.all(allIconPromises)
    .then(() => {
      const allMerchantPromises = [
        Merchant.createMerchant({ merchant_name: 'AIR FRANCE', merchant_id: 12345, merchant_country: 'FR', category: 'Transport', log_url: '' }),
        Merchant.createMerchant({ merchant_name: 'RATP', merchant_id: 6789, merchant_country: 'FR', category: 'Hotel', log_url: '' }),
        Merchant.createMerchant({ merchant_name: 'QONTO', merchant_id: 101112, merchant_country: 'FR', category: 'Restaurant', log_url: '' }),
      ];

      return Promise.all(allMerchantPromises)
        .then(() => {
          Merchant.findMerchantById({ merchant_name: 'AIR FRANCE', merchant_id: 12345, merchant_country: 'FR', category: 'Transport', log_url: '' })
          .then((merch) => {
            const me = R.reject(R.isNil, merch);
            debugger
            console.log('existing merch', me);
          })
          .catch(e => console.log('something wrong with find merchant'));
        })
        .catch(e => console.log('something wrong with creating merchants'));
    })
    .catch(e => console.log('something wrong with creating icons'));
};
