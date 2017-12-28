import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import dummy from './dummy';


dotenv.config();
const config = require('../../../psqlconfig.js')[process.env.NODE_ENV];


// const sequelize = new Sequelize(config.database, config.user, config.password, config.connection);

const sequelize = new Sequelize(config.connection);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch(() => {
    console.log('Unable to connect to the database');
  });

const Merchant = sequelize.define('Merchant', {
  logo: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: 'Must be a valid URL',
      },
    },
  },
  merchant_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  merchant_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  merchant_country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Icon = sequelize.define('Icon', {
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  icon_url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: {
        msg: 'Must be a valid URL',
      },
    },
  },
});

// will drop the tables and init them
sequelize.sync({
  force: true,
  logging: console.log,
})
.then(() => {
  console.log('Created tables in db.js');
  dummy.init();
});

exports.Merchant = Merchant;
exports.Icon = Icon;
