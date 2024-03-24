import express from 'express';
import { dbConnection } from './config/dbConnection.js';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();
app.use(express.json());


app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use(errorHandler);

dbConnection();

app.listen(7070, ()=>{
    console.log('App is listening on port 7070 !!'); 
})