import R from 'ramda';

const Icon = require('../models/iconModel.js');
const Merchant = require('../models/merchantModel.js');

const Dummy = module.exports;

Dummy.init = () => {
  const allIconPromises = [
    Icon.createIcon({ category: 'Transport', icon_url: 'https://s3.eu-west-3.amazonaws.com/qonto-logo/icons/transport.png' }),
    Icon.createIcon({ category: 'Hotel', icon_url: 'https://s3.eu-west-3.amazonaws.com/qonto-logo/icons/hotel.png' }),
    Icon.createIcon({ category: 'Restaurant', icon_url: 'https://s3.eu-west-3.amazonaws.com/qonto-logo/icons/restaurant.png' }),
    Icon.createIcon({ category: 'Subscription', icon_url: 'https://s3.eu-west-3.amazonaws.com/qonto-logo/icons/bank.png' }),
  ];

  return Promise.all(allIconPromises)
    .then(() => {
      const allMerchantPromises = [
        Merchant.createMerchant({ merchant_name: 'AIR FRANCE', merchant_id: 12345, merchant_country: 'FR', category: 'Transport', logo: 'https://s3.eu-west-3.amazonaws.com/qonto-logo/logos/AIR+FRANCE' }),
        Merchant.createMerchant({ merchant_name: 'RATP', merchant_id: 6789, merchant_country: 'FR', category: 'Transport', logo: 'https://s3.eu-west-3.amazonaws.com/qonto-logo/logos/RATP.png' }),
        Merchant.createMerchant({ merchant_name: 'QONTO', merchant_id: 101112, merchant_country: 'FR', category: 'Subscription', logo: 'https://s3.eu-west-3.amazonaws.com/qonto-logo/logos/QONTO.png' }),
      ];

      return Promise.all(allMerchantPromises)
        .then(() => {
        //   return Merchant.findMerchantById({ merchant_name: 'AIR FRANCE', merchant_id: 12345, merchant_country: 'FR', category: 'Transport', log_url: '' })
        //     .then((merch) => {
        //       const me = R.reject(R.isNil, merch);
        //       console.log('result', me);
        //       return me
        //     })
        //     .then((merch) => {
        //       return Merchant.saveLogo(merch[0], 12345, 'AIR FRANCE')
        //         .then((updatedmerch) => {
        //           console.log('updatedmerch', updatedmerch)
        //         })
        //         .catch(e => console.log('something wrong with save logo'))
        //     })
        //     .catch(e => console.log('something wrong with find merchant'));
        })
        .catch(e => console.log('something wrong with creating merchants'));
    })
    .catch(e => console.log('something wrong with creating icons'));
};
