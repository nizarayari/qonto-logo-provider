const Merchant = require('../models/merchantModel.js');
const Icon = require('../models/iconModel.js');

export default {
  '/': {
    get(req, res) {
      console.log('Received GET at /api/icon/');
      res.end('Received GET at /api/icon/');
    },
    post(req, res) {
      console.log('Received POST at /api/icon/');
      console.log(req.body);
      res.end('Received POST at /api/icon/');
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
