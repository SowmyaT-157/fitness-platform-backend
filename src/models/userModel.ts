import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/dbConnection";


export const Users = sequelize.define('users', {
    id: {
       
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    otp: {
       type: DataTypes.INTEGER,
       defaultValue:null
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
},


},

)