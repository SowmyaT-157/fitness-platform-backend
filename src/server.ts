import express from 'express';
import sequelize from './config/dbConnection';
import { router } from './routes/userRoutes';


const app = express();
app.use(express.json());


const PORT = process.env.PORT
app.use("/", router)
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}