import express from 'express';
import sequelize from './config/dbConnection';
import { router } from './routes/userRoutes';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT
app.use("/", router)
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}