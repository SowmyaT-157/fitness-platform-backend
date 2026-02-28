import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection";
import { timeStamp } from "console";

export const Person = sequelize.define('persons',{
    user_id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email:{ 
        type:DataTypes.TEXT,
        allowNull: false,
        validate: {
          isEmail: true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
    
},
   


)