import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import db from '../db/schema.js';
import GoogleSearch from '../scraper/googleSearch';
import ClearbitLogo from '../scraper/clearbitLogo';

dotenv.config();
AWS.config.update({ accessKeyId: process.env.Access_Key_ID, secretAccessKey: process.env.Secret_Access_Key });

const Merchant = module.exports;

Merchant.createMerchant = merchant => db.Merchant.create(merchant);
Merchant.searchLogo = ({ merchant_name, merchant_country }) => {
  const search = new GoogleSearch();

  return search.fetchDomain({
    q: merchant_name,
    gl: merchant_country,
    googlehost: `google.${merchant_country}`,
    lr: `lang_${merchant_country}`,
    num: 1,
  }).then(domains => {
    console.log('domains', domains);
    const domainPromises = domains.map(domain => new ClearbitLogo(domain).getLogo());
    return Promise.all(domainPromises);
  });
};

Merchant.saveLogo = (base, id) => {
  let merg;
  return db.Merchant.findById(id)
    .then(merch => {
      merg = merch;
      const s3 = new AWS.S3();
      s3.putObject({
        Bucket: 'qonto-logo',
        Body: base,
        Key: `logos/${merch.dataValues.merchant_name}`,
        ACL: 'public-read',
      }, err => {
        if (err) {
          console.log(err, err.stack);// an error occurred
        } else {
          const picUrl = `https://s3.eu-west-3.amazonaws.com/qonto-logo/logos/${merg.dataValues.merchant_name.replace(' ', '+')}`;
          return merg.update({
            logo: picUrl,
          });
        }
      });
    });
};

Merchant.findMerId = id => db.Merchant.findById(id);

Merchant.finAllMerchant = () => db.Merchant.findAll({ raw: true });

