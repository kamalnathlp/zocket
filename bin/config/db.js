import Sequelize from 'sequelize';
import UserModel from '../models/users.js';
import { sequelize as sqlz } from './config.js';

const sequelize = new Sequelize(sqlz.database, sqlz.username, sqlz.password, {
  host: sqlz.host,
  dialect: sqlz.dialect,
  pool: {
    max: sqlz.pool.max,
    min: sqlz.pool.min,
    ideal: sqlz.pool.ideal,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.log('Error in Connection, ', error);
    throw error;
  });

const User = UserModel(sequelize);

sequelize
  .sync({ alter: false })
  .then((res) => {
    console.log('Tables Synced');
  })
  .catch((err) => {
    console.log(err);
  });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

export { User };
