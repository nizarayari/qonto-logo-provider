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

Merchant.saveLogo = (base, id, merchant_name) => {
  let merg;
  debugger
  return db.Merchant.findById(id)
    .then(merch => {
      merg = merch
      const s3 = new AWS.S3();
      return s3.putObject({
        Bucket: 'qonto-logo',
        Body: base,
        Key: merchant_name,
        ACL: 'public-read',
      })
    })
    .then((resp) => {
      const picUrl = `https://s3.eu-west-3.amazonaws.com/qonto-logo/${merchant_name.replace(' ', '+')}`;
      console.log('Successfully uploaded package.');
      debugger
      return merg.update({
        logo: picUrl,
      });
    })
}

Merchant.findMerId = (id) => db.Merchant.findById(id);

Merchant.finAllMerchant = () => db.Merchant.findAll({ raw: true });

