// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize('fitness', 'sowmya1', '1234', {
//   host: 'localhost',
//   dialect: 'postgres' 
// });

// export default sequelize;

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'fitness', 
  process.env.DB_USER || 'somi', 
  process.env.DB_PASSWORD || 'Somi157#', 
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ...(process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      })
    }
  }
);

export default sequelize;
