import AWS from 'aws-sdk';
import fs from 'fs';
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
  }).then((domains) => {
    console.log('domains', domains)
    const domainPromises = domains.map((domain) => {
      return new ClearbitLogo(domain).getLogo();
    });

    return Promise.all(domainPromises);
  });
};

Merchant.saveLogo = (base, id) => {
  let merg;
  return db.Merchant.findById(id)
    .then(merch => {
      merg = merch
      const s3 = new AWS.S3();
      return s3.putObject({
        Bucket: 'qonto-logo',
        Body: base,
        Key: `${merch.dataValues.merchant_name}`,
        ACL: 'public-read',
      })
    })
    .then((resp) => {
      const picUrl = `https://s3.eu-west-3.amazonaws.com/qonto-logo/logo/${merg.dataValues.merchant_name.replace(' ', '+')}`;
      console.log('Successfully uploaded package.');
      return merg.update({
        logo: picUrl,
      });
    })
    .catch(e => console.log('error in pushing to aws'));
}

Merchant.findMerId = (id) => db.Merchant.findById(id);

Merchant.finAllMerchant = () => db.Merchant.findAll({ raw: true });

