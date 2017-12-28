import R from 'ramda';
import Merchant from '../models/merchantModel.js';
import Icon from '../models/iconModel.js';


export default {
  '/': {
    get(req, res) {
      console.log('Received GET at /api/icon/');
      return Merchant.finAllMerchant().then(mer => {
        console.log('resp object', mer);
        res.json(mer);
      })
    },
    post(req, res) {
      console.log('Received POST at /api/icon/');
      console.log(req.body);
      return Merchant.findMerId(req.body.merchant_id)
        .then((mer) => {
          if (R.isNil(mer)) {
            Icon.findIconId(req.body.category)
              .then(icon => {
                res.json(R.pick(['icon_url'], icon));
              })
              .catch(e => console.log('something wrong with find icon by id'));
          }
          res.json(R.pick(['logo'], mer));
        })
        .catch(e => console.log('something wrong with find merchant by id'));
    },
    put(req, res) {
      console.log('Received PUT at /api/icon/');
      res.end('Received PUT at /api/icon/');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/icon/');
      res.end('Received DELETE at /api/icon/');
    },
  },
};
