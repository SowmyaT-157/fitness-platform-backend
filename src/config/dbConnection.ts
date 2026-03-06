import { Sequelize } from "sequelize";

const sequelize = new Sequelize('fitnes', 'sowmya1', '1234', {
  host: 'localhost',
  dialect: 'postgres' 
});

export default sequelize;